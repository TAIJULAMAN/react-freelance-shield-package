import React, { useEffect, useRef } from 'react';
import { WatermarkConfig } from '../types';
import {
    attachShadowSafely,
    createWatermarkContainer,
    createWatermarkText,
    getShadowDOMStyles,
    injectShadowStyles,
} from '../utils/shadowDomHelper';

interface WatermarkRendererProps {
    config: WatermarkConfig;
    ariaLabel?: string;
}

/**
 * Component responsible for rendering the watermark in Shadow DOM
 */
export const WatermarkRenderer: React.FC<WatermarkRendererProps> = ({
    config,
    ariaLabel = 'Draft watermark overlay',
}) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const shadowRootRef = useRef<ShadowRoot | null>(null);

    useEffect(() => {
        if (!hostRef.current) return;

        // Attach Shadow DOM if not already attached
        if (!shadowRootRef.current) {
            shadowRootRef.current = attachShadowSafely(hostRef.current, 'open');

            if (!shadowRootRef.current) {
                // Fallback: render without Shadow DOM
                console.warn('[FreelanceShield] Rendering without Shadow DOM protection');
                renderFallback();
                return;
            }
        }

        const shadow = shadowRootRef.current;

        // Render watermark
        const renderWatermark = () => {
            // Clear existing content
            shadow.innerHTML = '';

            // Inject styles
            injectShadowStyles(shadow, getShadowDOMStyles());

            // Create container
            const container = createWatermarkContainer(
                config.opacity,
                config.respectReducedMotion
            );

            // Create text element
            const textEl = createWatermarkText(config.text, config.opacity);

            // Assemble
            container.appendChild(textEl);
            shadow.appendChild(container);
        };

        renderWatermark();
    }, [config]);

    // Fallback rendering without Shadow DOM
    const renderFallback = () => {
        if (!hostRef.current) return;

        const container = createWatermarkContainer(
            config.opacity,
            config.respectReducedMotion
        );
        const textEl = createWatermarkText(config.text, config.opacity);

        container.appendChild(textEl);
        hostRef.current.appendChild(container);
    };

    return (
        <div
            ref={hostRef}
            id="freelance-shield-host"
            aria-label={ariaLabel}
            role="img"
            style={{ display: 'contents' }}
        />
    );
};
