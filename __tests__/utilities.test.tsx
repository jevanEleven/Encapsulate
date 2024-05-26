import {
  CapsuleData,
  convertDate,
  isEmpty,
  isUnlocked,
  sortObjectByField,
  filterCapsulesByLockStatus,
  abbreviateText
} from '@/utilities/utilities';

describe('Utilities Test Suite', () => {
  describe('convertDate Function', () => {
    it('should return empty string if date is undefined', () => {
      expect(convertDate(undefined)).toBe('');
    });

    it('should throw an error for invalid input types', () => {
      expect(() => convertDate({} as any)).toThrow('convertDate requires input of type \'Date\' or \'string\'');
    });
  });

  describe('isEmpty Function', () => {
    it('should return true for empty object', () => {
      expect(isEmpty({})).toBeTruthy();
    });

    it('should return true for empty array', () => {
      expect(isEmpty([])).toBeTruthy();
    });

    it('should return false for non-empty object', () => {
      expect(isEmpty({ key: 'value' })).toBeFalsy();
    });

    it('should return false for non-empty array', () => {
      expect(isEmpty([1])).toBeFalsy();
    });

    it('should throw an error for non-object non-array inputs', () => {
      expect(() => isEmpty('string' as any)).toThrow();
    });
  });

  describe('filterCapsulesByLockStatus Function', () => {
    const capsules: CapsuleData[] = [
      { title: 'Past', unlockDate: '2022-01-01', createdAt: new Date('2022-01-01') },
      { title: 'Future', unlockDate: '2999-01-01', createdAt: new Date('2022-01-01') }
    ];

    it('should filter locked capsules', () => {
      expect(filterCapsulesByLockStatus(capsules, 'locked').length).toBe(1);
      expect(filterCapsulesByLockStatus(capsules, 'locked')[0].title).toBe('Future');
    });

    it('should filter unlocked capsules', () => {
      expect(filterCapsulesByLockStatus(capsules, 'unlocked').length).toBe(1);
      expect(filterCapsulesByLockStatus(capsules, 'unlocked')[0].title).toBe('Past');
    });
  });

  describe('abbreviateText Function', () => {
    it('should not abbreviate text shorter than 25 characters', () => {
      const shortText = 'Short text';
      expect(abbreviateText(25, shortText)).toBe('Short text');
    });
  });
});
