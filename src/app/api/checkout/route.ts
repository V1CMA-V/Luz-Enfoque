import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export async function POST(request: Request) {
  const body = await request.json()


  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/success',
    line_items: [
      {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: body.title,
            description: `${body.description} para el dia ${body.reserv_date}`,
            images: [body.image],
          },
          unit_amount: body.price * 100, // Precio en centavos (100.00 mxn)
        },
        quantity: 1, // Cantidad del producto
      },
    ],
    mode: 'payment',
  })

  return NextResponse.json(session)
}
