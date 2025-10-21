/**
 * Payment System Type Definitions
 */

export interface OrderMetadata {
	milestones?: MilestonePayment[];
	currentMilestone?: number;
	refundReason?: string;
	refundedAt?: string;
	[key: string]: any;
}

export interface MilestonePayment {
	milestoneNumber: number;
	amount: number;
	percentage: number;
	status: 'pending' | 'paid' | 'released';
	paymentId?: string;
	transactionId?: string;
}

export interface PaymentStatusSummary {
	orderId: string;
	orderStatus: string;
	agreedPrice: number;
	currency: string;
	escrowFunded: boolean;
	milestones: MilestonePayment[] | null;
	payments: PaymentSummary[];
}

export interface PaymentSummary {
	id: string;
	amount: number;
	commission: number;
	status: string;
	transactionId: string;
	createdAt: string;
	updatedAt: string;
}

export interface EscrowPaymentResponse {
	success: boolean;
	paymentUrl: string;
	transactionId: string;
	paymentId: string;
	milestones: MilestonePayment[];
	requiresSecondPayment: boolean;
}

export interface PaymentReleaseResponse {
	success: boolean;
	released: {
		milestoneNumber: number;
		amount: number;
		commission: number;
		transferId: string;
	}[];
}

export interface RefundResponse {
	success: boolean;
	refunded: {
		paymentId: string;
		amount: number;
		refundId: string;
	}[];
}

export const MILESTONE_THRESHOLD = 200000;
export const PLATFORM_COMMISSION_RATE = 0.10;

export const PaymentStatus = {
	PENDING: 'pending',
	COMPLETED: 'completed',
	FAILED: 'failed',
	REFUNDED: 'refunded'
} as const;

export const OrderStatus = {
	ACTIVE: 'active',
	DELIVERED: 'delivered',
	COMPLETED: 'completed',
	CANCELLED: 'cancelled',
	DISPUTED: 'disputed'
} as const;

export const MilestoneStatus = {
	PENDING: 'pending',
	PAID: 'paid',
	RELEASED: 'released'
} as const;
