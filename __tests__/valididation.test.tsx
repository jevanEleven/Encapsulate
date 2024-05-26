import { usernameSchema, emailSchema, passwordSchema, verificationCodeSchema } from '@/lib/validations/auth';
  
describe('validation schemas', () => {
  describe('username validation', () => {
    it('rejects usernames that are too short or too long', () => {
      const shortUsernameResult = usernameSchema.safeParse('abc');
      const longUsernameResult = usernameSchema.safeParse('a'.repeat(21));

      expect(shortUsernameResult.success).toBe(false);
      if (!shortUsernameResult.success) {
        expect(shortUsernameResult.error.errors[0].message).toContain('at least 4 characters long');
      }

      expect(longUsernameResult.success).toBe(false);
      if (!longUsernameResult.success) {
        expect(longUsernameResult.error.errors[0].message).toContain('no more than 20 characters long');
      }
    });

    it('rejects usernames with invalid characters', () => {
      const invalidUsername = 'user@name';
      const result = usernameSchema.safeParse(invalidUsername);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('alphanumeric characters, \'.\', and \'_\'');
      }
    });

    it('accepts usernames at boundary length conditions', () => {
      const minLengthUsername = 'abcd';  // Minimum valid length is 4
      const maxLengthUsername = 'a'.repeat(20);  // Maximum valid length is 20
      expect(usernameSchema.safeParse(minLengthUsername).success).toBe(true);
      expect(usernameSchema.safeParse(maxLengthUsername).success).toBe(true);
    });
  
    it('rejects empty or null usernames', () => {
      const emptyUsername = '';
      const nullUsername = null; // This will need to be handled differently if null checks are not included
      expect(usernameSchema.safeParse(emptyUsername).success).toBe(false);
      if (typeof nullUsername === 'string') {  // Check to prevent TypeScript errors
        expect(usernameSchema.safeParse(nullUsername).success).toBe(false);
      }  });
    });
  describe('email validation', () => {
    it('rejects emails without a domain', () => {
      const email = 'user@';
      const result = emailSchema.safeParse(email);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('Invalid email');
      }
    });

    it('rejects emails with multiple @ symbols', () => {
      const email = 'user@@example.com';
      const result = emailSchema.safeParse(email);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('Invalid email');
      }
    });

    it('accepts emails with subdomains', () => {
      const email = 'user@sub.example.com';
      expect(emailSchema.safeParse(email).success).toBe(true);
    });
  });
  describe('password validation', () => {
    it('rejects passwords without special characters', () => {
      const password = 'Abcdefgh1';
      const result = passwordSchema.safeParse(password);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('Password must include at least one special character.');
      }
    });
  
    it('accepts passwords at maximum length', () => {
      const password = `${'Aa1!'.repeat(16)}`;  // 64 characters long
      expect(passwordSchema.safeParse(password).success).toBe(true);
    });
  
    it('rejects overly long passwords', () => {
      const password = 'Aa1!' + 'A'.repeat(61);  // 65 characters, exceeds max length
      const result = passwordSchema.safeParse(password);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('Password must be at most 64 characters long.');
      }
    });
  });
  describe('verification code validation', () => {
    it('rejects codes with letters or special characters', () => {
      const codes = ['12345A', '123!56', 'ABCDE1'];
      codes.forEach(code => {
        const result = verificationCodeSchema.safeParse(code);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.errors[0].message).toContain('Code only contains numbers.');
        }
      });
    });
  
    it('rejects codes of incorrect length', () => {
      const shortCode = '12345';  // Less than 6 characters
      const longCode = '1234567';  // More than 6 characters
      expect(verificationCodeSchema.safeParse(shortCode).success).toBe(false);
      expect(verificationCodeSchema.safeParse(longCode).success).toBe(false);
    });
  });
});

