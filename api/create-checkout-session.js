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

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'MX', 'GB'],
      },
      success_url: `${req.headers.origin}/Cart.html?success=true`,
      cancel_url: `${req.headers.origin}/Cart.html?canceled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
