import { validateAuthor, validatePost, validatePosts } from '../features/posts/postsValidation';

const baseUrl = 'https://dummyjson.com';

export async function fetchAuthor(id: number) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    cache: 'force-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch author');
  }
  const data = await response.json();
  return validateAuthor(data);
}

export async function fetchPosts(limit = 20, skip = 0) {
  const url = new URL(`${baseUrl}/posts`);
  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('skip', skip.toString());
  const response = await fetch(url, {
    cache: 'force-cache'
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  if (!data) {
    return { posts: [], total: 0, limit, skip };
  }
  const { posts, total } = validatePosts(data);

  const postsWithAuthor = await Promise.all(
    posts.map(async (post) => {
      const author = await fetchAuthor(post.userId);

      return { ...post, author };
    })
  );

  return { posts: postsWithAuthor, total, limit, skip };
}

export async function fetchPost(id: string) {
  const response = await fetch(`${baseUrl}/posts/${id}`, {
    cache: 'force-cache'
  });
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error(response.statusText);
  }
  const data = await response.json();

  if (!data) {
    return null;
  }

  const post = validatePost(data);
  const author = await fetchAuthor(post.userId);
  return { ...post, author };
}
