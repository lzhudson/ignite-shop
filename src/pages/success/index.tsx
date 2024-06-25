import Link from 'next/link'
import { ImageContainer, SuccessContainer, ImageContainerList } from '../../styles/pages/success'
import { GetServerSideProps } from 'next'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import Head from 'next/head'

interface SuccessProps {
  customerName: string
  products: {
    name: String
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  console.log(products)
  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>

        <h1>Compra efetuada</h1>
        <ImageContainerList>
          {products.map(product => {
            return (
              <ImageContainer>
                <Image src={product.imageUrl} width={110} height={110} alt="" />
              </ImageContainer>

            )
          })}
        </ImageContainerList>

        <p>
          Uhuul <strong>{customerName}</strong>, seu pedido{' '}já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name

  const products = session.line_items.data.map(product => {
    const productObject = product.price.product as Stripe.Product;

    return {
      name: productObject.name,
      imageUrl: productObject.images[0]
    }

  })


  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      products,
    },
  }
}
