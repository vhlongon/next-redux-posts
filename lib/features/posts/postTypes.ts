import { z } from 'zod';
import {
  AuthorSchema,
  PostSchema,
  PostsSchema,
  PostsWithAuthorSchema,
  PostWithAuthorSchema,
} from './postsValidation';

export type Post = z.infer<typeof PostSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type PostWithAuthor = z.infer<typeof PostWithAuthorSchema>;
export type PostsResponse = z.infer<typeof PostsSchema>;
export type PostsWithAuthorResponse = z.infer<typeof PostsWithAuthorSchema>;
