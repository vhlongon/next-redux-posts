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
- [Knip](https://knip.dev/) for detecting unused files, exports, and dependencies

## 📝 Notes

- The project uses a custom server setup with `server.ts` for WebSocket integration
- Includes separate TypeScript configurations for development and quality checks
- Comprehensive testing setup with both unit and E2E tests

## 📦 Dependencies

All dependencies are managed through [pnpm](https://pnpm.io/) for faster, more efficient package management.

## Architecture and Design Decisions

### Overview

This project implements a posts listing application with a focus on clean architecture, type safety, and testability. Here's a breakdown of the key architectural decisions and flow:

### Application Flow

1. **Data Flow**

   - The application fetches posts data from an external API
   - Data is validated and typed using TypeScript and Zod for complete type safety
   - Server-side rendering is utilized for better performance and SEO

2. **Component Structure**

   - Pages are built using Next.js App Router
   - Components are organized by feature/domain
   - Shared components are placed in a common directory for reusability

3. **Testing Strategy**
   - Unit tests for individual components
   - Integration tests for page-level functionality
   - Mocked data for consistent test scenarios
   - React Testing Library for behavior-driven tests
   - Playwright for end-to-end testing across multiple browsers
   - End-to-end test coverage for critical user flows

### How it Works

1. **Initial Page Load**

   - When a user visits the posts page, Next.js triggers server-side rendering
   - Server component fetches the initial posts data
   - The page is rendered with the fetched data and sent to the client
   - On the client side that initial data is feed into redux for easier state management

2. **On post specific page**

   - Post data is either fetched from the data encoded in the url or fetched server side via the id
   - The post card is populated with the data
   - if no data can't be provided via the url or the call to the external api a friendly message is shown

3. **Data Fetching**

   - Posts are fetched from the external API using typed fetch requests
   - Response data is validated against TypeScript types
   - Error boundaries handle potential API failures
   - Loading states are managed during data fetching

4. **Pagination Flow**

   - Initially 20 posts are show per default, but url parameters can be provided to customize how the fetching works
   - New data is fetched based on updated parameters
   - Page re-renders with new data while maintaining scroll position
   - When scrolling to the bottom of the page more posts are automatically fetched
   - if now more posts are available according to the total returned from the api, no more requests are made
     - Redux toolkit query (RTK) provides a infinity query functionality that is used here
     - [useGetInfinitePostsInfiniteQuery](lib/features/posts/postsApiSlice.ts) in used inside the hook `[useLoadInfinitePosts](lib/hooks/useLoadInfinitePosts.ts), which uses intersection observer to trigger the function to fetch another page and thus perform pagination correctly
     - the returned data from the pages is flatten, so the consumer gets a list of posts that keeps incrementing while we fetch more items on scroll

5. **Error Handling**
   - API errors are caught and displayed user-friendly messages
   - Type validation ensures data consistency
   - Loading states prevent UI issues during data fetches
   - Fallback UI for edge cases
