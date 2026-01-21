import { HashAlgorithm } from '../types';

/**
 * Hash a token using the specified algorithm
 */
export async function hashToken(
    token: string,
    algorithm: HashAlgorithm = 'sha256'
): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);

    const hashBuffer = await crypto.subtle.digest(
        algorithm === 'sha256' ? 'SHA-256' : 'SHA-512',
        data
    );

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Validate a token against a hashed valid token
 */
export async function validateToken(
    providedToken: string | undefined,
    validToken: string,
    algorithm: HashAlgorithm = 'sha256'
): Promise<boolean> {
    if (!providedToken) {
        return false;
    }

    const hashedProvided = await hashToken(providedToken, algorithm);
    const hashedValid = await hashToken(validToken, algorithm);

    return hashedProvided === hashedValid;
}

/**
 * Check if a token has expired
 */
export function isTokenExpired(expiresAt?: Date): boolean {
    if (!expiresAt) {
        return false;
    }

    return new Date() > expiresAt;
}

/**
 * Validate token with expiration check
 */
export async function validateTokenWithExpiry(
    providedToken: string | undefined,
    validToken: string,
    expiresAt?: Date,
    algorithm: HashAlgorithm = 'sha256'
): Promise<{ valid: boolean; expired: boolean }> {
    const expired = isTokenExpired(expiresAt);

    if (expired) {
        return { valid: false, expired: true };
    }

    const valid = await validateToken(providedToken, validToken, algorithm);

    return { valid, expired: false };
}
