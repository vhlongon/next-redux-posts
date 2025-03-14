import RootLayout from '@/app/layout';
import { render, screen } from '@testing-library/react';

// Mock next/font/google to return a mock font object
vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({
    variable: '--font-body'
  }),
  Orbitron: () => ({
    variable: '--font-heading'
  })
}));

describe('RootLayout', () => {
  // Mock console.error since the render ouputs the component inside a div
  // Warning: validateDOMNesting(...): <html> cannot appear as a child of <div>.
  vi.spyOn(console, 'error').mockImplementation(() => {});
  test('renders the layout with children and correct structure', async () => {
    const testChild = <div data-testid="test-child">Test Content</div>;

    const { container } = render(<RootLayout>{testChild}</RootLayout>);

    // Check if the child content is rendered
    expect(screen.getByTestId('test-child')).toBeInTheDocument();

    // Check if main structural elements are present
    expect(container.querySelector('html')).toBeInTheDocument();
    expect(container.querySelector('body')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();

    // Check if the Header component is rendered
    expect(container.querySelector('header')).toBeInTheDocument();

    // Verify the basic layout structure
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveStyle({
      width: '100%',
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    });
  });
});
