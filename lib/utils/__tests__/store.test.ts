import { makeStore } from '@/lib/store';

describe('store', () => {
  test('should create a store with the correct initial state and methods', () => {
    const store = makeStore();
    const state = store.getState();
    expect(state).toEqual({
      postsApi: {
        config: {
          focused: true,
          invalidationBehavior: 'delayed',
          keepUnusedDataFor: 60,
          middlewareRegistered: false,
          online: true,
          reducerPath: 'postsApi',
          refetchOnFocus: false,
          refetchOnMountOrArgChange: false,
          refetchOnReconnect: false,
        },
        mutations: {},
        provided: {},
        queries: {},
        subscriptions: {},
      },
    });

    expect(store.dispatch).toBeInstanceOf(Function);
    expect(store.subscribe).toBeInstanceOf(Function);
    expect(store.replaceReducer).toBeInstanceOf(Function);
  });
});
