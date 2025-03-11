import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  userId: z.number(),
});

export type Post = z.infer<typeof PostSchema>;

export const PostsSchema = z.array(PostSchema);

export type Posts = z.infer<typeof PostsSchema>;

export const validatePost = (post: Post) => PostSchema.parse(post);

export const validatePosts = (posts: Posts) => PostsSchema.parse(posts);

export const AuthorSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
});

export type Author = z.infer<typeof AuthorSchema>;

export const validateAuthor = (author: Author) => AuthorSchema.parse(author);
