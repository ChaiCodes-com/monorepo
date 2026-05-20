/**
 * createCheckoutSession.js
 * Creates a Stripe checkout session for subscriptions or one-time purchases
 */

export async function createCheckoutSession({
  stripe,
  email,
  billingPeriod = 'annual', // 'monthly' or 'annual'
  priceIds = {},
  appConfig = {},
  successUrl = '',
  cancelUrl = '',
}) {
  if (!stripe) {
    throw new Error('Stripe client is required');
  }

  if (!email) {
    throw new Error('Email is required');
  }

  if (!priceIds[billingPeriod]) {
    throw new Error(`Price ID for billing period "${billingPeriod}" not found`);
  }

  const priceId = priceIds[billingPeriod];

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${appConfig.appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${appConfig.appUrl}/cancel`,
      metadata: {
        appName: appConfig.appName || 'ChAICodes App',
        billingPeriod: billingPeriod,
        email: email,
      },
    });

    return {
      success: true,
      sessionId: session.id,
      url: session.url,
      session: session,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default createCheckoutSession;
