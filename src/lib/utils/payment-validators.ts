/**
 * Payment Validation Utilities
 * Helper functions to validate payment operations
 */

import type { OrdersResponse } from '../../pocketbase-types';

export class PaymentValidators {
	/**
	 * Validate order can accept payment initiation
	 */
	static canInitiatePayment(order: OrdersResponse, userId: string): {
		valid: boolean;
		error?: string;
	} {
		if (order.buyer_id !== userId) {
			return { valid: false, error: 'Only the buyer can initiate payment' };
		}

		if (order.escrow_funded) {
			return { valid: false, error: 'Order already funded' };
		}

		if (!['active'].includes(order.status)) {
			return { valid: false, error: 'Order must be active to accept payment' };
		}

		return { valid: true };
	}

	/**
	 * Validate second milestone can be initiated
	 */
	static canInitiateSecondMilestone(
		order: OrdersResponse,
		userId: string
	): {
		valid: boolean;
		error?: string;
	} {
		if (order.buyer_id !== userId) {
			return { valid: false, error: 'Only the buyer can initiate payment' };
		}

		const metadata = order.metadata as any;

		if (!metadata?.milestones || metadata.milestones.length < 2) {
			return { valid: false, error: 'Order does not have milestone payments' };
		}

		const firstMilestone = metadata.milestones[0];
		if (firstMilestone.status !== 'paid') {
			return { valid: false, error: 'First milestone must be paid first' };
		}

		const secondMilestone = metadata.milestones[1];
		if (secondMilestone.status !== 'pending') {
			return { valid: false, error: 'Second milestone already processed' };
		}

		return { valid: true };
	}

	/**
	 * Validate payment can be released
	 */
	static canReleasePayment(order: OrdersResponse, userId: string): {
		valid: boolean;
		error?: string;
	} {
		if (order.buyer_id !== userId) {
			return { valid: false, error: 'Only the buyer can release payment' };
		}

		if (order.status !== 'delivered') {
			return { valid: false, error: 'Order must be delivered before releasing payment' };
		}

		if (!order.escrow_funded) {
			return { valid: false, error: 'Order escrow not fully funded' };
		}

		const metadata = order.metadata as any;
		if (metadata?.milestones) {
			const hasPaidMilestones = metadata.milestones.some(
				(m: any) => m.status === 'paid'
			);
			if (!hasPaidMilestones) {
				return { valid: false, error: 'No milestones available for release' };
			}
		}

		return { valid: true };
	}

	/**
	 * Validate refund can be processed
	 */
	static canRefund(
		order: OrdersResponse,
		userId: string
	): {
		valid: boolean;
		error?: string;
	} {
		if (order.buyer_id !== userId && !order.provider_id.includes(userId)) {
			return { valid: false, error: 'Only buyer or provider can request refund' };
		}

		if (!['cancelled', 'disputed'].includes(order.status)) {
			return { valid: false, error: 'Order must be cancelled or disputed for refund' };
		}

		if (!order.escrow_funded) {
			return { valid: false, error: 'No funds in escrow to refund' };
		}

		return { valid: true };
	}

	/**
	 * Check if amount requires milestone payments
	 */
	static requiresMilestones(amount: number): boolean {
		return amount > 200000;
	}

	/**
	 * Validate currency is supported
	 */
	static isSupportedCurrency(currency: string): boolean {
		const supported = ['USD', 'EUR', 'GBP', 'NGN', 'GHS', 'KES', 'ZAR'];
		return supported.includes(currency.toUpperCase());
	}

	/**
	 * Validate amount is positive and reasonable
	 */
	static isValidAmount(amount: number): {
		valid: boolean;
		error?: string;
	} {
		if (amount <= 0) {
			return { valid: false, error: 'Amount must be positive' };
		}

		if (amount > 10000000) {
			return { valid: false, error: 'Amount exceeds maximum limit' };
		}

		if (!Number.isFinite(amount)) {
			return { valid: false, error: 'Invalid amount format' };
		}

		return { valid: true };
	}

	/**
	 * Calculate expected milestone amounts
	 */
	static calculateExpectedMilestones(totalAmount: number): {
		milestone1: number;
		milestone2: number | null;
	} {
		if (!this.requiresMilestones(totalAmount)) {
			return {
				milestone1: totalAmount,
				milestone2: null
			};
		}

		return {
			milestone1: totalAmount * 0.5,
			milestone2: totalAmount * 0.5
		};
	}

	/**
	 * Calculate provider payout after commission
	 */
	static calculateProviderPayout(
		amount: number,
		commissionRate: number = 0.1
	): {
		grossAmount: number;
		commission: number;
		netAmount: number;
	} {
		const commission = amount * commissionRate;
		const netAmount = amount - commission;

		return {
			grossAmount: amount,
			commission: commission,
			netAmount: netAmount
		};
	}

	/**
	 * Validate milestone data structure
	 */
	static isValidMilestoneData(milestones: any[]): boolean {
		if (!Array.isArray(milestones)) return false;
		if (milestones.length === 0 || milestones.length > 2) return false;

		return milestones.every(
			(m) =>
				typeof m.milestoneNumber === 'number' &&
				typeof m.amount === 'number' &&
				typeof m.percentage === 'number' &&
				['pending', 'paid', 'released'].includes(m.status)
		);
	}

	/**
	 * Get all paid but not released milestones
	 */
	static getPaidMilestones(order: OrdersResponse): any[] {
		const metadata = order.metadata as any;
		if (!metadata?.milestones) return [];

		return metadata.milestones.filter((m: any) => m.status === 'paid');
	}

	/**
	 * Check if all milestones are paid
	 */
	static areAllMilestonesPaid(order: OrdersResponse): boolean {
		const metadata = order.metadata as any;
		if (!metadata?.milestones) return order.escrow_funded;

		return metadata.milestones.every(
			(m: any) => m.status === 'paid' || m.status === 'released'
		);
	}

	/**
	 * Get next pending milestone
	 */
	static getNextPendingMilestone(order: OrdersResponse): any | null {
		const metadata = order.metadata as any;
		if (!metadata?.milestones) return null;

		return metadata.milestones.find((m: any) => m.status === 'pending') || null;
	}

	/**
	 * Calculate total amount paid
	 */
	static getTotalPaidAmount(order: OrdersResponse): number {
		const metadata = order.metadata as any;
		if (!metadata?.milestones) {
			return order.escrow_funded ? order.agreed_price : 0;
		}

		return metadata.milestones
			.filter((m: any) => m.status === 'paid' || m.status === 'released')
			.reduce((sum: number, m: any) => sum + m.amount, 0);
	}

	/**
	 * Calculate total amount released
	 */
	static getTotalReleasedAmount(order: OrdersResponse): number {
		const metadata = order.metadata as any;
		if (!metadata?.milestones) {
			return order.status === 'completed' ? order.agreed_price : 0;
		}

		return metadata.milestones
			.filter((m: any) => m.status === 'released')
			.reduce((sum: number, m: any) => sum + m.amount, 0);
	}

	/**
	 * Get payment progress percentage
	 */
	static getPaymentProgress(order: OrdersResponse): {
		paidPercentage: number;
		releasedPercentage: number;
		remainingPercentage: number;
	} {
		const totalPaid = this.getTotalPaidAmount(order);
		const totalReleased = this.getTotalReleasedAmount(order);
		const total = order.agreed_price;

		return {
			paidPercentage: (totalPaid / total) * 100,
			releasedPercentage: (totalReleased / total) * 100,
			remainingPercentage: ((total - totalPaid) / total) * 100
		};
	}
}
