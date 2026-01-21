import React, { useEffect, useState, useRef } from 'react';
import { FreelanceShieldProps } from '../types';
import { validateTokenWithExpiry } from '../utils/tokenValidator';
import { useIntegrityMonitor } from '../hooks/useIntegrityMonitor';
import { WatermarkRenderer } from './WatermarkRenderer';

/**
 * FreelanceShield - Professional watermark protection for freelance work
 * 
 * @example
 * ```tsx
 * <FreelanceShield 
 *   validToken="your-secret-token"
 *   token={searchParams?.token}
 *   text="UNPAID DRAFT"
 *   contact="pay-me@example.com"
 * />
 * ```
 */
export const FreelanceShield: React.FC<FreelanceShieldProps> = ({
    validToken,
    token,
    text = 'DRAFT / UNPAID',
    watermarkStyle = 'default',
    position = 'center',
    opacity = 0.1,
    enableIntegrityCheck = true,
    checkInterval = 5000,
    onTamperDetected,
    expiresAt,
    hashAlgorithm = 'sha256',
    debug = false,
    contact = 'the developer',
    customMessage,
    ariaLabel,
    respectReducedMotion = true,
}) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isExpired, setIsExpired] = useState(false);
    const hostRef = useRef<HTMLDivElement>(null);

    // Validate token on mount and when dependencies change
    useEffect(() => {
        const checkToken = async () => {
            const result = await validateTokenWithExpiry(
                token,
                validToken,
                expiresAt,
                hashAlgorithm
            );

            setIsValid(result.valid);
            setIsExpired(result.expired);

            if (debug) {
                console.log('[FreelanceShield] Token validation:', {
                    valid: result.valid,
                    expired: result.expired,
                    hasToken: !!token,
                });
            }
        };

        checkToken();
    }, [token, validToken, expiresAt, hashAlgorithm, debug]);

    // Setup integrity monitoring
    useIntegrityMonitor(
        hostRef,
        {
            enabled: enableIntegrityCheck && !isValid,
            interval: checkInterval,
            onTamperDetected,
        },
        contact,
        debug
    );

    // Bypass: Valid token
    if (isValid === true) {
        if (debug) {
            console.log('[FreelanceShield] Valid token - watermark bypassed');
        }
        return null;
    }

    // Show watermark for invalid/missing/expired tokens
    const watermarkText = isExpired
        ? `${text} (EXPIRED)`
        : text;

    const displayMessage = customMessage ||
        `This is a draft version. Contact ${contact} to remove the watermark.`;

    // Log to console for transparency
    useEffect(() => {
        if (isValid === false || isExpired) {
            console.info(
                `%c[FreelanceShield] ${displayMessage}`,
                'color: #ff6b6b; font-weight: bold; font-size: 14px;'
            );
        }
    }, [isValid, isExpired, displayMessage]);

    return (
        <div ref={hostRef} style={{ display: 'contents' }}>
            <WatermarkRenderer
                config={{
                    text: watermarkText,
                    style: watermarkStyle,
                    position,
                    opacity,
                    respectReducedMotion,
                }}
                ariaLabel={ariaLabel}
            />
        </div>
    );
};
