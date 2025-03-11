import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from './postsValidation';

export type PostsState = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
  currentPost: Post | null;
};

const initialState: PostsState = {
  posts: [],
  total: 0,
  skip: 0,
  limit: 20,
  currentPost: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (
      state,
      action: PayloadAction<Omit<PostsState, 'currentPost'>>
    ) => {
      return {
        ...state,
        posts: action.payload.posts,
        total: action.payload.total,
        skip: action.payload.skip,
        limit: action.payload.limit,
      };
    },
    setCurrentPost: (state, action: PayloadAction<Post>) => {
      return {
        ...state,
        currentPost: action.payload,
      };
    },
  },
});

export const { setPosts, setCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
