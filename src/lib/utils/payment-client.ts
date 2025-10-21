/**
 * Client-side Payment Utilities
 * Helper functions for interacting with payment API from frontend
 */

export interface PaymentInitiateResponse {
	success: boolean;
	paymentUrl: string;
	transactionId: string;
	paymentId: string;
	milestones: any[];
	requiresSecondPayment: boolean;
}

export interface PaymentStatusResponse {
	orderId: string;
	orderStatus: string;
	agreedPrice: number;
	currency: string;
	escrowFunded: boolean;
	milestones: any[] | null;
	payments: any[];
}

export class PaymentClient {
	/**
	 * Initiate payment for an order
	 */
	static async initiatePayment(orderId: string): Promise<PaymentInitiateResponse> {
		const response = await fetch('/api/payments/initiate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ orderId })
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Payment initiation failed');
		}

		return response.json();
	}

	/**
	 * Initiate second milestone payment
	 */
	static async initiateSecondMilestone(orderId: string): Promise<PaymentInitiateResponse> {
		const response = await fetch('/api/payments/milestone', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ orderId })
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Milestone payment initiation failed');
		}

		return response.json();
	}

	/**
	 * Release payment to provider
	 */
	static async releasePayment(orderId: string, milestoneNumber?: number) {
		const response = await fetch('/api/payments/release', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ orderId, milestoneNumber })
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Payment release failed');
		}

		return response.json();
	}

	/**
	 * Request refund
	 */
	static async requestRefund(orderId: string, reason: string) {
		const response = await fetch('/api/payments/refund', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ orderId, reason })
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Refund request failed');
		}

		return response.json();
	}

	/**
	 * Get payment status
	 */
	static async getPaymentStatus(orderId: string): Promise<PaymentStatusResponse> {
		const response = await fetch(`/api/payments/status?orderId=${orderId}`);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to fetch payment status');
		}

		return response.json();
	}

	/**
	 * Check if order requires milestone payments
	 */
	static requiresMilestones(amount: number): boolean {
		return amount > 200000;
	}

	/**
	 * Calculate milestone amounts
	 */
	static calculateMilestones(totalAmount: number): { first: number; second: number } | null {
		if (!this.requiresMilestones(totalAmount)) {
			return null;
		}

		return {
			first: totalAmount * 0.5,
			second: totalAmount * 0.5
		};
	}

	/**
	 * Calculate provider payout after commission
	 */
	static calculateProviderPayout(amount: number, commissionRate: number = 0.10): number {
		return amount * (1 - commissionRate);
	}

	/**
	 * Format currency
	 */
	static formatCurrency(amount: number, currency: string = 'USD'): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency
		}).format(amount);
	}
}

/**
 * Payment status check hook (for Svelte stores)
 */
export function createPaymentStatusStore(orderId: string, intervalMs: number = 5000) {
	let interval: NodeJS.Timeout;
	
	return {
		subscribe: (callback: (status: PaymentStatusResponse) => void) => {
			const fetchStatus = async () => {
				try {
					const status = await PaymentClient.getPaymentStatus(orderId);
					callback(status);
				} catch (error) {
					console.error('Failed to fetch payment status:', error);
				}
			};

			fetchStatus();
			interval = setInterval(fetchStatus, intervalMs);

			return () => clearInterval(interval);
		}
	};
}
