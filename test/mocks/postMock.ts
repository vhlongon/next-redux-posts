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

export const mockedPosts = [
  createPostMock({
    id: 1,
    title: 'Getting Started with TypeScript',
    body: 'TypeScript adds static typing to JavaScript, making it easier to write and maintain large applications. In this post, we will explore the basic concepts of TypeScript, including types, interfaces, and generics. Learn how to set up your development environment and start writing type-safe code today.',
  }),
  createPostMock({
    id: 2,
    title: 'Best Practices for React Components',
    body: 'Writing clean and maintainable React components is crucial for any modern web application. This guide covers essential practices like component composition, proper state management, and performance optimization techniques. We will also discuss when to use hooks versus class components and how to avoid common pitfalls.',
  }),
  createPostMock({
    id: 3,
    title: 'Understanding Modern Web Testing',
    body: 'Testing is a fundamental part of software development. This comprehensive guide covers different testing approaches including unit tests, integration tests, and end-to-end testing. We will learn how to use popular testing libraries like Jest and React Testing Library to build more reliable applications.',
  }),
  createPostMock({
    id: 4,
    title: 'State Management in 2025',
    body: 'The landscape of state management in React has evolved significantly. From Redux to Context API to newer solutions like Jotai and Zustand, this post examines the pros and cons of different state management approaches. We will learn which solution might be best for your specific use case.',
  }),
  createPostMock({
    id: 5,
    title: 'Building Accessible Web Applications',
    body: 'Accessibility is not just a nice-to-have feature—it is essential. This post explores practical ways to make your web applications more accessible, including proper HTML semantics, ARIA labels, keyboard navigation, and color contrast considerations. We will learn how to test for accessibility and fix common issues.',
  }),
];
