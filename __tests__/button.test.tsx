import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Button>Click me</Button>);

    // Ensure the button is rendered
    expect(container.firstChild).toBeInTheDocument();

    // Ensure default variant classes are applied
    expect(container.firstChild).toHaveClass(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
    );

    // Ensure default size classes are applied
    expect(container.firstChild).toHaveClass('h-9 px-4 py-2');

    // Ensure button text is rendered
    expect(container.firstChild).toHaveTextContent('Click me');
  });

  it('renders correctly with specified variant and size', () => {
    const { container } = render(
      <Button variant="outline" size="sm">
        Click me
      </Button>
    );

    // Ensure specified variant classes are applied
    expect(container.firstChild).toHaveClass(
      'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground'
    );

    // Ensure specified size classes are applied
    expect(container.firstChild).toHaveClass('h-8 rounded-md px-3 text-xs');

    // Ensure button text is rendered
    expect(container.firstChild).toHaveTextContent('Click me');
  });

  it('renders correctly with custom className', () => {
    const { container } = render(
      <Button className="custom-class">Click me</Button>
    );

    // Ensure custom class is applied
    expect(container.firstChild).toHaveClass('custom-class');
  });


});
