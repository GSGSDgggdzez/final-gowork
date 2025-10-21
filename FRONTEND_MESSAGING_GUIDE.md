# Frontend Messaging Integration Guide

Quick guide for implementing real-time chat using Stream Chat in the GoWork platform.

## 📦 Prerequisites

```bash
npm install stream-chat
```

## 🔐 Environment Setup

Add to your frontend environment:
```env
PUBLIC_STREAM_API_KEY=your_stream_api_key
```

## 🚀 Quick Start Guide

### Step 1: Initialize Stream Chat Client (On App Load)

Create a Stream Chat store/service file:

```typescript
// src/lib/stores/chat.ts
import { StreamChat } from 'stream-chat';
import { writable } from 'svelte/store';

let streamClient: StreamChat | null = null;

export const chatClient = writable<StreamChat | null>(null);
export const isConnected = writable(false);

export async function initializeChatClient(user: { id: string }) {
  if (streamClient) return streamClient;

  try {
    // Step 1: Get Stream token from backend
    const response = await fetch('/api/stream/token', { method: 'POST' });
    const { userId, token } = await response.json();

    // Step 2: Initialize Stream client
    streamClient = StreamChat.getInstance(import.meta.env.PUBLIC_STREAM_API_KEY);
    
    // Step 3: Connect user
    await streamClient.connectUser(
      {
        id: userId,
        name: user.name,
      },
      token
    );

    chatClient.set(streamClient);
    isConnected.set(true);

    return streamClient;
  } catch (error) {
    console.error('Failed to initialize chat:', error);
    throw error;
  }
}

export async function disconnectChat() {
  if (streamClient) {
    await streamClient.disconnectUser();
    streamClient = null;
    chatClient.set(null);
    isConnected.set(false);
  }
}
```

### Step 2: Initialize on Login

```typescript
// After successful login, in your +layout.svelte or auth handler
import { initializeChatClient } from '$lib/stores/chat';

export async function onMount() {
  if (data.user) {
    await initializeChatClient(data.user);
  }
}
```

### Step 3: Create/Join Channel for an Order

```typescript
// When viewing an order or starting a conversation
async function openOrderChat(orderId: string) {
  try {
    // Create channel on backend
    const response = await fetch('/api/stream/channels/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    });

    const { channelId } = await response.json();

    // Join channel with Stream client
    const channel = streamClient.channel('messaging', channelId);
    await channel.watch();

    return channel;
  } catch (error) {
    console.error('Failed to open chat:', error);
  }
}
```

### Step 4: Display Messages (Svelte Component)

```svelte
<!-- src/routes/orders/[orderId]/chat/+page.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { chatClient } from '$lib/stores/chat';
  import type { Channel } from 'stream-chat';

  export let data;
  let channel: Channel | null = null;
  let messages = $state([]);
  let newMessage = $state('');

  onMount(async () => {
    if (!$chatClient) return;

    // Create/join channel
    const response = await fetch('/api/stream/channels/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: data.orderId })
    });

    const { channelId } = await response.json();
    channel = $chatClient.channel('messaging', channelId);
    await channel.watch();

    // Load existing messages
    messages = channel.state.messages;

    // Listen for new messages
    channel.on('message.new', (event) => {
      messages = [...messages, event.message];
    });
  });

  async function sendMessage() {
    if (!channel || !newMessage.trim()) return;

    await channel.sendMessage({
      text: newMessage
    });

    newMessage = '';
  }

  onDestroy(() => {
    if (channel) {
      channel.stopWatching();
    }
  });
</script>

<div class="chat-container">
  <!-- Messages List -->
  <div class="messages">
    {#each messages as message}
      <div class="message" class:own={message.user.id === $chatClient?.userID}>
        <span class="author">{message.user.name}</span>
        <p>{message.text}</p>
        <span class="time">{new Date(message.created_at).toLocaleTimeString()}</span>
      </div>
    {/each}
  </div>

  <!-- Message Input -->
  <form onsubmit={sendMessage}>
    <input
      type="text"
      bind:value={newMessage}
      placeholder="Type a message..."
    />
    <button type="submit">Send</button>
  </form>
</div>
```

### Step 5: List All Conversations (Inbox Page)

```svelte
<!-- src/routes/messages/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let channels = $state([]);

  onMount(async () => {
    const response = await fetch('/api/stream/channels/list?limit=20');
    const data = await response.json();
    channels = data.channels;
  });
</script>

<div class="inbox">
  <h1>Messages</h1>
  
  {#each channels as channel}
    <a href="/orders/{channel.data.order_id}/chat" class="channel-item">
      <div class="channel-info">
        <h3>{channel.data.name || `Order #${channel.data.order_id}`}</h3>
        <p class="last-message">
          {channel.state.messages[channel.state.messages.length - 1]?.text}
        </p>
      </div>
      
      {#if channel.state.unreadCount > 0}
        <span class="unread-badge">{channel.state.unreadCount}</span>
      {/if}
    </a>
  {/each}
</div>
```

## 📊 System Notifications

System notifications (order status changes, etc.) are sent automatically by the backend. They appear as regular messages with `type: 'system'`.

You can style them differently:

```svelte
{#each messages as message}
  <div class="message" class:system={message.type === 'system'}>
    {#if message.type === 'system'}
      <div class="system-notification">
        {message.text}
      </div>
    {:else}
      <span class="author">{message.user.name}</span>
      <p>{message.text}</p>
    {/if}
  </div>
{/each}
```

## 🎯 Complete User Flow

1. **User logs in** → `initializeChatClient()` is called automatically
2. **User views order** → Channel is created/joined via `/api/stream/channels/create`
3. **User sends message** → `channel.sendMessage({ text: '...' })`
4. **Messages update** → Real-time via `channel.on('message.new', ...)`
5. **Order status changes** → Backend sends system notification automatically
6. **User logs out** → `disconnectChat()` is called

## 📋 Available API Endpoints

### POST `/api/stream/token`
Get Stream authentication token for current user.

### POST `/api/stream/channels/create`
Create/get conversation channel for an order.
```json
{ "orderId": "order_abc123" }
```

### GET `/api/stream/channels/list?limit=20`
List all channels for current user.

### GET `/api/stream/channels/messages?channelId=order-abc123&limit=50`
Get messages from a channel (prefer client-side SDK instead).

### POST `/api/stream/channels/notify`
Send system notification (admin only, rarely used in frontend).

## 🎨 UI Component Libraries

For faster development, consider using Stream's pre-built UI components:

```bash
npm install stream-chat-svelte
```

See: https://getstream.io/chat/docs/sdk/svelte/

## 🔧 Troubleshooting

**Issue: "Token expired" error**
- Solution: The token endpoint automatically generates new tokens. Re-call `/api/stream/token`.

**Issue: Cannot send messages**
- Check: User is connected (`isConnected` store is true)
- Check: Channel is watched (`await channel.watch()`)
- Check: User is member of the channel

**Issue: Not receiving real-time updates**
- Check: Channel event listener is set up (`channel.on('message.new', ...)`)
- Check: Component is not unmounted before messages arrive

## 📚 Resources

- [Stream Chat Docs](https://getstream.io/chat/docs/)
- [Stream Chat Svelte SDK](https://getstream.io/chat/docs/sdk/svelte/)
- [Backend API Documentation](See inline comments in `/src/routes/api/stream/`)

## 🎯 Minimal Working Example

```svelte
<script lang="ts">
  import { StreamChat } from 'stream-chat';
  import { onMount } from 'svelte';

  let messages = $state([]);
  let newMessage = $state('');
  let channel;

  onMount(async () => {
    // 1. Get token
    const tokenRes = await fetch('/api/stream/token', { method: 'POST' });
    const { userId, token } = await tokenRes.json();

    // 2. Connect to Stream
    const client = StreamChat.getInstance('YOUR_API_KEY');
    await client.connectUser({ id: userId }, token);

    // 3. Create/join channel
    const channelRes = await fetch('/api/stream/channels/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: 'order_123' })
    });
    const { channelId } = await channelRes.json();

    channel = client.channel('messaging', channelId);
    await channel.watch();

    // 4. Load messages
    messages = channel.state.messages;

    // 5. Listen for new messages
    channel.on('message.new', (event) => {
      messages = [...messages, event.message];
    });
  });

  async function send() {
    await channel.sendMessage({ text: newMessage });
    newMessage = '';
  }
</script>

<!-- Simple UI -->
<div>
  {#each messages as msg}
    <p><strong>{msg.user.name}:</strong> {msg.text}</p>
  {/each}
  
  <input bind:value={newMessage} />
  <button onclick={send}>Send</button>
</div>
```

---

**That's it!** You now have everything needed to implement real-time messaging in your GoWork application. 🚀
