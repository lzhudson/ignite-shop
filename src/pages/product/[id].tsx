import Image from 'next/image'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'
import Head from 'next/head'
import { useShoppingCart } from 'use-shopping-cart'
import { formatPriceToBrlCurrency } from '../../utils/format-price-to-brl-currency'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    currency: string
    description: string
    defaultPriceId: string
    sku: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { addItem } = useShoppingCart()

  const { isFallback } = useRouter()
  if (isFallback) {
    return <h1>Loading...</h1>
  }

  async function handleBuyProduct() {
    setIsCreatingCheckoutSession(true)
    try {
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })
      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade
      alert('Falha ao redirecionar ao checkout')
      setIsCreatingCheckoutSession(false)
    }
  }
  function handleAddProductToCart({ product: productAdded }: ProductProps) {
    const product = productAdded
    addItem(product, { count: 1 })
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatPriceToBrlCurrency(product.price)}</span>
          <p>{product.description}</p>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={() => handleAddProductToCart({ product })}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_Nv4uZlVeucZOPz' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price', 'skus'],
  })


  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
        currency: price.currency.toUpperCase(),
        priceProp: price,
        sku: product.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
