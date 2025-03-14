import { compressData } from '@/lib/utils/compression';
import { server } from '@/test/mocks/node';
import { createPostWithAuthorMock, mockedPostWithAuthor, mockedPosts } from '@/test/mocks/postMock';
import { render, screen } from '@/test/utils';
import { http, HttpResponse } from 'msw';
import PostPage, { generateMetadata, generateStaticParams } from '../[id]/page';

describe('PostPage', () => {
  describe('generateStaticParams', () => {
    test('generates static params', async () => {
      const params = await generateStaticParams();
      const generatedParams = mockedPosts.map((post) => ({
        id: String(post.id)
      }));
      expect(params).toEqual(generatedParams);
    });
  });

  describe('generateMetadata', () => {
    test('generates metadata', async () => {
      const params = Promise.resolve({ id: '1' });
      const metadata = await generateMetadata({ params, searchParams: Promise.resolve({}) });
      expect(metadata).toEqual({
        title: 'Post 1',
        description: 'Post 1 by John Doe'
      });
    });
  });

  describe('PostPage', () => {
    test('renders the post from url search params when data is valid', async () => {
      const postId = '1000';
      const mockedPost = createPostWithAuthorMock({
        id: Number(postId),
        title: 'My mocked post',
        body: 'My mocked post body'
      });
      const params = Promise.resolve({ id: postId });
      const searchParams = Promise.resolve({
        post: compressData(mockedPost)
      });
      render(await PostPage({ params, searchParams }));

      expect(
        screen.getByRole('heading', { name: `Post: ${postId}`, level: 2 })
      ).toBeInTheDocument();

      expect(screen.getByText(mockedPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockedPost.body)).toBeInTheDocument();
    });

    test('renders the post from url params when data is valid', async () => {
      const params = Promise.resolve({ id: '1' });
      const searchParams = Promise.resolve({});
      render(await PostPage({ params, searchParams }));

      expect(screen.getByRole('heading', { name: 'Post: 1', level: 2 })).toBeInTheDocument();

      expect(screen.getByText(mockedPostWithAuthor.title)).toBeInTheDocument();
      expect(screen.getByText(mockedPostWithAuthor.body)).toBeInTheDocument();
    });

    test('throws an error if data in url is invalid', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      const postId = '123';
      const params = Promise.resolve({ id: postId });
      const searchParams = Promise.resolve({
        post: 'invalid'
      });

      await expect(PostPage({ params, searchParams })).rejects.toThrow(
        'Failure to validate post data from url'
      );
    });

    test('throws an error if data from api is not available', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      const postId = '123';
      const params = Promise.resolve({ id: postId });
      const searchParams = Promise.resolve({});
      server.use(
        http.get('https://dummyjson.com/posts/:id', () => {
          return HttpResponse.json({
            error: 'Not found'
          });
        })
      );

      await expect(PostPage({ params, searchParams })).rejects.toThrow(
        'Failure to fetch post data from api'
      );
    });

    test('renders not data message if neither data in url nor data from api is available', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      const postId = '123';
      const params = Promise.resolve({ id: postId });
      const searchParams = Promise.resolve({});

      server.use(
        http.get('https://dummyjson.com/posts/:id', () => {
          return new HttpResponse('Not found', { status: 404 });
        })
      );
      render(await PostPage({ params, searchParams }));

      expect(
        screen.getByRole('heading', {
          name: `No data available for post with id ${postId}`,
          level: 2
        })
      ).toBeInTheDocument();
    });
  });
});
