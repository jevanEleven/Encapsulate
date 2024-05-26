import React from 'react';
import { render } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from 'react-query';
import { ResetPasswordForm } from '@/components/forms/auth/reset-password-form';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}));

jest.mock('react-query', () => ({
  useMutation: jest.fn(() => ({
    mutate: jest.fn(),
    isLoading: false,
    isError: false,
    error: null
  }))
}));

describe('ResetPasswordForm', () => {
  it('renders correctly', () => {
    // Mock router and searchParams hooks
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn()
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((param) => {
        if (param === 'token_hash') return 'some_token_hash';
        if (param === 'type') return 'recovery';
      })
    });

    const { asFragment } = render(<ResetPasswordForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
