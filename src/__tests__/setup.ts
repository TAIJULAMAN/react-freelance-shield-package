import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { }, // deprecated
        removeListener: () => { }, // deprecated
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => true,
    }),
});

// Mock crypto.subtle for token hashing tests
if (!global.crypto) {
    (global as any).crypto = {};
}

if (!global.crypto.subtle) {
    (global.crypto as any).subtle = {
        digest: async (algorithm: string, data: Uint8Array) => {
            // Simple mock hash - returns consistent hash based on input length
            const length = algorithm === 'SHA-256' ? 32 : 64;
            const hash = new Uint8Array(length);
            for (let i = 0; i < length; i++) {
                hash[i] = (data.length + i) % 256;
            }
            return hash.buffer;
        },
    };
}

