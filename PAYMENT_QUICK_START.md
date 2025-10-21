# Payment Integration - Quick Start Guide

## 🚀 Setup (5 minutes)

### 1. Add Environment Variables
```bash
# Add to .env file
NEERO_API_KEY=your_api_key
NEERO_MERCHANT_ID=your_merchant_id
NEERO_BASE_URL=https://api.neero.com
NEERO_WEBHOOK_SECRET=your_webhook_secret
```

### 2. Install Dependencies (if needed)
```bash
npm install
```

### 3. Configure Webhook URL in Neero Dashboard
```
https://yourdomain.com/api/webhooks/neero
```

## 📝 Basic Usage

### Client Payment (< 200,000)
```typescript
import { PaymentClient } from '$lib/utils/payment-client';

// 1. Initiate payment
const payment = await PaymentClient.initiatePayment(orderId);

// 2. Redirect to payment
window.location.href = payment.paymentUrl;

// 3. After work delivered, release payment
await PaymentClient.releasePayment(orderId);
```

### Milestone Payment (≥ 200,000)
```typescript
// 1. First milestone (50%)
const payment1 = await PaymentClient.initiatePayment(orderId);
window.location.href = payment1.paymentUrl;

// 2. Second milestone (50%)
const payment2 = await PaymentClient.initiateSecondMilestone(orderId);
window.location.href = payment2.paymentUrl;

// 3. Release all milestones
await PaymentClient.releasePayment(orderId);
```

## 🔍 Check Payment Status
```typescript
const status = await PaymentClient.getPaymentStatus(orderId);

console.log('Escrow Funded:', status.escrowFunded);
console.log('Milestones:', status.milestones);
console.log('Payments:', status.payments);
```

## 💰 Key Numbers

- **Milestone Threshold**: 200,000 (orders above split into 2 payments)
- **Platform Commission**: 10%
- **Payment Split**: 50% + 50% for large orders

### Example Calculation
```
Order Amount: $250,000
├─ Milestone 1: $125,000
├─ Milestone 2: $125,000
└─ Provider Receives: $225,000 (90%)
   Platform Keeps: $25,000 (10%)
```

## 🔄 Payment Lifecycle

```
1. Initiate Payment    → POST /api/payments/initiate
2. Payment Completed   → Webhook notification
3. Work Delivered      → Update order status
4. Release Payment     → POST /api/payments/release
5. Provider Receives   → Webhook notification
```

## 📱 Frontend Example

```svelte
<script>
  import { PaymentClient } from '$lib/utils/payment-client';
  
  export let order;
  
  async function handlePayment() {
    const result = await PaymentClient.initiatePayment(order.id);
    window.location.href = result.paymentUrl;
  }
</script>

<button on:click={handlePayment}>
  Pay {PaymentClient.formatCurrency(order.agreed_price)}
</button>
```

## 🧪 Testing

```typescript
// Test with small amount (single payment)
const testOrder1 = { agreed_price: 50000 };

// Test with large amount (milestone payment)
const testOrder2 = { agreed_price: 300000 };

// Check if requires milestones
PaymentClient.requiresMilestones(50000);  // false
PaymentClient.requiresMilestones(300000); // true
```

## ⚠️ Important

1. ✅ Always check `order.status === 'delivered'` before releasing payment
2. ✅ Verify webhook signatures for security
3. ✅ Handle errors gracefully
4. ✅ Test in sandbox environment first

## 📚 Full Documentation

- `PAYMENT_IMPLEMENTATION_SUMMARY.md` - Complete technical details
- `PAYMENT_INTEGRATION_GUIDE.md` - Detailed API documentation

## 🆘 Common Issues

### Payment Not Initiating
- Check environment variables are set
- Verify Neero API credentials
- Check order exists and user is buyer

### Webhook Not Working
- Verify webhook URL is publicly accessible
- Check webhook secret matches
- Review webhook logs in Neero dashboard

### Payment Release Failing
- Ensure order status is 'delivered'
- Verify escrow is fully funded
- Check user is the buyer

## 📞 Need Help?

1. Check console logs for errors
2. Verify API response messages
3. Review Neero Gateway documentation
4. Check PocketBase collections for data consistency
