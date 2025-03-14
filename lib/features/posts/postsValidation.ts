import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()).optional(),
  userId: z.number(),
  isNew: z.boolean().optional()
});

export const AuthorSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string()
});

export const PostWithAuthorSchema = PostSchema.extend({
  author: AuthorSchema
});

export const PostsWithAuthorSchema = z.object({
  posts: z.array(PostWithAuthorSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number()
});

const PostsSchema = z.object({
  posts: z.array(PostSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number()
});

export const validatePost = (data: unknown) => PostSchema.parse(data);
export const validatePosts = (data: unknown) => PostsSchema.parse(data);
export const validatePostWithAuthor = (data: unknown) => PostWithAuthorSchema.parse(data);
export const validateAuthor = (data: unknown) => AuthorSchema.parse(data);
