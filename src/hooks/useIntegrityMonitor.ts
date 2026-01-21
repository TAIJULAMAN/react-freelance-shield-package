import { useEffect, useRef } from 'react';
import { IntegrityCheckConfig } from '../types';

/**
 * Hook to monitor DOM integrity and detect tampering attempts
 */
export function useIntegrityMonitor(
    hostRef: React.RefObject<HTMLDivElement>,
    config: IntegrityCheckConfig,
    contact: string,
    debug: boolean = false
) {
    const tamperAttemptsRef = useRef(0);
    const observerRef = useRef<MutationObserver | null>(null);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!config.enabled || !hostRef.current) {
            return;
        }

        const logDebug = (message: string) => {
            if (debug) {
                console.log(`[FreelanceShield] ${message}`);
            }
        };

        // Monitor for host element removal
        const checkHostIntegrity = () => {
            if (!document.contains(hostRef.current)) {
                tamperAttemptsRef.current += 1;

                console.warn(
                    `[FreelanceShield] Tampering detected (${tamperAttemptsRef.current} attempts). ` +
                    `Please contact ${contact} to remove the watermark.`
                );

                if (config.onTamperDetected) {
                    config.onTamperDetected(tamperAttemptsRef.current);
                }

                logDebug('Host element removed from DOM');
            }
        };

        // MutationObserver for DOM changes
        if (hostRef.current.parentElement) {
            observerRef.current = new MutationObserver((mutations) => {
                let shouldCheck = false;

                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        shouldCheck = true;
                    }
                });

                if (shouldCheck) {
                    // Use requestIdleCallback for performance
                    if ('requestIdleCallback' in window) {
                        requestIdleCallback(() => checkHostIntegrity());
                    } else {
                        setTimeout(checkHostIntegrity, 0);
                    }
                }
            });

            observerRef.current.observe(hostRef.current.parentElement, {
                childList: true,
                subtree: false,
            });

            logDebug('Integrity monitoring started');
        }

        // Periodic integrity check
        if (config.interval > 0) {
            intervalRef.current = window.setInterval(() => {
                checkHostIntegrity();
            }, config.interval);
        }

        // Cleanup
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                logDebug('Integrity monitoring stopped');
            }

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [config.enabled, config.interval, config.onTamperDetected, contact, debug]);

    return tamperAttemptsRef.current;
}
