/**
 * handleStripeWebhook.js
 * Main webhook handler that routes to appropriate handlers
 */

import { handleCheckoutCompleted } from './handleCheckoutCompleted.js';
import { handleSubscriptionUpdated, handleSubscriptionDeleted } from './subscriptionHandlers.js';

export async function handleStripeWebhook({
  body,
  signature,
  stripeSecretKey,
  supabaseClient,
  config = {},
}) {
  const stripe = require('stripe')(stripeSecretKey);

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      success: false,
      error: 'Invalid signature',
      statusCode: 400,
    };
  }

  try {
    // Route to appropriate handler based on event type
    switch (event.type) {
      case 'checkout.session.completed':
        return await handleCheckoutCompleted({
          event,
          supabaseClient,
          config,
        });

      case 'customer.subscription.updated':
        return await handleSubscriptionUpdated({
          event,
          supabaseClient,
          config,
        });

      case 'customer.subscription.deleted':
        return await handleSubscriptionDeleted({
          event,
          supabaseClient,
          config,
        });

      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id);
        return { success: true, statusCode: 200 };

      case 'payment_intent.payment_failed':
        console.error('Payment failed:', event.data.object.id);
        return { success: true, statusCode: 200 };

      default:
        console.log('Unhandled event type:', event.type);
        return { success: true, statusCode: 200 };
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return {
      success: false,
      error: error.message,
      statusCode: 500,
    };
  }
}

export default handleStripeWebhook;
