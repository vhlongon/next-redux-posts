import { AuthorSchema, PostSchema, PostsSchema } from './postsValidation';
import { z } from 'zod';

export type Post = z.infer<typeof PostSchema>;
export type PostsResponse = z.infer<typeof PostsSchema>;
export type Author = z.infer<typeof AuthorSchema>;
