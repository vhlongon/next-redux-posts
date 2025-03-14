import { render, screen } from '@/test/utils';
import { ErrorComponent } from '../Error';

describe('ErrorComponent', () => {
  test('should render the error message', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const text = 'Error trying to fetch the posts';
    const error = new Error('Error');

    render(<ErrorComponent error={error} text={text} />);

    expect(
      screen.getByRole('heading', { name: 'Something went wrong!', level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(text, { exact: false })).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
