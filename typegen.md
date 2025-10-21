### Generating Types with URL, Email, and Password (Quickstart)

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This command quickly generates TypeScript definitions for all PocketBase collections by connecting to a hosted instance using a URL, admin email, and password. It's suitable for initial setup and development environments.

```Shell
npx pocketbase-typegen --url https://myproject.pockethost.io --email admin@myproject.com --password 'secr3tp@ssword!'
```

--------------------------------

### Handling JSON Fields and Expanded Relations with Generics in TypeScript

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This advanced example demonstrates how to provide specific types for JSON fields and expanded relations using generic arguments with `CommentsResponse`. It defines `Metadata` for a JSON field and `Expand` for the 'user' relation, allowing type-safe access to nested data like `result.expand.user.username` after fetching a comment record with an expanded user.

```TypeScript
import { Collections, CommentsResponse, UserResponse } from "./pocketbase-types"

/**
  type CommentsRecord<Tmetadata = unknown> = {
    text: string
    metadata: null | Tmetadata // This is a json field
    user: RecordIdString // This is a relation field
  }
*/
type Metadata = {
  likes: number
}
type Expand = {
  user: UsersResponse
}
const result = await pb
  .collection(Collections.Comments)
  .getOne<CommentsResponse<Metadata, Expand>>("RECORD_ID", { expand: "user" })

// Now you can access the expanded relation with type safety and hints in your IDE
result.expand.user.username
```

--------------------------------

### Generating Types using Environment Variables (Default Path)

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This command instructs `pocketbase-typegen` to read configuration (URL, email, password, token) from environment variables, typically from a `.env` file in the current directory. It simplifies command-line usage by externalizing sensitive credentials.

```Shell
npx pocketbase-typegen --env
```

--------------------------------

### Initializing Typed PocketBase Client in TypeScript

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This snippet demonstrates initializing the PocketBase client with the `TypedPocketBase` type, enabling automatic type inference for collection methods. It shows how to fetch a single record from 'tasks' and 'posts' collections, with results automatically typed as `TaskResponse` and `PostResponse` respectively.

```TypeScript
import { TypedPocketBase } from "./pocketbase-types"

const pb = new PocketBase("http://127.0.0.1:8090") as TypedPocketBase

await pb.collection("tasks").getOne("RECORD_ID") // -> results in TaskResponse
await pb.collection("posts").getOne("RECORD_ID") // -> results in PostResponse
```

--------------------------------

### Generating Types using Environment Variables (Custom Path)

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This command allows `pocketbase-typegen` to load configuration from environment variables found in a `.env` file located within a specified directory. This is useful for projects with non-standard `.env` file locations or monorepos.

```Shell
npx pocketbase-typegen --env path/to/dir
```

--------------------------------

### Environment Variable Configuration for Type Generation

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

These are the environment variables that `pocketbase-typegen` recognizes for configuration. They can be placed in a `.env` file and used with the `--env` option, providing a secure way to manage connection details without hardcoding them in scripts.

```Shell
PB_TYPEGEN_URL=https://myproject.pockethost.io
PB_TYPEGEN_EMAIL=admin@myproject.com
PB_TYPEGEN_PASSWORD=secr3tp@ssword!
PB_TYPEGEN_TOKEN=eyJhbGciOiJI...ozhyQVfYm24
```

--------------------------------

### Integrating Type Generation into package.json Scripts

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This JSON snippet demonstrates how to add a `typegen` script to your `package.json` file. This allows developers to easily run the type generation command using `npm run typegen` or `yarn typegen`, streamlining the development workflow and ensuring consistent type updates.

```JSON
"scripts": {
  "typegen": "pocketbase-typegen --env"
}
```

--------------------------------

### Generating Types with URL and Auth Token

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This command generates TypeScript definitions by connecting to a hosted PocketBase instance using a URL and an authentication token. This method is suitable for automated scripts or environments where direct email/password credentials are not preferred, requiring a pre-generated superuser token.

```Shell
npx pocketbase-typegen --url https://myproject.pockethost.io --token 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
```

--------------------------------

### Generating Types from Local SQLite Database

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This command generates TypeScript types directly from a local PocketBase SQLite database file. It's useful for local development or CI/CD pipelines where direct database access is available. The `--out` option specifies the output file path, otherwise it defaults to `pocketbase-types.ts`.

```Shell
npx pocketbase-typegen --db ./pb_data/data.db --out pocketbase-types.ts
```

--------------------------------

### Generating Types from Exported JSON Schema

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This command generates TypeScript types from a PocketBase schema exported as a JSON file. This method is useful for offline type generation or when working with schema definitions without direct access to a running PocketBase instance or its database.

```Shell
npx pocketbase-typegen --json ./pb_schema.json
```

--------------------------------

### Using Generic Types for Single Record Fetch in TypeScript

Source: https://github.com/patmood/pocketbase-typegen/blob/main/README.md

This snippet illustrates an alternative approach to fetching a single record by explicitly providing a generic type argument (`TasksResponse`) to the `getOne` method. It uses the `Collections` enum for type-safe collection name access, ensuring the fetched record is correctly typed.

```TypeScript
import { Collections, TasksResponse } from "./pocketbase-types"

await pb.collection(Collections.Tasks).getOne<TasksResponse>("RECORD_ID") // -> results in TaskResponse
```