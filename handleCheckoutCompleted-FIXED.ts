/**
 * handleCheckoutCompleted.ts
 * Handles checkout.session.completed webhook event
 */

import { createAccessCode } from '../database/databaseUtilities.js';
import { sendAccessCodeEmail } from '../email/sendAccessCodeEmail.js';

interface CheckoutConfig {
  accessCodePrefix?: string;
  appName?: string;
  emailTemplate?: string | null;
  smtpConfig?: any;
  [key: string]: any;
}

interface CheckoutCompletedParams {
  event: any;
  supabaseClient: any;
  config?: CheckoutConfig;
}

interface CheckoutCompletedResponse {
  success: boolean;
  statusCode: number;
  accessCode?: string;
  email?: string;
  error?: string;
}

export async function handleCheckoutCompleted({
  event,
  supabaseClient,
  config = {},
}: CheckoutCompletedParams): Promise<CheckoutCompletedResponse> {
  const session = event.data.object;

  if (!session.customer_email) {
    console.error('No customer email found in session');
    return { success: false, statusCode: 400 };
  }

  try {
    const email = session.customer_email;
    const subscriptionId = session.subscription;

    // Generate access code
    const codePrefix = config.accessCodePrefix || 'SUB';
    const accessCode = `${codePrefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create access code in database
    const codeData = {
      code: accessCode,
      email: email,
      max_uses: 999999, // Unlimited for subscriptions
      current_uses: 0,
      is_active: true,
      is_subscription: true,
      subscription_id: subscriptionId,
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const accessCodeResult = await createAccessCode(supabaseClient, codeData);

    if (!accessCodeResult.success) {
      throw new Error('Failed to create access code');
    }

    // Send welcome email
    const emailTemplate = config.emailTemplate || getDefaultEmailTemplate(config);
    await sendAccessCodeEmail({
      email: email,
      accessCode: accessCode,
      appName: config.appName || 'ChAICodes App',
      emailTemplate: emailTemplate,
      smtpConfig: config.smtpConfig,
      expiresAt: codeData.expires_at,
    });

    console.log(`Access code created for ${email}: ${accessCode}`);

    return {
      success: true,
      statusCode: 200,
      accessCode: accessCode,
      email: email,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error handling checkout completion:', error);
    return {
      success: false,
      error: message,
      statusCode: 500,
    };
  }
}

function getDefaultEmailTemplate(config: CheckoutConfig): string {
  return `
    <h2>Welcome to ${config.appName || 'ChAICodes'}!</h2>
    <p>Thank you for your subscription. Your access code is:</p>
    <p><strong>${'{accessCode}'}</strong></p>
    <p>Use this code to log in to your account.</p>
    <p>Questions? Contact support@chaicodes.com</p>
  `;
}

export default handleCheckoutCompleted;
