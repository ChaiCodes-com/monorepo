/**
 * subscriptionHandlers.ts
 * Handles subscription.updated and subscription.deleted webhook events
 */

import { updateAccessCodeStatus } from '../database/databaseUtilities.js';

interface SubscriptionHandlerParams {
  event: any;
  supabaseClient: any;
  config?: Record<string, any>;
}

interface SubscriptionHandlerResponse {
  success: boolean;
  statusCode: number;
  subscription?: string;
  status?: string;
  error?: string;
  message?: string;
}

export async function handleSubscriptionUpdated({
  event,
  supabaseClient,
}: SubscriptionHandlerParams): Promise<SubscriptionHandlerResponse> {
  const subscription = event.data.object;

  try {
    if (subscription.status === 'active') {
      console.log(`Subscription ${subscription.id} is active`);
      // Update access code to active
      await updateAccessCodeStatus(supabaseClient, {
        subscription_id: subscription.id,
        is_active: true,
      });
    } else if (subscription.status === 'past_due') {
      console.log(`Subscription ${subscription.id} is past due`);
      // Could send reminder email here
    }

    return {
      success: true,
      statusCode: 200,
      subscription: subscription.id,
      status: subscription.status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error handling subscription update:', error);
    return {
      success: false,
      error: message,
      statusCode: 500,
    };
  }
}

export async function handleSubscriptionDeleted({
  event,
  supabaseClient,
}: SubscriptionHandlerParams): Promise<SubscriptionHandlerResponse> {
  const subscription = event.data.object;

  try {
    // Deactivate access code when subscription is deleted
    await updateAccessCodeStatus(supabaseClient, {
      subscription_id: subscription.id,
      is_active: false,
    });

    console.log(`Subscription ${subscription.id} deleted, access code deactivated`);

    return {
      success: true,
      statusCode: 200,
      subscription: subscription.id,
      message: 'Subscription cancelled and access revoked',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error handling subscription deletion:', error);
    return {
      success: false,
      error: message,
      statusCode: 500,
    };
  }
}

export default {
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
};
