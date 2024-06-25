import Image from 'next/image'
import { HomeContainer, Product, ProductContent } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Bag } from 'phosphor-react'
import { formatPriceToBrlCurrency } from '../utils/format-price-to-brl-currency'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product
            className="keen-slider__slide"
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <Image
              src={product.imageUrl}
              width={520}
              height={480}
              alt="Camisa 1"
            />
            <footer>
              <ProductContent>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </ProductContent>
              <button title="Purchase">
                <Bag size={32} color="#fcfcfc" />
              </button>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formatPriceToBrlCurrency(price.unit_amount),
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hrs
  }
}
