import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { products } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowd.',
    })
  }
  const hasPriceIdPropInCart = products.every(product => {
    const hasPriceId = 'priceId' in product;
    return hasPriceId
  })

  if (!hasPriceIdPropInCart) {
    return res.status(400).json({
      error: 'Price not found.',
    })
  }

  const cartFormatted = products.map(product => {
    return {
      price: product.priceId,
      quantity: product.quantity
    }
  })

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: cartFormatted
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
