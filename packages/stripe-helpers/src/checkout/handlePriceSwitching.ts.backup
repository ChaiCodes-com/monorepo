/**
 * handlePriceSwitching.js
 * Handles subscription price changes (monthly to annual or vice versa)
 */

export async function handlePriceSwitching({
  stripe,
  subscriptionId,
  newPriceId,
  billingPeriod = 'annual',
  proRate = true,
}) {
  if (!stripe) {
    throw new Error('Stripe client is required');
  }

  if (!subscriptionId) {
    throw new Error('Subscription ID is required');
  }

  if (!newPriceId) {
    throw new Error('New price ID is required');
  }

  try {
    // Get current subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Get current item
    const currentItem = subscription.items.data[0];

    if (!currentItem) {
      throw new Error('No items found in subscription');
    }

    // Update subscription with new price
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: currentItem.id,
          price: newPriceId,
        },
      ],
      proration_behavior: proRate ? 'create_prorations' : 'none',
      metadata: {
        billingPeriod: billingPeriod,
        changedAt: new Date().toISOString(),
      },
    });

    return {
      success: true,
      subscription: updatedSubscription,
      message: `Subscription updated to ${billingPeriod} billing`,
    };
  } catch (error) {
    console.error('Error switching subscription price:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default handlePriceSwitching;
