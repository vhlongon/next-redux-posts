import { combineSlices, configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postsSlice';

const rootReducer = combineSlices({
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
