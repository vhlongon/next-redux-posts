import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

// Only mock next/headers since it's server-side only
vi.mock('next/headers', () => ({
  headers: () => ({
    get: () => 'https://example.com/test-page',
  }),
}));

// Mock next/font/google to return a mock font object
vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({
    variable: '--font-body',
  }),
  Orbitron: () => ({
    variable: '--font-heading',
  }),
}));

// Mock the Header component since it's server-side only
vi.mock('@/app/components/Header', () => ({
  Header: () => <header>Header</header>,
}));

describe('RootLayout', () => {
  // Mock console.error since the render ouputs the component inside a div
  // Warning: validateDOMNesting(...): <html> cannot appear as a child of <div>.
  vi.spyOn(console, 'error').mockImplementation(() => {});
  test('renders the layout with children and correct structure', async () => {
    const testChild = <div data-testid="test-child">Test Content</div>;

    const { container } = render(await RootLayout({ children: testChild }));

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
      justifyContent: 'center',
    });
  });
});
