# Neero Gateway Payment Integration Guide

## Overview

This payment integration implements an escrow system using Neero Gateway API, similar to Stripe Connect. Payments are collected, held in escrow, and released to providers upon service completion and buyer approval.

## Key Features

1. **Escrow Payment System**: Funds are held securely until service completion
2. **Milestone Payments**: Orders over 200,000 are automatically split into two 50/50 payments
3. **Platform Commission**: 10% commission automatically deducted before provider payout
4. **Refund Support**: Handle cancellations and disputes with automated refunds
5. **Webhook Integration**: Real-time payment status updates

## Payment Flow

### Standard Payment (< 200,000)

```
1. Client initiates payment → Escrow collected
2. Provider completes work → Client reviews
3. Client approves → Payment released to provider (minus 10% commission)
```

### Milestone Payment (≥ 200,000)

```
1. Client pays 50% → First milestone collected
2. Provider starts work
3. Client pays remaining 50% → Second milestone collected  
4. Provider completes work → Client reviews
5. Client approves → Both milestones released to provider (minus commission)
```

## API Endpoints

### 1. Initiate Payment
```
POST /api/payments/initiate
```

**Request Body:**
```json
{
  "orderId": "order_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "paymentUrl": "https://payment.neero.com/...",
  "transactionId": "txn_xxxxx",
  "paymentId": "payment_record_id",
  "milestones": [
    {
      "milestoneNumber": 1,
      "amount": 100000,
      "percentage": 50,
      "status": "pending"
    }
  ],
  "requiresSecondPayment": true
}
```

### 2. Initiate Second Milestone
```
POST /api/payments/milestone
```

**Request Body:**
```json
{
  "orderId": "order_id_here"
}
```

### 3. Release Payment to Provider
```
POST /api/payments/release
```

**Request Body:**
```json
{
  "orderId": "order_id_here",
  "milestoneNumber": 1  // Optional: release specific milestone
}
```

**Response:**
```json
{
  "success": true,
  "released": [
    {
      "milestoneNumber": 1,
      "amount": 90000,
      "commission": 10000,
      "transferId": "transfer_xxxxx"
    }
  ]
}
```

### 4. Refund Payment
```
POST /api/payments/refund
```

**Request Body:**
```json
{
  "orderId": "order_id_here",
  "reason": "Service cancelled by buyer"
}
```

### 5. Check Payment Status
```
GET /api/payments/status?orderId=xxx
```

**Response:**
```json
{
  "orderId": "xxx",
  "orderStatus": "active",
  "agreedPrice": 250000,
  "currency": "USD",
  "escrowFunded": true,
  "milestones": [
    {
      "milestoneNumber": 1,
      "amount": 125000,
      "percentage": 50,
      "status": "paid",
      "transactionId": "txn_xxxxx"
    },
    {
      "milestoneNumber": 2,
      "amount": 125000,
      "percentage": 50,
      "status": "pending"
    }
  ],
  "payments": [...]
}
```

## Webhook Handler

Neero Gateway will send webhooks to:
```
POST /api/webhooks/neero
```

**Supported Events:**
- `payment.completed` - Payment successfully collected
- `payment.failed` - Payment collection failed
- `transfer.completed` - Payment released to provider
- `transfer.failed` - Payment release failed

## Configuration

Add these environment variables to your `.env` file:

```env
NEERO_API_KEY=your_neero_api_key_here
NEERO_MERCHANT_ID=your_merchant_id_here
NEERO_BASE_URL=https://api.neero.com
NEERO_WEBHOOK_SECRET=your_webhook_secret_here
```

## Database Schema Updates

The integration uses existing PocketBase collections:

### Orders Collection
- `escrow_funded`: boolean - Indicates if payment is in escrow
- `metadata`: JSON - Stores milestone information

### Payments Collection
- `payment_gateway`: "neero"
- `payment_gateway_ref`: Transaction ID from Neero
- `commission`: Platform commission amount
- `status`: "pending" | "completed" | "failed" | "refunded"

## Usage Example

### Frontend Implementation

```typescript
// 1. Initiate payment when buyer accepts proposal
async function initiateOrderPayment(orderId: string) {
  const response = await fetch('/api/payments/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId })
  });
  
  const result = await response.json();
  
  // Redirect buyer to payment URL
  window.location.href = result.paymentUrl;
}

// 2. Check if second milestone payment needed
async function checkMilestoneStatus(orderId: string) {
  const response = await fetch(`/api/payments/status?orderId=${orderId}`);
  const status = await response.json();
  
  if (status.milestones && status.milestones.length > 1) {
    const secondMilestone = status.milestones[1];
    if (secondMilestone.status === 'pending') {
      // Show button to pay second milestone
      return true;
    }
  }
  return false;
}

// 3. Release payment after service delivery
async function approveAndReleasePayment(orderId: string) {
  // First mark order as delivered
  await pb.collection('orders').update(orderId, {
    status: 'delivered'
  });
  
  // Then release payment
  const response = await fetch('/api/payments/release', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId })
  });
  
  const result = await response.json();
  console.log('Payment released:', result);
}

// 4. Request refund for cancelled order
async function requestRefund(orderId: string, reason: string) {
  // First update order status
  await pb.collection('orders').update(orderId, {
    status: 'cancelled'
  });
  
  // Then request refund
  const response = await fetch('/api/payments/refund', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, reason })
  });
  
  return await response.json();
}
```

## Security Notes

1. **Webhook Signature Verification**: All webhooks are verified using HMAC-SHA256
2. **Authorization**: All endpoints check user authentication and authorization
3. **Commission Handling**: Commission is automatically calculated and stored
4. **Payment Status Tracking**: All state changes are tracked in database

## Commission Structure

- Platform takes 10% commission on all payments
- Commission is deducted before releasing payment to provider
- Example: $100,000 service → Provider receives $90,000, Platform keeps $10,000

## Testing

### Test Milestone Payments
```typescript
// Order with amount > 200,000 will auto-split
const order = await pb.collection('orders').create({
  buyer_id: 'buyer_id',
  provider_id: ['provider_id'],
  agreed_price: 250000,  // Will split into 125k + 125k
  currency: 'USD',
  status: 'active'
});
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad request (validation error)
- `401`: Unauthorized
- `403`: Forbidden (insufficient permissions)
- `500`: Server error

## Next Steps

1. **Configure Neero Gateway Account**: Get API credentials
2. **Set Environment Variables**: Add credentials to `.env`
3. **Test Webhook URL**: Ensure webhook endpoint is accessible
4. **Implement Frontend**: Add payment UI components
5. **Set Up Notifications**: Add email/push notifications for payment events
6. **Test Payment Flow**: Complete end-to-end testing with test credentials

## Support

For Neero Gateway API documentation, refer to the PDF provided or contact Neero support.
