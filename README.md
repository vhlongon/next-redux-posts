## 🛠️ Setup & Development

1. **Install Dependencies**

```bash
pnpm install
```

2. **Development Server**

```bash
pnpm dev
```

3. **Production Build**

```bash
pnpm build
pnpm start
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

- **End-to-End Tests**

```bash
pnpm test:e2e
```

- **Type Checking**

```bash
pnpm typecheck
```

## 🔍 Key Features

- Custom server implementation with WebSocket support
- Redux integration for state management
- Type-safe development with TypeScript
- Real-time updates
- Styled-components for dynamic styling
- Comprehensive testing suite

## 🧰 Development Tools

- TypeScript for static type checking
- Vitest for unit testing
- Playwright for E2E testing
- MSW for API mocking
- Testing Library for component testing
- Custom TypeScript configurations for different environments

## 📝 Notes

- The project uses a custom server setup with `server.ts` for WebSocket integration
- Includes separate TypeScript configurations for development and quality checks
- Comprehensive testing setup with both unit and E2E tests

## 🔒 Security

- Private package (not published to npm)
- Environment-specific configurations
- Type-safe API calls with Zod validation

## 📦 Dependencies

All dependencies are managed through pnpm for faster, more efficient package management. Key dependencies are kept up to date with the latest stable versions.
