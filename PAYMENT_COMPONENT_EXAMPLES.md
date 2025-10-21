# Payment UI Component Examples

## Complete Payment Management Component

```svelte
<!-- src/routes/orders/[orderId]/payment/+page.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { PaymentClient } from '$lib/utils/payment-client';
  import { PaymentValidators } from '$lib/utils/payment-validators';
  import { pb } from '$lib/pocketbase';
  
  let order = null;
  let paymentStatus = null;
  let loading = false;
  let error = null;
  let interval;
  
  $: orderId = $page.params.orderId;
  $: userId = pb.authStore.model?.id;
  $: isBuyer = order?.buyer_id === userId;
  $: isProvider = order?.provider_id?.includes(userId);
  
  onMount(async () => {
    await loadOrder();
    await loadPaymentStatus();
    
    // Poll payment status every 5 seconds
    interval = setInterval(loadPaymentStatus, 5000);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
  
  async function loadOrder() {
    try {
      order = await pb.collection('orders').getOne(orderId, {
        expand: 'buyer_id,provider_id,job_id'
      });
    } catch (err) {
      error = err.message;
    }
  }
  
  async function loadPaymentStatus() {
    try {
      paymentStatus = await PaymentClient.getPaymentStatus(orderId);
    } catch (err) {
      console.error('Failed to load payment status:', err);
    }
  }
  
  async function handleInitiatePayment() {
    loading = true;
    error = null;
    
    try {
      const validation = PaymentValidators.canInitiatePayment(order, userId);
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      
      const result = await PaymentClient.initiatePayment(orderId);
      
      if (result.requiresSecondPayment) {
        alert(`This order requires 2 milestone payments of ${PaymentClient.formatCurrency(result.milestones[0].amount)} each`);
      }
      
      // Redirect to payment gateway
      window.location.href = result.paymentUrl;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
  
  async function handleSecondMilestone() {
    loading = true;
    error = null;
    
    try {
      const validation = PaymentValidators.canInitiateSecondMilestone(order, userId);
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      
      const result = await PaymentClient.initiateSecondMilestone(orderId);
      window.location.href = result.paymentUrl;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
  
  async function handleReleasePayment() {
    if (!confirm('Are you sure you want to approve this work and release payment?')) {
      return;
    }
    
    loading = true;
    error = null;
    
    try {
      const validation = PaymentValidators.canReleasePayment(order, userId);
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      
      const result = await PaymentClient.releasePayment(orderId);
      
      alert('Payment successfully released to provider!');
      await loadOrder();
      await loadPaymentStatus();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
  
  async function handleRefund() {
    const reason = prompt('Please provide a reason for the refund:');
    if (!reason) return;
    
    loading = true;
    error = null;
    
    try {
      const validation = PaymentValidators.canRefund(order, userId);
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      
      // Update order status first
      await pb.collection('orders').update(orderId, {
        status: 'cancelled'
      });
      
      const result = await PaymentClient.requestRefund(orderId, reason);
      
      alert('Refund processed successfully!');
      await loadOrder();
      await loadPaymentStatus();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="payment-container">
  <h1>Payment Management</h1>
  
  {#if error}
    <div class="alert alert-error">
      {error}
    </div>
  {/if}
  
  {#if order && paymentStatus}
    <div class="order-summary">
      <h2>Order Summary</h2>
      <p>Order ID: {order.id}</p>
      <p>Amount: {PaymentClient.formatCurrency(order.agreed_price, order.currency)}</p>
      <p>Status: <span class="badge">{order.status}</span></p>
      <p>Escrow Funded: {order.escrow_funded ? '✅ Yes' : '⏳ No'}</p>
    </div>
    
    {#if paymentStatus.milestones}
      <div class="milestones">
        <h3>Payment Milestones</h3>
        {#each paymentStatus.milestones as milestone}
          <div class="milestone-card" class:paid={milestone.status === 'paid'} class:released={milestone.status === 'released'}>
            <div class="milestone-header">
              <h4>Milestone {milestone.milestoneNumber}</h4>
              <span class="status-badge status-{milestone.status}">{milestone.status}</span>
            </div>
            <p>Amount: {PaymentClient.formatCurrency(milestone.amount, order.currency)}</p>
            <p>Percentage: {milestone.percentage}%</p>
            {#if milestone.transactionId}
              <p class="transaction-id">TX: {milestone.transactionId}</p>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
    
    {#if isBuyer}
      <div class="buyer-actions">
        <h3>Buyer Actions</h3>
        
        {#if !order.escrow_funded}
          <button 
            class="btn btn-primary" 
            on:click={handleInitiatePayment}
            disabled={loading}
          >
            {#if loading}
              Processing...
            {:else}
              Pay {PaymentClient.formatCurrency(order.agreed_price, order.currency)}
            {/if}
          </button>
        {/if}
        
        {#if paymentStatus.milestones && paymentStatus.milestones.length > 1}
          {@const secondMilestone = paymentStatus.milestones[1]}
          {#if secondMilestone.status === 'pending' && paymentStatus.milestones[0].status === 'paid'}
            <button 
              class="btn btn-primary" 
              on:click={handleSecondMilestone}
              disabled={loading}
            >
              Pay Second Milestone ({PaymentClient.formatCurrency(secondMilestone.amount, order.currency)})
            </button>
          {/if}
        {/if}
        
        {#if order.status === 'delivered' && order.escrow_funded}
          <button 
            class="btn btn-success" 
            on:click={handleReleasePayment}
            disabled={loading}
          >
            Approve & Release Payment
          </button>
        {/if}
        
        {#if order.escrow_funded && ['active', 'delivered'].includes(order.status)}
          <button 
            class="btn btn-danger" 
            on:click={handleRefund}
            disabled={loading}
          >
            Cancel & Request Refund
          </button>
        {/if}
      </div>
    {/if}
    
    {#if isProvider}
      <div class="provider-info">
        <h3>Provider Information</h3>
        
        {#if order.escrow_funded}
          <div class="alert alert-success">
            ✅ Payment secured in escrow
          </div>
          
          {@const payout = PaymentValidators.calculateProviderPayout(order.agreed_price)}
          <div class="payout-breakdown">
            <h4>Payment Breakdown</h4>
            <p>Gross Amount: {PaymentClient.formatCurrency(payout.grossAmount, order.currency)}</p>
            <p>Platform Fee (10%): {PaymentClient.formatCurrency(payout.commission, order.currency)}</p>
            <p class="net-amount">You'll Receive: {PaymentClient.formatCurrency(payout.netAmount, order.currency)}</p>
          </div>
        {:else}
          <div class="alert alert-warning">
            ⏳ Waiting for buyer to fund escrow
          </div>
        {/if}
        
        {#if order.status === 'delivered'}
          <div class="alert alert-info">
            🎉 Work delivered! Waiting for buyer approval to release payment.
          </div>
        {/if}
        
        {#if order.status === 'completed'}
          <div class="alert alert-success">
            ✅ Payment released! Check your account balance.
          </div>
        {/if}
      </div>
    {/if}
    
    <div class="payment-history">
      <h3>Payment History</h3>
      {#if paymentStatus.payments.length > 0}
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Commission</th>
              <th>Status</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {#each paymentStatus.payments as payment}
              <tr>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                <td>{PaymentClient.formatCurrency(payment.amount, order.currency)}</td>
                <td>{PaymentClient.formatCurrency(payment.commission, order.currency)}</td>
                <td><span class="badge badge-{payment.status}">{payment.status}</span></td>
                <td class="transaction-id">{payment.transactionId}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <p>No payment history yet</p>
      {/if}
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style>
  .payment-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .order-summary {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }
  
  .milestones {
    margin-bottom: 2rem;
  }
  
  .milestone-card {
    border: 2px solid #dee2e6;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .milestone-card.paid {
    border-color: #28a745;
    background: #d4edda;
  }
  
  .milestone-card.released {
    border-color: #007bff;
    background: #cfe2ff;
  }
  
  .milestone-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .status-pending {
    background: #ffc107;
    color: #000;
  }
  
  .status-paid {
    background: #28a745;
    color: #fff;
  }
  
  .status-released {
    background: #007bff;
    color: #fff;
  }
  
  .buyer-actions, .provider-info {
    margin-bottom: 2rem;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
  }
  
  .btn-success {
    background: #28a745;
    color: white;
  }
  
  .btn-danger {
    background: #dc3545;
    color: white;
  }
  
  .alert {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .alert-success {
    background: #d4edda;
    color: #155724;
  }
  
  .alert-warning {
    background: #fff3cd;
    color: #856404;
  }
  
  .alert-info {
    background: #cfe2ff;
    color: #084298;
  }
  
  .alert-error {
    background: #f8d7da;
    color: #721c24;
  }
  
  .payout-breakdown {
    background: #e7f3ff;
    padding: 1rem;
    border-radius: 4px;
  }
  
  .net-amount {
    font-size: 1.25rem;
    font-weight: bold;
    color: #28a745;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
  }
  
  .transaction-id {
    font-family: monospace;
    font-size: 0.875rem;
    color: #6c757d;
  }
  
  .badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  .badge-active {
    background: #007bff;
    color: white;
  }
  
  .badge-delivered {
    background: #ffc107;
    color: #000;
  }
  
  .badge-completed {
    background: #28a745;
    color: white;
  }
  
  .badge-cancelled {
    background: #dc3545;
    color: white;
  }
</style>
```

## Simple Payment Button Component

```svelte
<!-- src/lib/components/PaymentButton.svelte -->
<script lang="ts">
  import { PaymentClient } from '$lib/utils/payment-client';
  
  export let orderId: string;
  export let amount: number;
  export let currency: string = 'USD';
  export let disabled: boolean = false;
  
  let loading = false;
  
  async function handlePayment() {
    loading = true;
    try {
      const result = await PaymentClient.initiatePayment(orderId);
      window.location.href = result.paymentUrl;
    } catch (error) {
      alert(error.message);
      loading = false;
    }
  }
</script>

<button 
  class="payment-btn" 
  on:click={handlePayment}
  disabled={disabled || loading}
>
  {#if loading}
    <span class="spinner"></span>
    Processing...
  {:else}
    💳 Pay {PaymentClient.formatCurrency(amount, currency)}
  {/if}
</button>

<style>
  .payment-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .payment-btn:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  .payment-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
```

## Payment Status Badge Component

```svelte
<!-- src/lib/components/PaymentStatusBadge.svelte -->
<script lang="ts">
  export let status: string;
  export let escrowFunded: boolean;
  
  function getStatusInfo(status: string, funded: boolean) {
    if (funded && status === 'active') {
      return { label: 'In Progress', color: 'blue' };
    }
    
    const statusMap = {
      'pending': { label: 'Awaiting Payment', color: 'yellow' },
      'active': { label: 'Payment Pending', color: 'orange' },
      'delivered': { label: 'Awaiting Approval', color: 'purple' },
      'completed': { label: 'Completed', color: 'green' },
      'cancelled': { label: 'Cancelled', color: 'red' },
      'disputed': { label: 'Disputed', color: 'red' }
    };
    
    return statusMap[status] || { label: status, color: 'gray' };
  }
  
  $: info = getStatusInfo(status, escrowFunded);
</script>

<span class="badge badge-{info.color}">
  {info.label}
</span>

<style>
  .badge {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .badge-green {
    background: #d4edda;
    color: #155724;
  }
  
  .badge-blue {
    background: #cfe2ff;
    color: #084298;
  }
  
  .badge-yellow {
    background: #fff3cd;
    color: #856404;
  }
  
  .badge-orange {
    background: #ffe5d0;
    color: #8b4513;
  }
  
  .badge-purple {
    background: #e7d4ff;
    color: #6f42c1;
  }
  
  .badge-red {
    background: #f8d7da;
    color: #721c24;
  }
  
  .badge-gray {
    background: #e9ecef;
    color: #495057;
  }
</style>
```

These components provide a complete, production-ready payment interface for your platform!
