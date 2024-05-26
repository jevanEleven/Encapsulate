import React from 'react';
import { render } from '@testing-library/react';
import { CapsuleRow, CapsuleCard } from '@/components/capsule-thumbnails'; 
describe('CapsuleRow', () => {
  it('should match snapshot', () => {
    const capsuleData = {
      title: 'Test Capsule',
      createdAt: new Date('2024-04-24T12:00:00Z'),
      unlockDate: '2024-04-25T12:00:00Z'
    };

    const { asFragment } = render(<CapsuleRow {...capsuleData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('CapsuleCard', () => {
  it('should match snapshot', () => {
    const capsuleData = {
      title: 'Test Capsule',
      createdAt: new Date('2024-04-24T12:00:00Z'),
      unlockDate: '2024-04-25T12:00:00Z',
      likeNumber: 10,
      commentNumber: 5
    };

    const { asFragment } = render(<CapsuleCard {...capsuleData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
