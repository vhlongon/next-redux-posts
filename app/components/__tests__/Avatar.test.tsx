import { render, screen } from '@/test/utils';
import Avatar, { getInitials } from '../Avatar';

describe('Avatar', () => {
  test('should render correctly as image with initials and accessible name', () => {
    render(<Avatar firstName="John" lastName="Doe" />);

    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Avatar for John Doe' })).toBeInTheDocument();
  });

  describe('getInitials', () => {
    test('should return the initials of the first and last name', () => {
      expect(getInitials('John', 'Doe')).toBe('JD');
    });

    test('should handle empty strings', () => {
      expect(getInitials('', '')).toBe('');
    });
  });
});
