import { render, screen } from '@/test/utils';
import AddPostPage from '../page';

describe('AddPostPage', () => {
  test('renders the add post page', () => {
    render(<AddPostPage />);

    expect(
      screen.getByRole('heading', { name: 'Add Post', level: 2 })
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Add Post Form')).toBeInTheDocument();
  });
});
