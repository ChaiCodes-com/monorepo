# @chaicodes/stripe-helpers

Reusable Stripe payment and subscription utilities for ChAICodes applications.

## Features

✅ **Monthly + Annual Subscriptions** — Flexible billing periods  
✅ **Access Code Generation** — Automatic per-user access codes  
✅ **Webhook Handling** — Auto-routes Stripe events  
✅ **Session Management** — Max 2 concurrent sessions per code  
✅ **Email Integration** — Sends access codes via SMTP  
✅ **Supabase Integration** — Full database abstraction  
✅ **Price Switching** — Change billing periods with proration  
✅ **Token Support** — Limited-use codes for paid tokens  

## Installation

```bash
npm install @chaicodes/stripe-helpers
```

## Quick Start

```javascript
import {
  createCheckoutSession,
  handleStripeWebhook,
  sendAccessCodeEmail,
} from '@chaicodes/stripe-helpers';

// Create checkout session
const session = await createCheckoutSession({
  stripe: stripeClient,
  email: 'user@example.com',
  billingPeriod: 'annual',
  priceIds: {
    monthly: 'price_xxx',
    annual: 'price_yyy',
  },
  appConfig: { appName: 'MyApp', appUrl: 'https://myapp.com' },
});

// Handle webhook
const result = await handleStripeWebhook({
  body: request.body,
  signature: request.headers['stripe-signature'],
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  supabaseClient: supabase,
  config: appConfig,
});
```

## Configuration

Required environment variables:

```
STRIPE_SECRET_KEY
STRIPE_PUBLIC_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ID_MONTHLY
STRIPE_PRICE_ID_ANNUAL
SUPABASE_URL
SUPABASE_ANON_KEY
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
```

## Supabase Schema

Create these tables:

```sql
-- Access codes table
CREATE TABLE access_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP DEFAULT NOW(),
  code VARCHAR(50) UNIQUE NOT NULL,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_subscription BOOLEAN DEFAULT FALSE,
  email VARCHAR(255),
  subscription_id VARCHAR(255),
  expires_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  access_code VARCHAR(50) REFERENCES access_codes(code),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API Reference

### createCheckoutSession(options)

Creates a Stripe checkout session for subscriptions.

**Options:**
- `stripe` — Stripe client instance
- `email` — Customer email
- `billingPeriod` — 'monthly' or 'annual'
- `priceIds` — Object with monthly/annual price IDs
- `appConfig` — App-specific configuration
- `successUrl` — Redirect URL on success
- `cancelUrl` — Redirect URL on cancel

### handleStripeWebhook(options)

Handles all Stripe webhook events.

**Options:**
- `body` — Raw request body
- `signature` — Stripe-Signature header
- `stripeSecretKey` — Your Stripe secret key
- `supabaseClient` — Initialized Supabase client
- `config` — Configuration object

**Handles:**
- `checkout.session.completed` — Creates access code
- `customer.subscription.updated` — Updates access status
- `customer.subscription.deleted` — Revokes access

### sendAccessCodeEmail(options)

Sends access code via email.

**Options:**
- `email` — Recipient email
- `accessCode` — Access code to send
- `appName` — Application name
- `emailTemplate` — HTML template
- `smtpConfig` — SMTP configuration
- `expiresAt` — Expiration date

### Database Functions

- `createAccessCode(supabaseClient, codeData)`
- `getAccessCodeByCode(supabaseClient, code)`
- `updateAccessCodeStatus(supabaseClient, updates)`
- `createSession(supabaseClient, {access_code, session_id})`
- `validateSession(supabaseClient, accessCode, sessionId)`

### Utility Functions

- `generateAccessCode(email, prefix)` — Generate formatted code
- `calculateExpiryDate(billingPeriod)` — Get expiry date
- `getDaysRemaining(expiresAt)` — Calculate days left

## License

MIT © ChAI Wang
