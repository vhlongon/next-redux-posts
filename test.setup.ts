import '@testing-library/jest-dom/vitest';

import { server } from './test/mocks/node';

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
