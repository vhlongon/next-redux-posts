import { render, screen } from '@/test/utils';
import { PostSkeleton } from '../PostSkeleton';

describe('PostSkeleton', () => {
  test('renders skeleton loading elements', () => {
    render(<PostSkeleton />);
    expect(screen.getByLabelText('Loading post')).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar Skeleton')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Skeleton Element').length).toBe(4);
  });
});
