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

- **Quality Checks**

```bash
# Run all quality checks (types, tests, unused code detection)
pnpm quality

# Check for unused exports and dependencies
pnpm knip

# Run Biome checks
pnpm lint

# Fix Biome issues
pnpm lint:fix
```

## 🔍 Key Features

- Custom server implementation with WebSocket support
- [Redux](https://redux.js.org/) integration for state management
- Type-safe development with [TypeScript](https://www.typescriptlang.org/)
- Real-time updates
- [Styled-components](https://styled-components.com/) for dynamic styling
- Comprehensive testing suite

## 🧰 Development Tools

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Vitest](https://vitest.dev/) for unit testing
- [Playwright](https://playwright.dev/) for E2E testing
- [MSW](https://mswjs.io/) for API mocking
- [Testing Library](https://testing-library.com/) for component testing
- [Biome](https://biomejs.dev/) for linting, formatting, and code quality
- Custom TypeScript configurations for different environments
- [Knip](https://knip.dev/) for detecting unused files, exports, and dependencies

## 📝 Notes

- The project uses a custom server setup with `server.ts` for WebSocket integration
- Includes separate TypeScript configurations for development and quality checks
- Comprehensive testing setup with both unit and E2E tests

## 🔒 Security

- Private package (not published to npm)
- Environment-specific configurations
- Type-safe API calls with [Zod](https://zod.dev/) validation

## 📦 Dependencies

All dependencies are managed through [pnpm](https://pnpm.io/) for faster, more efficient package management. Key dependencies are kept up to date with the latest stable versions.
