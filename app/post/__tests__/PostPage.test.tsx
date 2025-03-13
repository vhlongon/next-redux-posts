import { compressData } from '@/lib/utils/compression';
import { server } from '@/test/mocks/node';
import {
  createPostWithAuthorMock,
  mockedPostWithAuthor,
  mockedPosts,
} from '@/test/mocks/postMock';
import { render, screen } from '@/test/utils';
import { http, HttpResponse } from 'msw';
import PostPage, { generateStaticParams } from '../[id]/page';

describe('PostPage', () => {
  test('generates static params', async () => {
    const params = await generateStaticParams();
    const generatedParams = mockedPosts.map(post => ({
      id: String(post.id),
    }));
    expect(params).toEqual(generatedParams);
  });

  test('renders the post from url search params', async () => {
    const postId = '1000';
    const mockedPost = createPostWithAuthorMock({
      id: Number(postId),
      title: 'My mocked post',
      body: 'My mocked post body',
    });
    const params = Promise.resolve({ id: postId });
    const searchParams = Promise.resolve({
      post: compressData(mockedPost),
    });
    render(await PostPage({ params, searchParams }));

    expect(
      screen.getByRole('heading', { name: `Post: ${postId}`, level: 2 })
    ).toBeInTheDocument();

    expect(screen.getByText(mockedPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockedPost.body)).toBeInTheDocument();
  });

  test('renders the post from url params', async () => {
    const params = Promise.resolve({ id: '1' });
    const searchParams = Promise.resolve({});
    render(await PostPage({ params, searchParams }));

    expect(
      screen.getByRole('heading', { name: 'Post: 1', level: 2 })
    ).toBeInTheDocument();

    expect(screen.getByText(mockedPostWithAuthor.title)).toBeInTheDocument();
    expect(screen.getByText(mockedPostWithAuthor.body)).toBeInTheDocument();
  });

  test('renders not data message if data in url is invalid and data from api is not available', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const postId = '123';
    server.use(
      http.get('https://dummyjson.com/posts/:id', () => {
        return HttpResponse.json({
          error: 'Not found',
        });
      })
    );
    const params = Promise.resolve({ id: postId });
    const searchParams = Promise.resolve({
      post: 'invalid',
    });
    render(await PostPage({ params, searchParams }));

    expect(
      screen.getByRole('heading', {
        name: `No data available for post with id ${postId}`,
        level: 2,
      })
    ).toBeInTheDocument();

    expect(console.error).toHaveBeenCalledWith(
      'Error validating post data:',
      expect.any(Error)
    );
  });
});
