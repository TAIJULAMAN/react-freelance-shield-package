/**
 * Check if Shadow DOM is supported in the current browser
 */
export function isShadowDOMSupported(): boolean {
    return 'attachShadow' in Element.prototype;
}

/**
 * Safely attach a Shadow DOM to an element
 */
export function attachShadowSafely(
    element: HTMLElement,
    mode: 'open' | 'closed' = 'open'
): ShadowRoot | null {
    if (!isShadowDOMSupported()) {
        console.warn('[FreelanceShield] Shadow DOM not supported in this browser');
        return null;
    }

    try {
        return element.attachShadow({ mode });
    } catch (error) {
        console.error('[FreelanceShield] Failed to attach Shadow DOM:', error);
        return null;
    }
}

/**
 * Inject styles into Shadow DOM
 */
export function injectShadowStyles(shadowRoot: ShadowRoot, styles: string): void {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    shadowRoot.appendChild(styleElement);
}

/**
 * Create a watermark container with inline styles
 */
export function createWatermarkContainer(
    opacity: number = 0.1,
    respectReducedMotion: boolean = true
): HTMLDivElement {
    const container = document.createElement('div');

    const motionSafe = respectReducedMotion &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483647;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 0, 0, ${opacity * 0.5});
    mix-blend-mode: multiply;
    ${motionSafe ? '' : 'animation: pulse 3s ease-in-out infinite;'}
  `;

    return container;
}

/**
 * Create watermark text element
 */
export function createWatermarkText(
    text: string,
    opacity: number = 0.1,
    rotation: number = -30
): HTMLHeadingElement {
    const textEl = document.createElement('h1');
    textEl.innerText = text;
    textEl.style.cssText = `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 10vh;
    font-weight: 900;
    color: rgba(0, 0, 0, ${opacity});
    transform: rotate(${rotation}deg);
    user-select: none;
    text-align: center;
    line-height: 1.2;
    max-width: 90vw;
    word-wrap: break-word;
  `;
    textEl.setAttribute('aria-label', 'Draft watermark');

    return textEl;
}

/**
 * Get Shadow DOM styles for animations
 */
export function getShadowDOMStyles(): string {
    return `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `;
}
