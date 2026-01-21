import { describe, it, expect } from 'vitest';
import {
    hashToken,
    validateToken,
    isTokenExpired,
    validateTokenWithExpiry,
} from '../utils/tokenValidator';

describe('tokenValidator', () => {
    describe('hashToken', () => {
        it('should hash a token using SHA-256', async () => {
            const token = 'test-token-123';
            const hash = await hashToken(token, 'sha256');

            expect(hash).toBeTruthy();
            expect(hash).toHaveLength(64); // SHA-256 produces 64 hex characters
        });

        it('should produce consistent hashes for the same input', async () => {
            const token = 'consistent-token';
            const hash1 = await hashToken(token, 'sha256');
            const hash2 = await hashToken(token, 'sha256');

            expect(hash1).toBe(hash2);
        });

        it('should produce different hashes for different inputs', async () => {
            const hash1 = await hashToken('token1', 'sha256');
            const hash2 = await hashToken('token2', 'sha256');

            expect(hash1).not.toBe(hash2);
        });

        it('should support SHA-512 algorithm', async () => {
            const token = 'test-token';
            const hash = await hashToken(token, 'sha512');

            expect(hash).toBeTruthy();
            expect(hash).toHaveLength(128); // SHA-512 produces 128 hex characters
        });
    });

    describe('validateToken', () => {
        it('should validate matching tokens', async () => {
            const token = 'valid-token-123';
            const isValid = await validateToken(token, token, 'sha256');

            expect(isValid).toBe(true);
        });

        it('should reject non-matching tokens', async () => {
            const providedToken = 'wrong-token';
            const validToken = 'correct-token';
            const isValid = await validateToken(providedToken, validToken, 'sha256');

            expect(isValid).toBe(false);
        });

        it('should reject undefined tokens', async () => {
            const isValid = await validateToken(undefined, 'valid-token', 'sha256');

            expect(isValid).toBe(false);
        });
    });

    describe('isTokenExpired', () => {
        it('should return false for undefined expiry', () => {
            const expired = isTokenExpired(undefined);

            expect(expired).toBe(false);
        });

        it('should return false for future dates', () => {
            const futureDate = new Date(Date.now() + 86400000); // +1 day
            const expired = isTokenExpired(futureDate);

            expect(expired).toBe(false);
        });

        it('should return true for past dates', () => {
            const pastDate = new Date(Date.now() - 86400000); // -1 day
            const expired = isTokenExpired(pastDate);

            expect(expired).toBe(true);
        });
    });

    describe('validateTokenWithExpiry', () => {
        it('should validate non-expired matching tokens', async () => {
            const token = 'valid-token';
            const futureDate = new Date(Date.now() + 86400000);

            const result = await validateTokenWithExpiry(
                token,
                token,
                futureDate,
                'sha256'
            );

            expect(result.valid).toBe(true);
            expect(result.expired).toBe(false);
        });

        it('should reject expired tokens', async () => {
            const token = 'valid-token';
            const pastDate = new Date(Date.now() - 86400000);

            const result = await validateTokenWithExpiry(
                token,
                token,
                pastDate,
                'sha256'
            );

            expect(result.valid).toBe(false);
            expect(result.expired).toBe(true);
        });

        it('should reject invalid tokens even if not expired', async () => {
            const futureDate = new Date(Date.now() + 86400000);

            const result = await validateTokenWithExpiry(
                'wrong-token',
                'correct-token',
                futureDate,
                'sha256'
            );

            expect(result.valid).toBe(false);
            expect(result.expired).toBe(false);
        });
    });
});
