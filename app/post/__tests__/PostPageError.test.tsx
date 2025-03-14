import { render, screen } from '@/test/utils';
import PostPageError from '../error';

vi.mock('next/navigation', () => ({
  useParams: vi.fn().mockReturnValue({ id: '1' })
}));

describe('PostPageError', () => {
  test('should render the error message', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Error');
    render(<PostPageError error={error} />);
    expect(
      screen.getByRole('heading', { name: 'Something went wrong!', level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Error trying to fetch the post for id', {
        exact: false
      })
    ).toBeInTheDocument();

    expect(console.error).toHaveBeenCalledWith(error);
  });
});
