/**
 * Payment Services Module
 * Exports all payment-related services and utilities
 */

export { NeeroGatewayClient } from './neero-client';
export { EscrowService } from './escrow-service';

export type {
	NeeroConfig,
	PaymentInitiateRequest,
	PaymentInitiateResponse,
	PaymentStatusResponse,
	PaymentReleaseRequest,
	PaymentReleaseResponse,
	WebhookPayload
} from './neero-client';

export type {
	OrderMetadata,
	MilestonePayment,
	PaymentStatusSummary,
	PaymentSummary,
	EscrowPaymentResponse,
	PaymentReleaseResponse,
	RefundResponse,
	EscrowPaymentRequest
} from './types';

export {
	MILESTONE_THRESHOLD,
	PLATFORM_COMMISSION_RATE,
	PaymentStatus,
	OrderStatus,
	MilestoneStatus
} from './types';
