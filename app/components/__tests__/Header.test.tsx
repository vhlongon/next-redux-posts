import { render, screen } from '@/test/utils';
import { Header } from '../Header';

describe('Header', () => {
  test('should render title correctly', async () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Posts app' })
    ).toBeInTheDocument();
  });
});
