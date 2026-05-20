# @chaicodes/legal-pages

Reusable React components for **About** and **Terms & Conditions** pages. Provides consistent ChAICodes branding across all applications with customizable app names and logos.

---

## Features

✅ **Consistent Branding** — Same ChAICodes styling and fonts across all apps  
✅ **Flexible Placement** — Full pages, footers, or modals  
✅ **Customizable Per App** — Change app name and logo  
✅ **Professional Design** — Matches ChAICodes aesthetic  
✅ **Complete T&Cs** — Includes refund policy with clear terms  
✅ **React Components** — Easy integration into any React app  
✅ **No Duplicated Code** — Single source of truth  

---

## Installation

```bash
npm install @chaicodes/legal-pages
```

**Note:** Requires React 16.0+ as a peer dependency.

---

## Components

### 1. **AboutPage** — Full-page About component

Full-page view showing ChAICodes mission, values, and features.

```jsx
import { AboutPage } from '@chaicodes/legal-pages';

function App() {
  return (
    <AboutPage 
      appName="Resolution Composer"
      appLogo="📋"
    />
  );
}
```

**Props:**
- `appName` (string, optional) — Name of your application
- `appLogo` (string, optional) — Emoji or icon for your app

**Use Cases:**
- Dedicated `/about` page
- Full-screen modal
- Sidebar component

---

### 2. **AboutFooter** — Compact About component

Compact footer-style About section with expandable details.

```jsx
import { AboutFooter } from '@chaicodes/legal-pages';

function Footer() {
  return (
    <AboutFooter 
      appName="AIWeekly"
      appLogo="📰"
      onLearnMore={() => console.log('Learn more clicked')}
    />
  );
}
```

**Props:**
- `appName` (string, optional) — Name of your application
- `appLogo` (string, optional) — Emoji or icon
- `onLearnMore` (function, optional) — Custom handler for "Learn More" button

**Use Cases:**
- Footer section
- Sidebar component
- Modal trigger
- Minimal space component

---

### 3. **TermsPage** — Full Terms & Conditions page

Complete Terms & Conditions page with refund policy.

```jsx
import { TermsPage } from '@chaicodes/legal-pages';

function TermsRoute() {
  return <TermsPage appName="Resolution Composer" />;
}
```

**Props:**
- `appName` (string, optional) — Name of your application (used in content)

**Use Cases:**
- Dedicated `/terms` page
- Scrollable modal
- Full-screen overlay

**Includes:**
- Account and access terms
- Concurrent session limits
- Subscription terms
- **Refund Policy** (24-hour grace period)
- Limitation of liability
- Privacy notice
- Governing law

---

### 4. **TermsModal** — Modal Terms & Conditions

Modal version of Terms & Conditions with close button.

```jsx
import { useState } from 'react';
import { TermsModal } from '@chaicodes/legal-pages';

function App() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <button onClick={() => setShowTerms(true)}>
        View Terms
      </button>

      <TermsModal
        appName="AIWeekly"
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </>
  );
}
```

**Props:**
- `appName` (string, optional) — Name of your application
- `isOpen` (boolean, default: true) — Controls modal visibility
- `onClose` (function) — Called when user closes the modal

**Use Cases:**
- Popup modal on signup
- Terms confirmation dialog
- Info modal

---

## Refund Policy Details

### Subscription Refunds

**24-Hour Grace Period:**
- If you cancel within 24 hours of purchase
- AND have not used the service
- You are eligible for a **full refund**
- Applies to both monthly and annual subscriptions

**After Grace Period:**
- Once 24 hours pass or service is used
- **NO refunds** are issued for subscription fees
- You can cancel to prevent future charges

### Token Refunds

**Refundable:**
- Tokens purchased due to **accidental duplicate charges**
- Tokens purchased due to **documented system errors**
- Contact support@chaicodes.com with proof

**Non-Refundable:**
- Tokens that have been **used or spent**
- **Unused tokens** purchased intentionally
- Chargebacks initiated without contacting support

---

## Branding & Customization

### Consistent ChAICodes Branding

Every component includes:
- **Color scheme:** Red (#C8102E), dark backgrounds, light text
- **Typography:** Playfair Display (headings), Lora (body), Cormorant Garamond (labels)
- **Styling:** Professional, minimal, elegant
- **Logo:** ChAI Codes ⚙️ symbol
- **Support Email:** support@chaicodes.com (always)

### Per-App Customization

Customize for your specific app:

```jsx
// Resolution Composer
<AboutPage appName="Resolution Composer" appLogo="📋" />

// AIWeekly
<AboutPage appName="AIWeekly" appLogo="📰" />

// Your Future App
<AboutPage appName="MyApp" appLogo="✨" />
```

Everything else (colors, fonts, support email, legal terms) stays the same.

---

## Usage Examples

### Example 1: Full About Page

```jsx
import { AboutPage } from '@chaicodes/legal-pages';

export function AboutRoute() {
  return (
    <AboutPage 
      appName="Resolution Composer"
      appLogo="📋"
    />
  );
}
```

### Example 2: About Footer in Footer Component

```jsx
import { AboutFooter } from '@chaicodes/legal-pages';

export function Footer() {
  return (
    <div>
      <p>© 2025 My Company</p>
      <AboutFooter appName="MyApp" appLogo="✨" />
    </div>
  );
}
```

### Example 3: Terms Modal on Signup

```jsx
import { useState } from 'react';
import { TermsModal } from '@chaicodes/legal-pages';

export function SignupForm() {
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <form>
      <input type="email" placeholder="Email" required />

      <div>
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
        <label>
          I agree to the{' '}
          <button 
            type="button"
            onClick={() => setShowTerms(true)}
            style={{ background: 'none', border: 'none', color: '#C8102E', cursor: 'pointer' }}
          >
            Terms & Conditions
          </button>
        </label>
      </div>

      <button type="submit" disabled={!acceptedTerms}>
        Sign Up
      </button>

      <TermsModal
        appName="MyApp"
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </form>
  );
}
```

### Example 4: Terms Page Route

```jsx
import { TermsPage } from '@chaicodes/legal-pages';

export function TermsRoute() {
  return <TermsPage appName="AIWeekly" />;
}
```

---

## Integration Checklist

- [ ] Install package: `npm install @chaicodes/legal-pages`
- [ ] Import components in your app
- [ ] Add `/about` route with `AboutPage`
- [ ] Add `/terms` route with `TermsPage`
- [ ] Add About footer to footer component
- [ ] Add Terms modal to signup form (if needed)
- [ ] Customize `appName` and `appLogo` per app
- [ ] Test all components in your app

---

## Styling

All components use **inline CSS-in-JS styles** and include Google Fonts imports. No external CSS files needed.

### Colors Used
```
Primary Red:      #C8102E
Secondary Gray:   #91A3B0
Dark Background:  #1a1214
Light Text:       #e8e0dc
Success Green:    #5dcc6a
Warning Red:      #e03050
```

### Fonts
- **Headings:** Playfair Display (Google Fonts)
- **Body Text:** Lora (Google Fonts)
- **Labels:** Cormorant Garamond (Google Fonts)

---

## API Reference

### AboutPage

```jsx
<AboutPage 
  appName?: string        // Your app name (optional)
  appLogo?: string        // Emoji or icon (optional)
/>
```

---

### AboutFooter

```jsx
<AboutFooter 
  appName?: string                    // Your app name (optional)
  appLogo?: string                    // Emoji or icon (optional)
  onLearnMore?: () => void            // Custom click handler (optional)
/>
```

---

### TermsPage

```jsx
<TermsPage 
  appName?: string        // Your app name (optional, used in content)
/>
```

---

### TermsModal

```jsx
<TermsModal 
  appName?: string        // Your app name (optional)
  isOpen?: boolean        // Controls visibility (default: true)
  onClose?: () => void    // Called when closed (required)
/>
```

---

## Branding Configuration

Access ChAICodes branding config:

```jsx
import { CHAICODES_BRANDING } from '@chaicodes/legal-pages';

console.log(CHAICODES_BRANDING.colors.primary);    // #C8102E
console.log(CHAICODES_BRANDING.supportEmail);      // support@chaicodes.com
console.log(CHAICODES_BRANDING.website);           // https://chaicodes.com
```

---

## When to Use Each Component

| Use Case | Component |
|----------|-----------|
| Dedicated about page | `<AboutPage />` |
| About in footer/sidebar | `<AboutFooter />` |
| Dedicated terms page | `<TermsPage />` |
| Terms in modal/popup | `<TermsModal />` |
| Multiple placements | Mix and match! |

---

## Customization for New Apps

When building **AIWeekly** or another app:

```jsx
// Just change these two props
<AboutPage appName="AIWeekly" appLogo="📰" />
<AboutFooter appName="AIWeekly" appLogo="📰" />
<TermsPage appName="AIWeekly" />
<TermsModal appName="AIWeekly" isOpen={showTerms} onClose={...} />

// Everything else is consistent across all apps ✓
```

---

## Refund Policy Reference

**For your records:**

```
SUBSCRIPTION GRACE PERIOD:
- 24 hours from purchase
- Only if service not used
- Applies to monthly and annual
- Full refund issued

TOKEN REFUNDS:
- Accidental duplicate purchases: YES
- System errors: YES
- Unused tokens intentionally purchased: NO
- Used/spent tokens: NO
```

---

## Migration Path

### From Old Code (Duplicated)

```jsx
// Before: T&Cs hard-coded in every app
const termsHTML = `<div>...</div>`;
const aboutText = "We are ChAI Codes...";
```

### To Package (Shared)

```jsx
// After: Import once, use everywhere
import { TermsPage, AboutPage } from '@chaicodes/legal-pages';

<TermsPage appName="MyApp" />
<AboutPage appName="MyApp" appLogo="🎯" />
```

---

## Support

**Questions?** Contact support@chaicodes.com

---

## Version History

### v1.0.0
- Initial release
- AboutPage, AboutFooter components
- TermsPage, TermsModal components
- Refund policy with 24-hour grace period
- ChAICodes branding

---

## License

MIT © ChAI Wang

---

## Summary

You now have **reusable About and Terms components** that:
- ✅ Keep **consistent branding** across all apps
- ✅ **Eliminate duplicated** legal content
- ✅ **Customize easily** per app (name/logo only)
- ✅ **Include complete refund policy** with clear terms
- ✅ **Work in any location** (pages, footers, modals)
- ✅ **No setup required** — just import and use

Next: Integrate into Resolution Generator and AIWeekly! 🚀
