/**
 * @chaicodes/stripe-helpers
 * Main package exports
 */

// Checkout functions
export { createCheckoutSession } from './checkout/createCheckoutSession.js';
export { handlePriceSwitching } from './checkout/handlePriceSwitching.js';

// Webhook functions
export { handleStripeWebhook } from './webhooks/handleStripeWebhook.js';
export { handleCheckoutCompleted } from './webhooks/handleCheckoutCompleted.js';
export { handleSubscriptionUpdated, handleSubscriptionDeleted } from './webhooks/subscriptionHandlers.js';

// Email functions
export { sendAccessCodeEmail } from './email/sendAccessCodeEmail.js';
export { getDefaultEmailTemplate, buildCustomEmailTemplate } from './email/emailTemplates.js';

// Database utilities
export {
  createAccessCode,
  getAccessCodeByCode,
  updateAccessCodeStatus,
  incrementAccessCodeUses,
  createSession,
  validateSession,
  deleteSession,
  cleanupExpiredSessions,
} from './database/databaseUtilities.js';

// Utility functions
export {
  generateAccessCode,
  calculateExpiryDate,
  getDaysRemaining,
} from './utils/utilityFunctions.js';

// Configuration
export { DEFAULT_CONFIG, validateConfig } from './config/defaultConfig.js';

export default {
  createCheckoutSession: require('./checkout/createCheckoutSession.js').default,
  handleStripeWebhook: require('./webhooks/handleStripeWebhook.js').default,
};
