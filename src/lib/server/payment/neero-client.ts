/**
 * Neero Gateway Payment Client
 * Handles communication with Neero payment gateway API
 */

export interface NeeroConfig {
	apiKey: string;
	merchantId: string;
	baseUrl: string;
	webhookSecret: string;
}

export interface PaymentInitiateRequest {
	amount: number;
	currency: string;
	orderId: string;
	customerId: string;
	description: string;
	returnUrl: string;
	callbackUrl: string;
	metadata?: Record<string, any>;
}

export interface PaymentInitiateResponse {
	success: boolean;
	transactionId: string;
	paymentUrl: string;
	reference: string;
	expiresAt: string;
}

export interface PaymentStatusResponse {
	success: boolean;
	transactionId: string;
	status: 'pending' | 'completed' | 'failed' | 'expired';
	amount: number;
	currency: string;
	paidAt?: string;
	reference: string;
}

export interface PaymentReleaseRequest {
	transactionId: string;
	recipientId: string;
	amount: number;
	description: string;
}

export interface PaymentReleaseResponse {
	success: boolean;
	transferId: string;
	status: 'pending' | 'completed' | 'failed';
	processedAt: string;
}

export interface WebhookPayload {
	event: 'payment.completed' | 'payment.failed' | 'transfer.completed' | 'transfer.failed';
	transactionId: string;
	reference: string;
	amount: number;
	currency: string;
	status: string;
	timestamp: string;
	signature: string;
	metadata?: Record<string, any>;
}

export class NeeroGatewayClient {
	private config: NeeroConfig;

	constructor(config: NeeroConfig) {
		this.config = config;
	}

	/**
	 * Initiate a payment collection (escrow)
	 */
	async initiatePayment(request: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
		const response = await fetch(`${this.config.baseUrl}/api/v1/payments/initiate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.config.apiKey}`,
				'X-Merchant-ID': this.config.merchantId
			},
			body: JSON.stringify(request)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Neero Gateway Error: ${error.message || response.statusText}`);
		}

		return response.json();
	}

	/**
	 * Check payment status
	 */
	async getPaymentStatus(transactionId: string): Promise<PaymentStatusResponse> {
		const response = await fetch(
			`${this.config.baseUrl}/api/v1/payments/${transactionId}/status`,
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${this.config.apiKey}`,
					'X-Merchant-ID': this.config.merchantId
				}
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Neero Gateway Error: ${error.message || response.statusText}`);
		}

		return response.json();
	}

	/**
	 * Release payment from escrow to provider
	 */
	async releasePayment(request: PaymentReleaseRequest): Promise<PaymentReleaseResponse> {
		const response = await fetch(`${this.config.baseUrl}/api/v1/payments/release`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.config.apiKey}`,
				'X-Merchant-ID': this.config.merchantId
			},
			body: JSON.stringify(request)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Neero Gateway Error: ${error.message || response.statusText}`);
		}

		return response.json();
	}

	/**
	 * Refund a payment
	 */
	async refundPayment(transactionId: string, amount?: number): Promise<PaymentReleaseResponse> {
		const response = await fetch(`${this.config.baseUrl}/api/v1/payments/${transactionId}/refund`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.config.apiKey}`,
				'X-Merchant-ID': this.config.merchantId
			},
			body: JSON.stringify({ amount })
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Neero Gateway Error: ${error.message || response.statusText}`);
		}

		return response.json();
	}

	/**
	 * Verify webhook signature
	 */
	verifyWebhookSignature(payload: string, signature: string): boolean {
		const crypto = require('crypto');
		const expectedSignature = crypto
			.createHmac('sha256', this.config.webhookSecret)
			.update(payload)
			.digest('hex');

		return crypto.timingSafeEqual(
			Buffer.from(signature),
			Buffer.from(expectedSignature)
		);
	}
}
