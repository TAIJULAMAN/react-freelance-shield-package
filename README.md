# React Freelance Shield 🛡️

**Professional watermark protection for freelancers and students showcasing work before payment.**

[![npm version](https://img.shields.io/npm/v/react-freelance-shield.svg)](https://www.npmjs.com/package/react-freelance-shield)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

## 🎯 The Problem

You've built an amazing website for a client. They want to "review it first" before paying. You deploy to staging... and suddenly they ghost you. Sound familiar?

**React Freelance Shield** solves this by adding a professional, tamper-resistant watermark to your work until payment is received. It's like a "draft mode" for your entire application.

### Why This Matters

- **70% of freelancers** report payment issues with clients
- **Average recovery time**: 2-3 months of back-and-forth
- **Lost revenue**: Thousands of dollars in unpaid work
- **Your solution**: Professional protection in 30 seconds

---

## ✨ Features

- 🔒 **Tamper-Resistant** - Shadow DOM + integrity monitoring
- ⚡ **Zero-Config** - Works out of the box with sensible defaults
- 🎨 **Customizable** - Control text, opacity, position, and style
- 🔐 **Secure Tokens** - SHA-256/512 hashing with expiration support
- 📱 **Accessible** - Screen reader friendly with ARIA labels
- 🪶 **Lightweight** - < 10KB gzipped (smaller than a logo image!)
- 💪 **TypeScript** - Full type safety and IntelliSense
- ⚛️ **React 18+** - Modern React with hooks
- 🎭 **Framework Agnostic** - Works with Next.js, Vite, CRA, Remix, Gatsby
- 🌐 **SSR Compatible** - Client-side rendering with SSR frameworks

---

## 📦 Installation

```bash
# npm
npm install react-freelance-shield

# yarn
yarn add react-freelance-shield

# pnpm
pnpm add react-freelance-shield
```

---

## 🚀 Quick Start

### Next.js App Router (Recommended)

```tsx
// app/layout.tsx
import { FreelanceShield } from 'react-freelance-shield';

export default function RootLayout({ 
  children,
  searchParams 
}: { 
  children: React.ReactNode;
  searchParams?: { token?: string };
}) {
  return (
    <html lang="en">
      <body>
        <FreelanceShield 
          validToken={process.env.NEXT_PUBLIC_SHIELD_TOKEN!}
          token={searchParams?.token}
          text="UNPAID DRAFT"
          contact="pay-me@example.com"
        />
        {children}
      </body>
    </html>
  );
}
```

### Next.js Pages Router

```tsx
// pages/_app.tsx
import { FreelanceShield } from 'react-freelance-shield';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <FreelanceShield 
        validToken={process.env.NEXT_PUBLIC_SHIELD_TOKEN!}
        text="PENDING PAYMENT - INVOICE #12345"
        contact="payments@freelancer.com"
      />
      <Component {...pageProps} />
    </>
  );
}
```

### Vite + React

```tsx
// src/App.tsx
import { FreelanceShield } from 'react-freelance-shield';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token') || undefined;

  return (
    <>
      <FreelanceShield 
        validToken={import.meta.env.VITE_SHIELD_TOKEN}
        token={token}
        text="DEMO VERSION"
        contact="hire-me@example.com"
      />
      <YourApp />
    </>
  );
}

export default App;
```

### Create React App

```tsx
// src/App.js
import { FreelanceShield } from 'react-freelance-shield';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  return (
    <>
      <FreelanceShield 
        validToken={process.env.REACT_APP_SHIELD_TOKEN}
        token={token}
        text="PREVIEW MODE"
      />
      <YourApp />
    </>
  );
}
```

### Remix

```tsx
// app/root.tsx
import { FreelanceShield } from 'react-freelance-shield';
import { useSearchParams } from '@remix-run/react';

export default function App() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || undefined;

  return (
    <html>
      <body>
        <FreelanceShield 
          validToken={process.env.SHIELD_TOKEN!}
          token={token}
        />
        <Outlet />
      </body>
    </html>
  );
}
```

---

## 📖 Complete API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `validToken` | `string` | **Required** | The secret token that removes the watermark when matched |
| `token` | `string \| undefined` | `undefined` | Token provided by user (e.g., from URL params or form input) |
| `text` | `string` | `"DRAFT / UNPAID"` | Watermark text to display across the screen |
| `watermarkStyle` | `'default' \| 'subtle' \| 'aggressive' \| 'canvas'` | `'default'` | Visual style of watermark (affects visibility and prominence) |
| `position` | `'center' \| 'diagonal' \| 'tiled'` | `'center'` | Watermark position on screen |
| `opacity` | `number` | `0.1` | Watermark opacity (0-1). Lower = more subtle, higher = more visible |
| `enableIntegrityCheck` | `boolean` | `true` | Monitor DOM for tampering attempts using MutationObserver |
| `checkInterval` | `number` | `5000` | Integrity check interval in milliseconds (0 = disable periodic checks) |
| `onTamperDetected` | `(attempts: number) => void` | `undefined` | Callback function when tampering is detected. Receives attempt count |
| `expiresAt` | `Date \| undefined` | `undefined` | Token expiration date. After this date, token is invalid |
| `hashAlgorithm` | `'sha256' \| 'sha512'` | `'sha256'` | Hashing algorithm for token validation (sha512 = more secure) |
| `debug` | `boolean` | `false` | Enable debug logging to console (useful during development) |
| `contact` | `string` | `"the developer"` | Contact info shown in console warnings |
| `customMessage` | `string \| undefined` | `undefined` | Custom message displayed in console instead of default |
| `ariaLabel` | `string` | `"Draft watermark overlay"` | Accessibility label for screen readers |
| `respectReducedMotion` | `boolean` | `true` | Disable animations when user prefers reduced motion |

---

## 🎨 Advanced Customization

### Subtle Watermark for Client Presentations

Perfect for showing work to clients without being too intrusive:

```tsx
<FreelanceShield 
  validToken="secret-preview-key"
  text="CONFIDENTIAL PREVIEW"
  watermarkStyle="subtle"
  opacity={0.05}
  position="diagonal"
  respectReducedMotion={true}
/>
```

### Aggressive Protection for High-Risk Clients

Maximum visibility for clients with payment history issues:

```tsx
<FreelanceShield 
  validToken="high-security-token"
  text="⚠️ UNAUTHORIZED USE PROHIBITED ⚠️"
  watermarkStyle="aggressive"
  opacity={0.3}
  checkInterval={2000}
  onTamperDetected={(attempts) => {
    console.error(`Security Alert: ${attempts} tampering attempts detected`);
    
    // Send to your analytics
    analytics.track('watermark_tamper_attempt', {
      attempts,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });
    
    // Optional: Send to your backend
    fetch('/api/security/tamper-alert', {
      method: 'POST',
      body: JSON.stringify({ attempts }),
    });
  }}
/>
```

### Time-Limited Client Access

Give clients a review window with automatic expiration:

```tsx
const reviewDeadline = new Date();
reviewDeadline.setDate(reviewDeadline.getDate() + 7); // 7 days from now

<FreelanceShield 
  validToken="client-review-token-2024"
  token={urlToken}
  text="CLIENT REVIEW - EXPIRES IN 7 DAYS"
  expiresAt={reviewDeadline}
  onTamperDetected={(attempts) => {
    if (attempts > 3) {
      // Alert you after multiple attempts
      sendSlackNotification('Client attempting to bypass watermark');
    }
  }}
/>
```

### Multi-Environment Setup

Different watermarks for different environments:

```tsx
const getWatermarkConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      text: 'PRODUCTION - UNPAID',
      opacity: 0.2,
      watermarkStyle: 'aggressive' as const,
    };
  }
  
  if (process.env.VERCEL_ENV === 'preview') {
    return {
      text: 'PREVIEW BUILD',
      opacity: 0.1,
      watermarkStyle: 'subtle' as const,
    };
  }
  
  return {
    text: 'DEVELOPMENT',
    opacity: 0.05,
    watermarkStyle: 'default' as const,
  };
};

<FreelanceShield 
  validToken={process.env.NEXT_PUBLIC_SHIELD_TOKEN!}
  {...getWatermarkConfig()}
/>
```

### Dynamic Token from Database

For SaaS applications with user subscriptions:

```tsx
import { useUser } from '@/hooks/useUser';

function App() {
  const { user } = useUser();
  
  // User has active subscription = no watermark
  const hasActiveSubscription = user?.subscription?.status === 'active';
  
  return (
    <>
      <FreelanceShield 
        validToken={hasActiveSubscription ? user.subscriptionToken : 'no-valid-token'}
        text={hasActiveSubscription ? '' : 'UPGRADE TO REMOVE WATERMARK'}
        opacity={0.08}
      />
      <YourApp />
    </>
  );
}
```

---

## 🔐 Security Deep Dive

### Token Security Best Practices

#### 1. Generate Cryptographically Secure Tokens

```bash
# Node.js (recommended)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Python
python -c "import secrets; print(secrets.token_hex(32))"
```

**Output example:** `a3f5c8e9d2b1f4a6c7e8d9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0`

#### 2. Environment Variable Setup

```bash
# .env.local (Next.js)
NEXT_PUBLIC_SHIELD_TOKEN=a3f5c8e9d2b1f4a6c7e8d9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0

# .env (Vite)
VITE_SHIELD_TOKEN=a3f5c8e9d2b1f4a6c7e8d9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0

# .env (CRA)
REACT_APP_SHIELD_TOKEN=a3f5c8e9d2b1f4a6c7e8d9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0
```

**Important:** Add `.env.local` to `.gitignore`!

#### 3. Token Rotation Strategy

```tsx
// Rotate tokens per client/project
const CLIENT_TOKENS = {
  'client-abc': process.env.NEXT_PUBLIC_TOKEN_CLIENT_ABC,
  'client-xyz': process.env.NEXT_PUBLIC_TOKEN_CLIENT_XYZ,
};

<FreelanceShield 
  validToken={CLIENT_TOKENS[currentClient]}
  text={`DRAFT FOR ${currentClient.toUpperCase()}`}
/>
```

#### 4. Time-Based Token Expiration

```tsx
// Token expires after 14 days
const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 14);

<FreelanceShield 
  validToken="temp-review-token"
  expiresAt={expirationDate}
  text="14-DAY REVIEW PERIOD"
  customMessage="This preview expires on " + expirationDate.toLocaleDateString()
/>
```

### What This Package Protects Against

✅ **Casual Tampering** - Non-technical users can't easily remove it  
✅ **CSS Manipulation** - Shadow DOM prevents `display: none` hacks  
✅ **DevTools Deletion** - Integrity monitoring detects removal  
✅ **Source Code Inspection** - SHA-256/512 hashing hides plain-text tokens  
✅ **URL Parameter Guessing** - Cryptographically random tokens are unguessable  

### What This Package Does NOT Protect Against

❌ **Determined Hackers** - Client-side code can always be bypassed  
❌ **JavaScript Disabled** - Watermark won't render without JS  
❌ **Screenshots/Screen Recording** - Users can capture the display  
❌ **Server-Side Rendering** - Protection is client-side only  
❌ **Browser Extensions** - Extensions can modify page behavior  
❌ **Legal Enforcement** - This is not a substitute for contracts  

### Realistic Expectations

This package is designed as a **professional deterrent**, not foolproof DRM:

- ✅ **Protects against:** Casual users, non-technical clients, accidental misuse
- ❌ **Does not protect against:** Sophisticated attacks, determined bad actors
- 🎯 **Best used with:** Proper contracts, clear payment terms, professional relationships

---

## 🎯 Real-World Use Cases

### 1. Freelance Web Development

**Scenario:** You've built a custom e-commerce site for a client who wants to "test it first"

```tsx
<FreelanceShield 
  validToken={process.env.NEXT_PUBLIC_PAYMENT_TOKEN}
  text="PENDING FINAL PAYMENT - INVOICE #2024-001"
  contact="payments@yourfreelance.com"
  opacity={0.15}
  onTamperDetected={(attempts) => {
    // Log to your CRM
    logToHubspot('Client attempted to bypass watermark', {
      clientId: currentClient.id,
      attempts,
    });
  }}
/>
```

**Workflow:**
1. ✅ Deploy to `staging.clientsite.com` with watermark
2. ✅ Client reviews and requests changes
3. ✅ Make revisions, client approves
4. ✅ Receive final payment
5. ✅ Deploy to `www.clientsite.com` without watermark OR provide bypass token

### 2. Student Portfolio / Capstone Projects

**Scenario:** CS student showcasing a SaaS demo to recruiters

```tsx
<FreelanceShield 
  validToken={process.env.NEXT_PUBLIC_DEMO_KEY}
  token={searchParams?.access}
  text="DEMO VERSION - NOT FOR PRODUCTION"
  contact="hire-me@student.edu"
  watermarkStyle="subtle"
  opacity={0.08}
  debug={process.env.NODE_ENV === 'development'}
/>
```

**Share with recruiters:**
```
🔗 Demo: https://my-saas-demo.vercel.app?access=demo-key-2024
📧 Contact: hire-me@student.edu
```

### 3. Design Agency Client Previews

**Scenario:** Agency showing website mockups before final approval

```tsx
const REVIEW_DEADLINE = new Date('2026-02-15');

<FreelanceShield 
  validToken={process.env.NEXT_PUBLIC_CLIENT_TOKEN}
  text="CONFIDENTIAL CLIENT PREVIEW"
  watermarkStyle="subtle"
  opacity={0.06}
  expiresAt={REVIEW_DEADLINE}
  customMessage={`Preview access expires ${REVIEW_DEADLINE.toLocaleDateString()}`}
/>
```

### 4. SaaS Free Trial / Freemium Model

**Scenario:** Offering feature-limited trials with upgrade prompts

```tsx
import { useSubscription } from '@/hooks/useSubscription';

function App() {
  const { isPaid, subscriptionToken } = useSubscription();
  
  return (
    <>
      <FreelanceShield 
        validToken={isPaid ? subscriptionToken : 'invalid-token'}
        text={isPaid ? '' : '🚀 UPGRADE TO PRO TO REMOVE WATERMARK'}
        opacity={0.07}
      />
      <Dashboard />
    </>
  );
}
```

### 5. White-Label Products

**Scenario:** Selling white-label software with license validation

```tsx
<FreelanceShield 
  validToken={licenseKey}
  token={userProvidedLicense}
  text="UNLICENSED VERSION"
  hashAlgorithm="sha512" // Extra security
  enableIntegrityCheck={true}
  checkInterval={3000}
/>
```

---

## 🛠️ Troubleshooting

### Watermark Not Showing

**Problem:** Watermark doesn't appear on the page

**Solutions:**
1. Check that `validToken` and `token` don't match
2. Ensure component is rendered (check React DevTools)
3. Enable debug mode: `debug={true}`
4. Check browser console for errors

```tsx
<FreelanceShield 
  validToken="test-token"
  debug={true} // Enable debug logging
/>
```

### Token Not Working

**Problem:** Providing the correct token doesn't remove watermark

**Solutions:**
1. Verify token is passed correctly from URL/props
2. Check for whitespace in token strings
3. Ensure environment variable is loaded
4. Try logging the tokens:

```tsx
const token = searchParams?.token;
console.log('Provided token:', token);
console.log('Valid token:', process.env.NEXT_PUBLIC_SHIELD_TOKEN);

<FreelanceShield 
  validToken={process.env.NEXT_PUBLIC_SHIELD_TOKEN!}
  token={token}
  debug={true}
/>
```

### TypeScript Errors

**Problem:** TypeScript complains about missing types

**Solution:** Ensure you're importing types correctly:

```tsx
import { FreelanceShield, type FreelanceShieldProps } from 'react-freelance-shield';

// For custom wrappers
const MyShield: React.FC<Partial<FreelanceShieldProps>> = (props) => {
  return <FreelanceShield validToken="default" {...props} />;
};
```

### SSR/Hydration Issues

**Problem:** Hydration mismatch in Next.js

**Solution:** Ensure token is available during SSR:

```tsx
// ✅ Good - token from searchParams
export default function Layout({ searchParams }: { searchParams?: { token?: string } }) {
  return <FreelanceShield token={searchParams?.token} validToken="..." />;
}

// ❌ Bad - token from window (client-only)
const token = new URLSearchParams(window.location.search).get('token');
```

### Performance Issues

**Problem:** Page feels slow with watermark enabled

**Solutions:**
1. Increase `checkInterval` to reduce monitoring frequency
2. Disable integrity checks if not needed
3. Use `watermarkStyle="subtle"` for better performance

```tsx
<FreelanceShield 
  validToken="token"
  checkInterval={10000} // Check every 10s instead of 5s
  enableIntegrityCheck={false} // Disable if not critical
/>
```

---

## ❓ FAQ

### Q: Can clients bypass this protection?

**A:** Yes, with enough technical knowledge. This is a **deterrent**, not foolproof DRM. It protects against casual tampering by non-technical users. Always use proper contracts as your primary protection.

### Q: Will this affect my SEO?

**A:** No. The watermark is rendered client-side and doesn't affect HTML content that search engines crawl.

### Q: Does this work with server-side rendering?

**A:** Yes, but the watermark only renders on the client. The component safely handles SSR environments.

### Q: How do I remove the watermark after payment?

**A:** Three options:
1. **Provide the token** to the client: `https://site.com?token=your-secret-token`
2. **Deploy a clean version** to production without FreelanceShield
3. **Use environment variables** to disable it in production

### Q: Can I use this in commercial projects?

**A:** Yes! The MIT license allows commercial use. No attribution required (but appreciated! ❤️).

### Q: What happens if someone disables JavaScript?

**A:** The watermark won't render. This package requires JavaScript. Consider server-side watermarking for critical protection.

### Q: How secure is the token hashing?

**A:** We use SHA-256 (or SHA-512) via the Web Crypto API. Tokens are hashed before comparison, so they're not stored in plain text. However, remember this is client-side code—determined attackers can always bypass it.

### Q: Can I customize the watermark appearance?

**A:** Currently, you can control text, opacity, and position. Custom styling via CSS is limited due to Shadow DOM encapsulation (which is intentional for security). Future versions may add more customization options.

### Q: Does this work on mobile devices?

**A:** Yes! The watermark is responsive and works on all screen sizes.

### Q: How do I test this locally?

**A:** Use the debug mode and try different tokens:

```tsx
<FreelanceShield 
  validToken="test-secret"
  token={urlToken}
  debug={true} // See validation logs in console
/>
```

Then test:
- `http://localhost:3000` → Watermark shows
- `http://localhost:3000?token=test-secret` → Watermark hidden

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Watch mode (for development)
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Your Implementation

```tsx
// Create a test component
import { FreelanceShield } from 'react-freelance-shield';
import { useState } from 'react';

export function TestShield() {
  const [token, setToken] = useState('');
  
  return (
    <div>
      <FreelanceShield 
        validToken="test-token-123"
        token={token}
        debug={true}
      />
      
      <div style={{ position: 'relative', zIndex: 9999, padding: '20px', background: 'white' }}>
        <h2>Test Controls</h2>
        <input 
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter token"
        />
        <button onClick={() => setToken('test-token-123')}>
          Use Valid Token
        </button>
        <button onClick={() => setToken('wrong-token')}>
          Use Invalid Token
        </button>
      </div>
    </div>
  );
}
```

---

## 🚀 Performance Tips

### 1. Optimize Check Interval

```tsx
// For low-risk clients
<FreelanceShield checkInterval={10000} /> // Check every 10s

// For high-risk clients
<FreelanceShield checkInterval={2000} /> // Check every 2s
```

### 2. Disable Integrity Checks When Not Needed

```tsx
// For trusted environments (e.g., demo mode)
<FreelanceShield enableIntegrityCheck={false} />
```

### 3. Use Subtle Watermarks for Better UX

```tsx
<FreelanceShield 
  watermarkStyle="subtle"
  opacity={0.05}
  respectReducedMotion={true}
/>
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/yourusername/react-freelance-shield
cd react-freelance-shield
npm install
npm run dev
```

---

## 📄 License

MIT © TAIJULAMAN

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Built with ❤️ for the freelance community. Inspired by the countless developers who've been ghosted by clients.

**Special thanks to:**
- The React team for an amazing framework
- The TypeScript team for type safety
- All freelancers fighting for fair payment

## 🌟 Show Your Support

If this package helped protect your work, please:

- ⭐ Star the repo on GitHub

**Made with 🛡️ by developers, for developers**
