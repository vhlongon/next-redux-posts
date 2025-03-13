import { server } from '@/test/mocks/node';
import { createPostWithAuthorMock } from '@/test/mocks/postMock';
import { http, HttpResponse } from 'msw';
import { fetchPosts, fetchPost } from '../posts';

describe('postsApi', () => {
  describe('fetchPosts', () => {
    test('should fetch posts when data is valid', async () => {
      const post = createPostWithAuthorMock();
      const mockedPostsResponse = {
        posts: [post],
        total: 1,
        skip: 0,
        limit: 1,
      };
      server.use(
        http.get('https://dummyjson.com/posts', () => {
          return HttpResponse.json(mockedPostsResponse);
        })
      );
      const posts = await fetchPosts(1, 0);
      expect(posts).toEqual({ posts: [post], total: 1, skip: 0, limit: 1 });
    });

    test('should throw an error when data is invalid', async () => {
      server.use(
        http.get('https://dummyjson.com/posts', () => {
          return HttpResponse.json({ posts: [] });
        })
      );
      await expect(fetchPosts(1, 0)).rejects.toThrow();
    });

    test('should return empty array when no data is returned', async () => {
      server.use(
        http.get('https://dummyjson.com/posts', () => {
          return HttpResponse.json(null);
        })
      );
      const posts = await fetchPosts(1, 0);
      expect(posts).toEqual({ posts: [], total: 0, limit: 1, skip: 0 });
    });

    test('should thrown when request fails', async () => {
      server.use(
        http.get('https://dummyjson.com/posts', () => {
          return new HttpResponse('Not found', { status: 500 });
        })
      );
      await expect(fetchPosts(1, 0)).rejects.toThrow();
    });
  });

  describe('fetchPost', () => {
    test('should fetch post when data is valid', async () => {
      const post = createPostWithAuthorMock();
      server.use(
        http.get('https://dummyjson.com/posts/:id', () => {
          return HttpResponse.json(post);
        })
      );
      const response = await fetchPost('1');
      expect(response).toEqual(post);
    });

    test('should throw an error when data is invalid', async () => {
      server.use(
        http.get('https://dummyjson.com/posts/:id', () => {
          return HttpResponse.json('invalid data');
        })
      );
      await expect(fetchPost('1')).rejects.toThrow();
    });

    test('should return null when post is not found', async () => {
      server.use(
        http.get('https://dummyjson.com/posts/:id', () => {
          return new HttpResponse('Not found', { status: 404 });
        })
      );
      const response = await fetchPost('1');
      expect(response).toBeNull();
    });

    test('should return null when no data is returned', async () => {
      server.use(
        http.get('https://dummyjson.com/posts/:id', () => {
          return HttpResponse.json(null);
        })
      );
      const response = await fetchPost('1');
      expect(response).toBeNull();
    });

    test('should throw an error when request fails', async () => {
      server.use(
        http.get('https://dummyjson.com/posts/:id', () => {
          return new HttpResponse('Not found', { status: 500 });
        })
      );
      await expect(fetchPost('1')).rejects.toThrow();
    });
  });
});
