/**
 * Escrow Payment Service
 * Handles payment collection, holding, and release with milestone support
 */

import type { TypedPocketBase } from '../../../pocketbase-types';
import type { OrdersResponse, PaymentsResponse } from '../../../pocketbase-types';
import { NeeroGatewayClient, type PaymentInitiateRequest } from './neero-client';

const MILESTONE_THRESHOLD = 200000;
const PLATFORM_COMMISSION_RATE = 0.10; // 10% commission

export interface EscrowPaymentRequest {
	orderId: string;
	buyerId: string;
	providerId: string;
	amount: number;
	currency: string;
	description: string;
	returnUrl: string;
}

export interface MilestonePayment {
	milestoneNumber: number;
	amount: number;
	percentage: number;
	status: 'pending' | 'paid' | 'released';
	paymentId?: string;
	transactionId?: string;
}

export class EscrowService {
	private pb: TypedPocketBase;
	private neeroClient: NeeroGatewayClient;

	constructor(pb: TypedPocketBase, neeroClient: NeeroGatewayClient) {
		this.pb = pb;
		this.neeroClient = neeroClient;
	}

	/**
	 * Determine if order requires milestone payments
	 */
	private requiresMilestones(amount: number): boolean {
		return amount > MILESTONE_THRESHOLD;
	}

	/**
	 * Calculate milestone breakdown (50% + 50% for amounts > 200,000)
	 */
	private calculateMilestones(totalAmount: number): MilestonePayment[] {
		if (!this.requiresMilestones(totalAmount)) {
			return [
				{
					milestoneNumber: 1,
					amount: totalAmount,
					percentage: 100,
					status: 'pending'
				}
			];
		}

		const firstPayment = totalAmount * 0.5;
		const secondPayment = totalAmount * 0.5;

		return [
			{
				milestoneNumber: 1,
				amount: firstPayment,
				percentage: 50,
				status: 'pending'
			},
			{
				milestoneNumber: 2,
				amount: secondPayment,
				percentage: 50,
				status: 'pending'
			}
		];
	}

	/**
	 * Initiate escrow payment collection
	 */
	async initiateEscrowPayment(request: EscrowPaymentRequest) {
		try {
			const order = await this.pb.collection('orders').getOne(request.orderId, {
				expand: 'buyer_id,provider_id,job_id'
			});

			if (order.escrow_funded) {
				throw new Error('Order already funded');
			}

			const milestones = this.calculateMilestones(request.amount);
			const firstMilestone = milestones[0];

			const paymentRequest: PaymentInitiateRequest = {
				amount: firstMilestone.amount,
				currency: request.currency,
				orderId: request.orderId,
				customerId: request.buyerId,
				description: `${request.description} - Milestone ${firstMilestone.milestoneNumber}`,
				returnUrl: request.returnUrl,
				callbackUrl: `${request.returnUrl}/api/webhooks/neero`,
				metadata: {
					orderId: request.orderId,
					buyerId: request.buyerId,
					providerId: request.providerId,
					milestoneNumber: firstMilestone.milestoneNumber,
					totalMilestones: milestones.length,
					isMilestonePayment: milestones.length > 1
				}
			};

			const paymentResponse = await this.neeroClient.initiatePayment(paymentRequest);

			const commission = firstMilestone.amount * PLATFORM_COMMISSION_RATE;

			const paymentRecord = await this.pb.collection('payments').create({
				order_id: [request.orderId],
				amount: firstMilestone.amount,
				commission: commission,
				status: 'pending',
				payment_gateway: 'neero',
				payment_gateway_ref: paymentResponse.transactionId
			});

			firstMilestone.paymentId = paymentRecord.id;
			firstMilestone.transactionId = paymentResponse.transactionId;

			await this.pb.collection('orders').update(request.orderId, {
				status: 'active',
				metadata: {
					milestones: milestones,
					currentMilestone: 1
				}
			});

			return {
				success: true,
				paymentUrl: paymentResponse.paymentUrl,
				transactionId: paymentResponse.transactionId,
				paymentId: paymentRecord.id,
				milestones: milestones,
				requiresSecondPayment: milestones.length > 1
			};
		} catch (error) {
			console.error('Escrow payment initiation failed:', error);
			throw error;
		}
	}

	/**
	 * Initiate second milestone payment
	 */
	async initiateSecondMilestone(orderId: string, returnUrl: string) {
		try {
			const order = await this.pb.collection('orders').getOne(orderId);
			const metadata = order.metadata as any;

			if (!metadata?.milestones || metadata.milestones.length < 2) {
				throw new Error('No second milestone found for this order');
			}

			const secondMilestone = metadata.milestones[1] as MilestonePayment;

			if (secondMilestone.status !== 'pending') {
				throw new Error('Second milestone already processed');
			}

			const paymentRequest: PaymentInitiateRequest = {
				amount: secondMilestone.amount,
				currency: order.currency,
				orderId: orderId,
				customerId: order.buyer_id as string,
				description: `Order ${orderId} - Milestone ${secondMilestone.milestoneNumber}`,
				returnUrl: returnUrl,
				callbackUrl: `${returnUrl}/api/webhooks/neero`,
				metadata: {
					orderId: orderId,
					milestoneNumber: secondMilestone.milestoneNumber,
					totalMilestones: metadata.milestones.length
				}
			};

			const paymentResponse = await this.neeroClient.initiatePayment(paymentRequest);

			const commission = secondMilestone.amount * PLATFORM_COMMISSION_RATE;

			const paymentRecord = await this.pb.collection('payments').create({
				order_id: [orderId],
				amount: secondMilestone.amount,
				commission: commission,
				status: 'pending',
				payment_gateway: 'neero',
				payment_gateway_ref: paymentResponse.transactionId
			});

			secondMilestone.paymentId = paymentRecord.id;
			secondMilestone.transactionId = paymentResponse.transactionId;

			metadata.currentMilestone = 2;
			await this.pb.collection('orders').update(orderId, { metadata });

			return {
				success: true,
				paymentUrl: paymentResponse.paymentUrl,
				transactionId: paymentResponse.transactionId,
				paymentId: paymentRecord.id
			};
		} catch (error) {
			console.error('Second milestone initiation failed:', error);
			throw error;
		}
	}

	/**
	 * Process payment completion webhook
	 */
	async handlePaymentCompleted(transactionId: string) {
		try {
			const payment = await this.pb.collection('payments').getFirstListItem(
				`payment_gateway_ref = "${transactionId}"`
			);

			if (payment.status === 'completed') {
				return { success: true, message: 'Payment already processed' };
			}

			await this.pb.collection('payments').update(payment.id, {
				status: 'completed'
			});

			const orderId = payment.order_id[0];
			const order = await this.pb.collection('orders').getOne(orderId);
			const metadata = order.metadata as any;

			if (metadata?.milestones) {
				const milestone = metadata.milestones.find(
					(m: MilestonePayment) => m.transactionId === transactionId
				);

				if (milestone) {
					milestone.status = 'paid';

					const allPaid = metadata.milestones.every(
						(m: MilestonePayment) => m.status === 'paid' || m.status === 'released'
					);

					await this.pb.collection('orders').update(orderId, {
						escrow_funded: allPaid,
						metadata: metadata
					});

					return {
						success: true,
						milestoneCompleted: milestone.milestoneNumber,
						allMilestonesPaid: allPaid
					};
				}
			} else {
				await this.pb.collection('orders').update(orderId, {
					escrow_funded: true
				});
			}

			return { success: true };
		} catch (error) {
			console.error('Payment completion processing failed:', error);
			throw error;
		}
	}

	/**
	 * Release payment to provider after service completion and approval
	 */
	async releasePayment(orderId: string, milestoneNumber?: number) {
		try {
			const order = await this.pb.collection('orders').getOne(orderId, {
				expand: 'provider_id'
			});

			if (order.status !== 'delivered') {
				throw new Error('Order must be delivered before payment release');
			}

			if (!order.escrow_funded) {
				throw new Error('Order escrow not fully funded');
			}

			const metadata = order.metadata as any;
			let milestonesToRelease: MilestonePayment[];

			if (metadata?.milestones) {
				if (milestoneNumber) {
					const milestone = metadata.milestones.find(
						(m: MilestonePayment) => m.milestoneNumber === milestoneNumber
					);
					if (!milestone) {
						throw new Error('Milestone not found');
					}
					milestonesToRelease = [milestone];
				} else {
					milestonesToRelease = metadata.milestones.filter(
						(m: MilestonePayment) => m.status === 'paid'
					);
				}
			} else {
				const payments = await this.pb.collection('payments').getFullList({
					filter: `order_id = "${orderId}" && status = "completed"`
				});
				milestonesToRelease = payments.map((p) => ({
					milestoneNumber: 1,
					amount: p.amount,
					percentage: 100,
					status: 'paid' as const,
					paymentId: p.id,
					transactionId: p.payment_gateway_ref
				}));
			}

			const results = [];

			for (const milestone of milestonesToRelease) {
				if (milestone.status !== 'paid') continue;

				const payment = await this.pb
					.collection('payments')
					.getOne(milestone.paymentId as string);

				const amountToProvider = payment.amount - payment.commission;

				const releaseResponse = await this.neeroClient.releasePayment({
					transactionId: milestone.transactionId as string,
					recipientId: order.provider_id[0],
					amount: amountToProvider,
					description: `Payment for order ${orderId} - Milestone ${milestone.milestoneNumber}`
				});

				milestone.status = 'released';

				results.push({
					milestoneNumber: milestone.milestoneNumber,
					amount: amountToProvider,
					commission: payment.commission,
					transferId: releaseResponse.transferId
				});
			}

			if (metadata?.milestones) {
				const allReleased = metadata.milestones.every(
					(m: MilestonePayment) => m.status === 'released'
				);

				await this.pb.collection('orders').update(orderId, {
					status: allReleased ? 'completed' : 'active',
					metadata: metadata
				});
			} else {
				await this.pb.collection('orders').update(orderId, {
					status: 'completed'
				});
			}

			return {
				success: true,
				released: results
			};
		} catch (error) {
			console.error('Payment release failed:', error);
			throw error;
		}
	}

	/**
	 * Refund payment if order is cancelled or disputed
	 */
	async refundPayment(orderId: string, reason: string) {
		try {
			const order = await this.pb.collection('orders').getOne(orderId);

			if (!['cancelled', 'disputed'].includes(order.status)) {
				throw new Error('Order must be cancelled or disputed for refund');
			}

			const payments = await this.pb.collection('payments').getFullList({
				filter: `order_id = "${orderId}" && status = "completed"`
			});

			const results = [];

			for (const payment of payments) {
				const refundResponse = await this.neeroClient.refundPayment(
					payment.payment_gateway_ref
				);

				await this.pb.collection('payments').update(payment.id, {
					status: 'refunded'
				});

				results.push({
					paymentId: payment.id,
					amount: payment.amount,
					refundId: refundResponse.transferId
				});
			}

			await this.pb.collection('orders').update(orderId, {
				escrow_funded: false,
				metadata: {
					...(order.metadata as any),
					refundReason: reason,
					refundedAt: new Date().toISOString()
				}
			});

			return {
				success: true,
				refunded: results
			};
		} catch (error) {
			console.error('Payment refund failed:', error);
			throw error;
		}
	}
}
