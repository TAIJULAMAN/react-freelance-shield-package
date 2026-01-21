# Next.js Example - FreelanceShield

This example demonstrates how to integrate `react-freelance-shield` in a Next.js 14+ App Router application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
NEXT_PUBLIC_SHIELD_TOKEN=demo-secret-token
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Testing

### Without Token
Visit `http://localhost:3000` - you should see the watermark

### With Valid Token
Visit `http://localhost:3000?token=demo-secret-token` - watermark should disappear

### With Invalid Token
Visit `http://localhost:3000?token=wrong-token` - watermark should still appear

## Implementation

See `app/layout.tsx` for the FreelanceShield integration:

```tsx
<FreelanceShield 
  validToken={process.env.NEXT_PUBLIC_SHIELD_TOKEN}
  token={searchParams?.token}
  text="UNPAID DRAFT"
  contact="pay-me@freelancer.com"
  debug={process.env.NODE_ENV === 'development'}
/>
```

## Production Deployment

For production, generate a secure token:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then set it in your deployment environment variables.
