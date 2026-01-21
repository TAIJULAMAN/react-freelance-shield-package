# Security Policy

## What This Package Protects

React Freelance Shield is designed as a **deterrent** against casual tampering, not as true Digital Rights Management (DRM). It provides:

✅ **Protection against casual users** who might try to hide the watermark via browser DevTools  
✅ **Visual indicator** that the work is unpaid/draft/trial version  
✅ **Tamper detection** with console warnings and optional callbacks  
✅ **Token-based bypass** for legitimate access

## What This Package Does NOT Protect

❌ **Sophisticated attacks** - Any client-side JavaScript can be bypassed by determined users  
❌ **JavaScript disabled** - The watermark won't render if JavaScript is disabled  
❌ **Screenshots/Screen recording** - Users can still capture the visual output  
❌ **Server-side rendering** - Protection only works client-side  
❌ **Browser extensions** - Extensions can modify page behavior  

## Security Best Practices

### 1. Token Management

**DO:**
- ✅ Use environment variables for tokens
- ✅ Generate cryptographically random tokens
- ✅ Use different tokens for different clients/projects
- ✅ Set expiration dates for time-limited access

**DON'T:**
- ❌ Hardcode tokens in source code
- ❌ Use predictable tokens (e.g., "password123")
- ❌ Reuse the same token across all projects
- ❌ Share tokens publicly

**Generate secure tokens:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32
```

### 2. Environment Variables

Store tokens securely in environment variables:

```bash
# .env.local (Next.js)
NEXT_PUBLIC_SHIELD_TOKEN=your-random-secure-token-here

# .env (Vite)
VITE_SHIELD_TOKEN=your-random-secure-token-here
```

**Important:** Never commit `.env` files to version control!

### 3. Token Expiration

Always set expiration dates for client previews:

```tsx
<FreelanceShield 
  validToken="secret"
  expiresAt={new Date('2026-02-01')} // Expires after review period
/>
```

### 4. Monitoring

Track tampering attempts for security awareness:

```tsx
<FreelanceShield 
  validToken="secret"
  onTamperDetected={(attempts) => {
    // Log to your analytics service
    analytics.track('watermark_tamper_attempt', {
      attempts,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });
  }}
/>
```

## Realistic Expectations

This package is designed for **professional workflows** where:

1. You have a contract with clear payment terms
2. You need a visual indicator that work is unpaid
3. You want to deter casual tampering
4. You understand this is not foolproof protection

**This is NOT:**
- A replacement for proper contracts
- A way to prevent all unauthorized use
- True DRM or copy protection
- A legal enforcement mechanism

## Recommended Workflow

1. **Contract First** - Always have a signed contract before starting work
2. **Staging with Watermark** - Deploy to staging with FreelanceShield enabled
3. **Client Review** - Client reviews and approves the work
4. **Payment** - Receive payment according to contract terms
5. **Production Deploy** - Deploy clean version to production OR provide bypass token

## Reporting Vulnerabilities

If you discover a security vulnerability in this package, please report it responsibly:

1. **DO NOT** open a public GitHub issue
2. Email: security@example.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Legal Disclaimer

This package is provided "as is" without warranty of any kind. The authors are not responsible for:

- Unauthorized use of your work
- Bypass of the watermark system
- Any damages resulting from use of this package

Always consult with a lawyer for proper legal protection of your intellectual property.

## Additional Resources

- [OWASP Client-Side Security](https://owasp.org/www-project-web-security-testing-guide/)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Freelance Contract Templates](https://www.docracy.com/doc/search?query=freelance)

---

**Remember:** Technology is only one part of protecting your work. Proper contracts, clear communication, and professional relationships are equally important.
