/**
 * utilityFunctions.ts
 * Helper utility functions for stripe-helpers
 */

export function generateAccessCode(email: string, prefix: string = 'SUB'): string {
  if (!email) {
    throw new Error('Email is required to generate access code');
  }

  // Extract domain from email
  const emailParts = email.split('@');
  const namePart = emailParts[0].split('.')[0].toUpperCase();

  // Generate random suffix
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Format: PREFIX-NAME-RANDOM
  return `${prefix}-${namePart}-${randomPart}`;
}

export function calculateExpiryDate(billingPeriod: string = 'annual'): string {
  const now = new Date();
  let expiresAt: Date;

  if (billingPeriod === 'monthly') {
    expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  } else if (billingPeriod === 'annual') {
    expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
  } else {
    throw new Error('Invalid billing period. Use "monthly" or "annual"');
  }

  return expiresAt.toISOString();
}

export function getDaysRemaining(expiresAt: string | null): number | null {
  if (!expiresAt) {
    return null;
  }

  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
}

export function formatPrice(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateAccessCode(code: string): boolean {
  // Access codes should be in format: PREFIX-NAME-RANDOM
  return /^[A-Z]+-[A-Z0-9]+-[A-Z0-9]+$/.test(code);
}

export default {
  generateAccessCode,
  calculateExpiryDate,
  getDaysRemaining,
  formatPrice,
  validateEmail,
  validateAccessCode,
};
