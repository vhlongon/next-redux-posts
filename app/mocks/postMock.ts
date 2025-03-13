import type { PostWithAuthor } from '@/lib/features/posts/postTypes';

export const postMock: PostWithAuthor = {
  id: 1,
  title: 'Test Post',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  author: {
    firstName: 'John',
    lastName: 'Doe',
    id: 1,
  },
  userId: 1,
  tags: ['test', 'mock'],
};

export const createPostMock = (
  post?: Partial<PostWithAuthor>
): PostWithAuthor => {
  const { author: defaultAuthor, ...defaultPostProps } = postMock;
  const { author, ...postProps } = post ?? {};
  return {
    ...defaultPostProps,
    author: {
      ...defaultAuthor,
      ...author,
    },
    ...postProps,
  };
};
