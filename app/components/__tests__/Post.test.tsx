import { createPostMock } from '@/test/mocks/postMock';
import { render, screen } from '@/test/utils';
import { Post, truncateText } from '../Post';
import { compressData } from '@/lib/utils/compression';

const mockedPost = createPostMock();

describe('Post', () => {
  test('should render correctly post correctly when not in preview mode', () => {
    render(<Post {...mockedPost} />);

    expect(
      screen.getByRole('img', {
        name: `Avatar for ${mockedPost.author.firstName} ${mockedPost.author.lastName}`,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      mockedPost.title
    );

    expect(screen.getByText(mockedPost.body)).toBeInTheDocument();
    expect(
      screen.getByText(mockedPost.author.firstName, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockedPost.author.lastName, { exact: false })
    ).toBeInTheDocument();
  });

  test('should render correctly post correctly when in preview mode', () => {
    render(<Post {...mockedPost} preview />);

    expect(
      screen.getByRole('img', {
        name: `Avatar for ${mockedPost.author.firstName} ${mockedPost.author.lastName}`,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(mockedPost.title)).toBeInTheDocument();
    expect(
      screen.getByText(truncateText(mockedPost.body, 100))
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute(
      'href',
      `/post/${mockedPost.id}?post=${compressData(mockedPost)}`
    );

    expect(
      screen.getByText(mockedPost.author.firstName, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockedPost.author.lastName, { exact: false })
    ).toBeInTheDocument();
  });

  test('should append highlighted class when isNew is true', () => {
    render(<Post {...mockedPost} isNew />);

    expect(screen.getByRole('article')).toHaveClass('highlighted');
  });
});
