const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    // Map cart items to Stripe line_items format
    const lineItems = items.map((item) => {
      const unitAmount = Math.round(parseFloat(item.price) * 100);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.imageUrl ? [item.imageUrl] : [],
            description: item.category || 'Product',
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity || 1,
      };
    });

    // Calculate shipping cost on the server side
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1), 0);
    let shippingCost = 0;
    if (subtotal < 100) {
      let maxCost = 0;
      items.forEach(item => {
        const size = (item.shippingSize || 'small').toLowerCase();
        let cost = 5;
        if (size === 'medium') cost = 10;
        else if (size === 'large') cost = 20;
        else if (size === 'free') cost = 0;
        if (cost > maxCost) {
          maxCost = cost;
        }
      });
      shippingCost = maxCost;
    }
    const shippingAmountInCents = Math.round(shippingCost * 100);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'MX', 'GB'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingAmountInCents,
              currency: 'usd',
            },
            display_name: shippingCost === 0 ? 'Free Shipping' : 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            }
          }
        }
      ],
      success_url: `${req.headers.origin}/Cart.html?success=true`,
      cancel_url: `${req.headers.origin}/Cart.html?canceled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
