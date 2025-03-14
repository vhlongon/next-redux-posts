import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { postsApiSlice } from './features/posts/postsApiSlice';

const rootReducer = combineSlices({
  [postsApiSlice.reducerPath]: postsApiSlice.reducer
});

/**
 * @public
 */
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApiSlice.middleware),
    devTools: true
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Also available:
// export type AppDispatch = AppStore['dispatch'];
