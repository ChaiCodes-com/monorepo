/**
 * @chaicodes/stripe-helpers
 * Stripe integration utilities for ChAICodes applications
 */

// Checkout
export { createCheckoutSession } from './checkout/createCheckoutSession';
export { handlePriceSwitching } from './checkout/handlePriceSwitching';

// Database
export {
  createAccessCode,
  getAccessCodeByCode,
  updateAccessCodeStatus,
  incrementAccessCodeUses,
  createSession,
  validateSession,
  deleteSession,
  cleanupExpiredSessions,
} from './database/databaseUtilities';

// Email
export { getDefaultEmailTemplate, buildCustomEmailTemplate } from './email/emailTemplates';
export { sendAccessCodeEmail } from './email/sendAccessCodeEmail';

// Utilities
export {
  generateAccessCode,
  calculateExpiryDate,
  getDaysRemaining,
  formatPrice,
  validateEmail,
  validateAccessCode,
} from './utils/utilityFunctions';

// Webhooks
export { handleCheckoutCompleted } from './webhooks/handleCheckoutCompleted';
export { handleStripeWebhook } from './webhooks/handleStripeWebhook';
export { handleSubscriptionUpdated, handleSubscriptionDeleted } from './webhooks/subscriptionHandlers';

// Config
export { DEFAULT_CONFIG, validateConfig, mergeConfig } from './config/defaultConfig';
