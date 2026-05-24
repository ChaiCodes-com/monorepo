/**
 * defaultConfig.ts
 * Default configuration for @chaicodes/stripe-helpers
 */

interface SmtpConfig {
  host?: string;
  port?: number | string;
  secure?: boolean;
  user?: string;
  password?: string;
  from?: string;
}

interface PriceIds {
  monthly?: string;
  annual?: string;
}

interface AppConfig {
  appName: string;
  appUrl: string;
  supportEmail: string;
  accessCodePrefix: string;
  accessCodeLength: number;
  stripeSecretKey?: string;
  stripePublicKey?: string;
  stripeWebhookSecret?: string;
  priceIds: PriceIds;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  smtpConfig: SmtpConfig;
  successUrl?: string;
  cancelUrl?: string;
  emailTemplate?: string | null;
  brandColor: string;
  logoUrl: string;
}

export const DEFAULT_CONFIG: AppConfig = {
  // App info
  appName: 'ChAICodes App',
  appUrl: 'https://chaicodes.com',
  supportEmail: 'support@chaicodes.com',

  // Access codes
  accessCodePrefix: 'SUB',
  accessCodeLength: 20,

  // Stripe
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,

  // Price IDs (override per app)
  priceIds: {
    monthly: process.env.STRIPE_PRICE_ID_MONTHLY,
    annual: process.env.STRIPE_PRICE_ID_ANNUAL,
  },

  // Supabase
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,

  // SMTP Email
  smtpConfig: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE !== 'false',
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM || 'noreply@chaicodes.com',
  },

  // URLs
  successUrl: process.env.SUCCESS_URL,
  cancelUrl: process.env.CANCEL_URL,

  // Email templates
  emailTemplate: null, // Use default if null

  // Branding
  brandColor: '#C8102E',
  logoUrl: 'https://chaicodes.com/logo.png',
};

export function validateConfig(config: any): boolean {
  const requiredKeys = [
    'stripeSecretKey',
    'appName',
    'supportEmail',
  ];

  const missing = requiredKeys.filter(key => !config[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required config: ${missing.join(', ')}`);
  }

  return true;
}

export function mergeConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

export default {
  DEFAULT_CONFIG,
  validateConfig,
  mergeConfig,
};
