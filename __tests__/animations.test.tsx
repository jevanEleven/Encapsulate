import React from 'react';
import { render } from '@testing-library/react';
import { LoadingDots } from '@/utilities/animations'; // Adjust the import path as necessary

describe('LoadingDots', () => {
  it('renders and matches snapshot', () => {
    // Temporarily suppress console error messages related to style property warnings
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (/Warning: Unsupported style property/.test(args[0])) {
        return;
      }
      originalConsoleError(...args);
    };

    const { asFragment } = render(<LoadingDots />);
    expect(asFragment()).toMatchSnapshot();

    // Restore the original console.error
    console.error = originalConsoleError;
  });
});
