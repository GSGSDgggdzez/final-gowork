### Install Stream Chat JavaScript SDK

Source: https://github.com/getstream/stream-chat-js/blob/master/README.md

Instructions for installing the Stream Chat JavaScript SDK using NPM or Yarn package managers.

```bash
npm install stream-chat
```

```bash
yarn add stream-chat
```

--------------------------------

### Install Dependencies

Source: https://github.com/getstream/stream-chat-js/blob/master/CONTRIBUTING.md

Installs project dependencies using Yarn, ensuring a frozen lockfile and ignoring engine constraints.

```shell
$ yarn install --frozen-lockfile --ignore-engines
```

--------------------------------

### Development Setup: Linking Stream Chat JS with React Native SDK

Source: https://github.com/getstream/stream-chat-js/blob/master/README.md

Guides on how to link the local stream-chat-js project with a React Native application for development purposes, including Metro bundler configuration.

```javascript
const streamChatRoot = '<PATH TO YOUR PROJECT>/stream-chat-js'

module.exports = {
  // the rest of the metro configuration goes here
  ...
  watchFolders: [projectRoot].concat(alternateRoots).concat([streamChatRoot]),
  resolver: {
    // the other resolver configurations go here
    ...
    extraNodeModules: {
      // the other extra node modules go here
      ...
      'stream-chat': streamChatRoot
    }
  }
};
```

--------------------------------

### Retryable Token Provider Example

Source: https://github.com/getstream/stream-chat-js/blob/master/docs/userToken.md

Provides an example of a retryable token provider function using the 'async-retry' library. This ensures that token fetching is robust against temporary network failures.

```javascript
const retry = require('async-retry');

const fetchTokenFromApi = async () => {
  const response = await fetch('https://my-api.com/token');
  const data = await response.json();
  return data.token;
};

const retryableTokenProvider = () => retry(fetchTokenFromApi, { minTimeout: 1000 });

client.connectUser({ id: 'vishal' }, retryableTokenProvider);
```

--------------------------------

### User Token Generation

Source: https://github.com/getstream/stream-chat-js/blob/master/docs/fileUpload.md

Example of generating a user token using API key and secret for authentication with the Stream client.

```js
const apiKey = 'swde2zgm3549';
const apiSecret = 'YOUR_SUPER_SECRET_TOKEN';
const userId = 'dawn-union-6';
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGF3bi11bmlvbi02In0.mpf8pgxn5r02EqsChMaw6SdCFCyBBl7VJhyleTqEwho';
```

--------------------------------

### Logger Extra Data Examples

Source: https://github.com/getstream/stream-chat-js/blob/master/docs/logging.md

Illustrates the structure of the 'extraData' object passed to the logger function, which includes tags and relevant payload or response information for different logging scenarios.

```js
{
  "tags": ["api", "api_request", "client"],
  "url": "https://chat.stream-io-api.com/channels",
  "payload": { /** payload */ },
  "config": { /** conig object */ }
}
```

```js
{
  "tags": ["api", "api_response", "client"],
  "url": "https://chat.stream-io-api.com/channels",
  "response": { /** object */ }
}
```

```js
{
  "tags": ["api", "api_response", "client"],
  "url": "https://chat.stream-io-api.com/channels",
  "error": { /** error object */ }
}
```

```js
{
  "tags": ["event", "client"],
  "event": { /** event object */ }
}
```

```js
{
  "tags": ["channel"],
  "channel": { /** channel object */ }
}
```

--------------------------------

### Browser File Upload

Source: https://github.com/getstream/stream-chat-js/blob/master/docs/fileUpload.md

Provides an HTML and JavaScript example for uploading files in a browser environment using the Stream JS client. It includes connecting the user and handling file input changes.

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <input id="input" type="file" />
    <a id="link" href=""></a>

    <script src="https://cdn.jsdelivr.net/npm/stream-chat"></script>

    <script>
      const apiKey = 'swde2zgm3549'; // use your app key
      const userId = 'dawn-union-6';
      const userToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGF3bi11bmlvbi02In0.mpf8pgxn5r02EqsChMaw6SdCFCyBBl7VJhyleTqEwho';

      const chatClient = StreamChat.getInstance(apiKey);
      chatClient.connectUser({ id: userId }, userToken);
      const channel = chatClient.channel('messaging', userId, { members: [userId] });
      channel.create();

      const handleFiles = (e) => {
        channel.sendFile(e.target.files[0]).then((file) => {
          const link = document.getElementById('link');
          link.setAttribute('href', file.file);
          link.text = file.file;
        });
      };

      document.getElementById('input').addEventListener('change', handleFiles, false);
    </script>
  </body>
</html>
```

--------------------------------

### Query Messages Mentioning a User

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Shows how to search for messages where a specific user is mentioned. It includes examples for searching across all channels and within channels where the user is a member. The search functionality allows filtering by mentioned users and pagination.

```javascript
// Search in all channels
const res = await chatClient?.search(
  {
      type: 'messaging'
  },
  {
    'mentioned_users.id': {
      $contains: 'vishal' || '',
  },
  {
      limit: 20,
      offset: 0,
  },
);

console.log(res.results); // array of messages

// Search in all channels, where user is member
const res = await chatClient?.search(
  {
      members: {
        $in: ['vishal' || null],
      },
  },
  {
    'mentioned_users.id': {
      $contains: 'vishal' || '',
  },
  {
      limit: 20,
      offset: 0,
  },
);

console.log(res.results); // array of messages
```

--------------------------------

### Get and Update Total Unread Count

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Explains how to retrieve the total unread message count for a user upon connection and how to listen for real-time updates to this count using client event listeners. The `total_unread_count` and `unread_channels` properties provide this information.

```javascript
const user = await client.connectUser({ id: 'myid' }, token);
// response.me.total_unread_count is the total unread count
// response.me.unread_channels is the count of channels with unread messages


client.on((event) => {
  if (event.total_unread_count !== undefined) {
      console.log(event.total_unread_count);
  }
  if (event.unread_channels !== undefined) {
      console.log(event.unread_channels);
  }
});
```

--------------------------------

### Initialize StreamChat Client and Basic Operations

Source: https://github.com/getstream/stream-chat-js/blob/master/README.md

Demonstrates how to initialize the StreamChat client with an API key and secret, create a user, create a channel, send a message, and send a reaction.

```typescript
import { StreamChat } from 'stream-chat';
// or if you are using CommonJS
const { StreamChat } = require('stream-chat');

const client = new StreamChat('API_KEY', 'API_SECRET', {
  disableCache: true, // recommended option for server-side use
  // ...other options like `baseURL`...
});

// create a user
await client.upsertUser({
  id: 'vishal-1',
  name: 'Vishal',
});

// create a channel
const channel = client.channel('messaging', 'test-channel', {
  created_by_id: 'vishal-1',
});
await channel.create();

// send message
const { message } = await channel.sendMessage({ text: 'This is a test message' });

// send reaction
await channel.sendReaction(message.id, { type: 'love', user: { id: 'vishal-1' } });
```

--------------------------------

### Client Instantiation: Singleton vs. New Instance

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Differentiates between creating a new `StreamChat` instance using `new StreamChat('api_key')` and obtaining a singleton instance via `StreamChat.getInstance('api_key')`. Using the singleton instance is recommended to prevent multiple WebSocket connections and potential billing issues.

```javascript
`new StreamChat('api_key')` always returns a new instance of chat client, while `StreamChat.getInstance('api_key')` gives you a singleton instance of the client. We HIGHLY RECOMMEND you to use singleton instance to avoid creating multiple instances websocket connections, which in turn increases your monthly active users, and that affects your billing amount. Especially with react hooks, its quite easy to fall into these issues

Please check our [best practices guide](https://getstream.io/chat/docs/javascript/instantiating_the_client/?language=js) for details.
```

--------------------------------

### User Connection and Deprecation

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Explains the difference between `client.connectUser` and the deprecated `client.setUser`. `connectUser` is the recommended method for establishing a user connection.

```javascript
`client.setUser` is a deprecated version of `client.connectUser` or setUser is precursor of connectUser. This change was introduced in [2.10.0](https://github.com/GetStream/stream-chat-js/blob/master/CHANGELOG.md#december-21-2020---2100) since connectUser better defines the job of this function.

`client.setUser` has been deprecated, so please use `client.connectUser` instead.
```

--------------------------------

### Run Tests

Source: https://github.com/getstream/stream-chat-js/blob/master/CONTRIBUTING.md

Executes different types of tests for the project: type checking and unit tests.

```shell
$ yarn test-types
$ yarn run test-unit
```

--------------------------------

### Cheatsheet

Source: https://github.com/getstream/stream-chat-js/wiki/Home

Provides a quick reference for common Stream Chat JS SDK operations and functionalities.

```javascript
See Cheatsheet: https://github.com/GetStream/stream-chat-js/wiki/Cheatsheet
```

--------------------------------

### Node.js File Upload

Source: https://github.com/getstream/stream-chat-js/blob/master/docs/fileUpload.md

Demonstrates uploading a file in a Node.js environment using the Stream JS client. It includes creating a client instance, channel, and sending a file.

```js
const fs = require('fs');
const { StreamChat } = require('stream-chat');

const user = { id: 'user_id' };
const apiKey = 'swde2zgm3549'; // use your app key
const apiSecret = 'YOUR_SUPER_SECRET_TOKEN'; // use your app secret
const client = StreamChat.getInstance(apiKey, apiSecret);

const channel = client.channel('messaging', 'channel_id', { created_by: user });
await channel.create(); // if channel does not exist yet

const file = fs.createReadStream('./helloworld.txt');
const response = await channel.sendFile(file, 'helloworld.txt', 'text/plain', user);
console.log('file url: ', response.file);
```

--------------------------------

### Connect Events Explained

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Defines 'connect events' in the context of Stream Chat, which relate to user actions like watching a channel (`user.watching.start`, `user.watching.stop`) and changes in user presence status (`user.presence.changed`).

```javascript
Connect events are related to
- user watching a channel
  - `user.watching.start`
  - `user.watching.stop`
- changes to user's online status
  - `user.presence.changed`
```

--------------------------------

### Query Pending Channel Invites

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Shows how to query for channels where the current user has been invited but has not yet accepted. This is done using the `invite:pending` filter in `queryChannels`.

```javascript
await chatClient.queryChannels({
  invite:pending
})
```

--------------------------------

### Extend Stream Chat Entities with Custom Data

Source: https://github.com/getstream/stream-chat-js/blob/master/README.md

Shows how to extend Stream Chat's default message and user types with custom properties using TypeScript module augmentation for better code completion and type safety.

```typescript
// stream-custom-data.d.ts

import 'stream-chat';

declare module 'stream-chat' {
  interface CustomMessageData {
    custom_property?: number;
  }
  interface CustomUserData {
    profile_picture?: string;
  }
}

// index.ts

// property `profile_picture` is code-completed and expects type `string | undefined`
await client.partialUpdateUser({
  id: 'vishal-1',
  set: { profile_picture: 'https://random.picture/1.jpg' },
});

// property `custom_property` is code-completed and expects type `number | undefined`
const { message } = await channel.sendMessage({
  text: 'This is another test message',
  custom_property: 255,
});

message.custom_property; // in the response object as well
```

--------------------------------

### Connect User with Static Token

Source: https://github.com/getstream/stream-chat-js/blob/master/docs/userToken.md

Connects a user to Stream Chat using a pre-generated static user token. This is suitable for testing or scenarios where token expiration is not a primary concern.

```javascript
const client = StreamChat.getInstance('api_key');
client.connectUser({ id: 'vishal' }, 'user_token_string');
```

--------------------------------

### Server-Side Client Logger Configuration

Source: https://github.com/getstream/stream-chat-js/blob/master/docs/logging.md

Configures the logger for a server-side client instance. Similar to the non-server client, this allows custom logging behavior for server environments.

```js
const client = StreamChat.getInstance(
  'api_key',
  'secret',
  {
    logger: (logLevel, message, extraData) => {
      console.log(message);
    }
  }
)
```

--------------------------------

### Check Channel Existence

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Queries for channels with specific members to determine if a distinct channel already exists between them. It takes an array of member IDs and returns the channel if found.

```javascript
const channels = await chatClient.queryChannels({
    distinct: true,
    members: ['vishal', 'neil'],
});
if (channels.length === 1) {
    // Channel already exist
} else {
    // Channel doesn't exist.
}
```

--------------------------------

### Check if Channel is Being Watched

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Provides a simple way to check if a channel is currently being watched by the user through the `initialized` property.

```javascript
const isActive = channel.initialized;
```

--------------------------------

### Connect User with Token Provider

Source: https://github.com/getstream/stream-chat-js/blob/master/docs/userToken.md

Connects a user to Stream Chat using a token provider function. This function is called when the token expires, allowing for automatic reconnection with a new token. It's recommended to make the token provider retryable to handle network issues gracefully.

```javascript
const client = StreamChat.getInstance('api_key');
client.connectUser({ id: 'vishal' }, async () => await fetchTokenFromApi());
```

--------------------------------

### Server-Side Message Moderation

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Illustrates how to send a message from the server-side with moderation enabled. By setting `force_moderation: true` in the message options, the message will be subject to moderation workflows.

```javascript
 const { message } = await channel.sendMessage({
	text,
	attachments,
	user_id: sentBy,
  }, {
	force_moderation: true
}); 
```

--------------------------------

### Non-Server Client Logger Configuration

Source: https://github.com/getstream/stream-chat-js/blob/master/docs/logging.md

Configures the logger for a non-server client instance. The logger function receives log level, message, and extra data, and can be used to send logs to any desired logging tool.

```js
const client = StreamChat.getInstance('api_key', {
  logger: (logLevel, message, extraData) => {
    console.log(message); // or any logging tool that you are using e.g. reactotron
  },
});
```

--------------------------------

### Increase API Call Timeout

Source: https://github.com/getstream/stream-chat-js/wiki/Cheatsheet

Demonstrates how to increase the default timeout for API calls when initializing the StreamChat client. The default timeout is 3000 milliseconds.

```javascript
const client = StreamChat.getInstance('apiKey', { timeout: 10000 }); // default is 3000 ms
```