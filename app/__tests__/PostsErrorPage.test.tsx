import { render, screen } from '@/test/utils';
import PostsError from '../error';

describe('ErrorComponent', () => {
  test('should render the error message', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const error = new Error('Error');

    render(<PostsError error={error} />);

    expect(
      screen.getByRole('heading', { name: 'Something went wrong!', level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Error trying to fetch the posts', { exact: false })
    ).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
