import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { FreelanceShield } from '../components/FreelanceShield';

describe('FreelanceShield', () => {
    beforeEach(() => {
        // Clear console spies
        vi.clearAllMocks();
    });

    it('should render watermark host element', () => {
        render(
            <FreelanceShield
                validToken="secret-token"
                text="TEST WATERMARK"
            />
        );

        // The host element should be in the document
        const host = document.getElementById('freelance-shield-host');
        expect(host).toBeInTheDocument();
    });

    it('should use custom text prop', () => {
        const customText = 'CUSTOM WATERMARK TEXT';

        render(
            <FreelanceShield
                validToken="secret"
                text={customText}
            />
        );

        const host = document.getElementById('freelance-shield-host');
        expect(host).toBeInTheDocument();
    });

    it('should accept all configuration props without errors', () => {
        const onTamperDetected = vi.fn();

        expect(() => {
            render(
                <FreelanceShield
                    validToken="secret"
                    token="test-token"
                    text="DRAFT"
                    watermarkStyle="default"
                    position="center"
                    opacity={0.2}
                    enableIntegrityCheck={true}
                    checkInterval={1000}
                    onTamperDetected={onTamperDetected}
                    debug={false}
                    contact="test@example.com"
                    respectReducedMotion={true}
                />
            );
        }).not.toThrow();
    });

    it('should render with minimal props', () => {
        expect(() => {
            render(
                <FreelanceShield validToken="minimal-test" />
            );
        }).not.toThrow();
    });

    it('should handle expiration date prop', () => {
        const futureDate = new Date(Date.now() + 86400000);

        expect(() => {
            render(
                <FreelanceShield
                    validToken="secret"
                    expiresAt={futureDate}
                />
            );
        }).not.toThrow();
    });

    it('should support different hash algorithms', () => {
        expect(() => {
            render(
                <FreelanceShield
                    validToken="secret"
                    hashAlgorithm="sha512"
                />
            );
        }).not.toThrow();
    });

    it('should render with custom aria label', () => {
        render(
            <FreelanceShield
                validToken="secret"
                ariaLabel="Custom watermark label"
            />
        );

        const host = document.getElementById('freelance-shield-host');
        expect(host).toBeInTheDocument();
    });
});
