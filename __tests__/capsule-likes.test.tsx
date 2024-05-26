import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CapsuleLikes from '@/components/capsule-likes';
import { useMutation } from 'react-query';

jest.mock('@/hooks/use-session', () => ({
  useSession: jest.fn(() => ({
    session: {
    },
    isLoading: false,
  })),
}));

jest.mock('react-query', () => ({
  useQuery: jest.fn(() => ({
    data: {
      likes: 0,
      isLiked: false,
    },
    error: null,
    isLoading: false,
    refetch: jest.fn(),
  })),
  useMutation: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

describe('CapsuleLikes', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<CapsuleLikes capsuleId="1" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call mutation function on button click', async () => {
    const { getByText } = render(<CapsuleLikes capsuleId="1" />);
    const button = getByText('0');
    fireEvent.click(button);
    await waitFor(() => {
      expect((useMutation as jest.Mock).mock.calls[0][0]).toBeDefined();
      expect((useMutation as jest.Mock).mock.calls[0][1]).toEqual({ retry: false });
    });
  });
});
