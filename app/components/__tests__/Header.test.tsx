import { render, screen } from '@/test/utils';
import { Header } from '../Header';

describe('Header', () => {
  it('should render title correctly', async () => {
    const Component = await Header({ pathname: 'something' });
    render(Component);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Posts app' })
    ).toBeInTheDocument();
  });

  it('should render Add Post link when NOT on the add post page', async () => {
    const Component = await Header({ pathname: 'something' });
    render(Component);

    expect(screen.getByRole('link', { name: 'Add Post' })).toHaveAttribute(
      'href',
      '/add-post'
    );
  });

  it('should NOT render Add Post link when on the add post page', async () => {
    const Component = await Header({ pathname: '/add-post' });
    render(Component);

    expect(
      screen.queryByRole('link', { name: 'Add Post' })
    ).not.toBeInTheDocument();
  });
});
