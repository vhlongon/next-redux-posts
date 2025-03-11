import {
  validateAuthor,
  validatePost,
  validatePosts,
} from '../features/posts/postsValidation';

const baseUrl = 'https://dummyjson.com';

export async function fetchAuthor(id: number) {
  const response = await fetch(`${baseUrl}/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch author');
  const data = await response.json();
  return validateAuthor(data);
}

export async function fetchPosts(limit = 10, skip = 0) {
  const url = new URL(`${baseUrl}/posts`);
  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('skip', skip.toString());
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  const posts = validatePosts(data.posts);

  const postsWithAuthor = await Promise.all(
    posts.map(async post => {
      const author = await fetchAuthor(post.userId);

      return { ...post, author };
    })
  );

  return postsWithAuthor;
}

export async function fetchPost(id: string) {
  const response = await fetch(`${baseUrl}/posts/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();

  if (!data) {
    return null;
  }

  const post = validatePost(data);
  const author = await fetchAuthor(post.userId);
  return { ...post, author };
}
