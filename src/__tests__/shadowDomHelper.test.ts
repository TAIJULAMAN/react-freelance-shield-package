import { describe, it, expect } from 'vitest';
import {
    isShadowDOMSupported,
    createWatermarkContainer,
    createWatermarkText,
    getShadowDOMStyles,
} from '../utils/shadowDomHelper';

describe('shadowDomHelper', () => {
    describe('isShadowDOMSupported', () => {
        it('should return true in modern browsers', () => {
            const supported = isShadowDOMSupported();
            expect(supported).toBe(true);
        });
    });

    describe('createWatermarkContainer', () => {
        it('should create a container with correct styles', () => {
            const container = createWatermarkContainer(0.2, true);

            expect(container.tagName).toBe('DIV');
            expect(container.style.position).toBe('fixed');
            expect(container.style.zIndex).toBe('2147483647');
            expect(container.style.pointerEvents).toBe('none');
        });

        it('should respect opacity parameter', () => {
            const opacity = 0.3;
            const container = createWatermarkContainer(opacity, true);

            expect(container.style.background).toContain('0.15'); // opacity * 0.5
        });
    });

    describe('createWatermarkText', () => {
        it('should create text element with correct content', () => {
            const text = 'TEST WATERMARK';
            const textEl = createWatermarkText(text, 0.1, -30);

            expect(textEl.tagName).toBe('H1');
            expect(textEl.innerText).toBe(text);
        });

        it('should apply correct styles', () => {
            const textEl = createWatermarkText('TEST', 0.15, -45);

            expect(textEl.style.fontWeight).toBe('900');
            expect(textEl.style.userSelect).toBe('none');
            expect(textEl.style.transform).toContain('rotate(-45deg)');
        });

        it('should have accessibility attributes', () => {
            const textEl = createWatermarkText('TEST', 0.1);

            expect(textEl.getAttribute('aria-label')).toBe('Draft watermark');
        });
    });

    describe('getShadowDOMStyles', () => {
        it('should return CSS animation styles', () => {
            const styles = getShadowDOMStyles();

            expect(styles).toContain('@keyframes pulse');
            expect(styles).toContain('opacity');
        });
    });
});
