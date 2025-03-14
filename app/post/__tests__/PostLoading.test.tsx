import { render, screen } from '@/test/utils';
import LoadingPost from '../[id]/loading';

describe('LoadingPost', () => {
  test('renders skeleton loading elements', () => {
    render(<LoadingPost />);
    expect(screen.getByLabelText('Loading post')).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar Skeleton')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Skeleton Element').length).toBe(5);
  });
});
