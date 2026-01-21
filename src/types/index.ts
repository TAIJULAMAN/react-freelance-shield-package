export type WatermarkStyle = 'default' | 'subtle' | 'aggressive' | 'canvas';
export type WatermarkPosition = 'center' | 'diagonal' | 'tiled';
export type HashAlgorithm = 'sha256' | 'sha512';

export interface FreelanceShieldProps {
    // Core
    validToken: string;
    token?: string;

    // Customization
    text?: string;
    watermarkStyle?: WatermarkStyle;
    position?: WatermarkPosition;
    opacity?: number;

    // Security
    enableIntegrityCheck?: boolean;
    checkInterval?: number; // ms
    onTamperDetected?: (attempts: number) => void;

    // Token Management
    expiresAt?: Date;
    hashAlgorithm?: HashAlgorithm;

    // Developer Experience
    debug?: boolean;
    contact?: string;
    customMessage?: string;

    // Accessibility
    ariaLabel?: string;
    respectReducedMotion?: boolean;
}

export interface WatermarkConfig {
    text: string;
    style: WatermarkStyle;
    position: WatermarkPosition;
    opacity: number;
    respectReducedMotion: boolean;
}

export interface IntegrityCheckConfig {
    enabled: boolean;
    interval: number;
    onTamperDetected?: (attempts: number) => void;
}
