import { X } from 'phosphor-react'
import {
  CardProduct,
  CardProductContent,
  CardProductImageContainer,
  CartFooter,
  CartSummary,
  CloseCart,
  ProductList,
  QuantitySummary,
  TotalSummary,
  CartContainer,
} from './styles'
import { DebugCart, useShoppingCart } from 'use-shopping-cart'
import { useMemo, useState } from 'react'
import { formatPriceToBrlCurrency } from '../../utils/format-price-to-brl-currency'
import axios from 'axios'

interface CartProps {
  opened: boolean
  handleToggleCart: () => void
}

export function Cart({ opened, handleToggleCart }: CartProps) {
  const { cartDetails, cartCount, removeItem, totalPrice, clearCart } =
    useShoppingCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const [status, setStatus] = useState('idle')

  const cartFormatted = useMemo(() => {
    const cart = []
    for (const [_, product] of Object.entries(cartDetails)) {
      cart.push(product)
    }

    return cart
  }, [cartDetails])



  async function handleFinishPurchase() {
    const productsToCheckout = cartFormatted.map((cartItem) => {
      return {
        priceId: cartItem.defaultPriceId,
        quantity: cartItem.quantity,
      }
    })
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: productsToCheckout,
      })

      const { checkoutUrl } = response.data;

      if (typeof window !== undefined) {
        window.location.href = checkoutUrl;
        clearCart()
      }
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <CartContainer opened={opened}>
      <CloseCart onClick={handleToggleCart}>
        <X size={24} color="#8D8D99" />
      </CloseCart>
      <h3>Sacola de compras</h3>
      {cartFormatted.length ? (
        <ProductList>
          {cartFormatted.map((product) => {
            return (
              <CardProduct key={product.id}>
                <CardProductImageContainer>
                  <img src={product.imageUrl} alt="" width={95} height={95} />
                </CardProductImageContainer>
                <CardProductContent>
                  <p>{product.name}</p>
                  <span>{formatPriceToBrlCurrency(product.price)}</span>
                  <button onClick={() => removeItem(product.id)}>
                    Remover
                  </button>
                </CardProductContent>
              </CardProduct>
            )
          })}
        </ProductList>
      ) : (
        <p>Carrinho vazio</p>
      )}

      <CartFooter>
        <CartSummary>
          <QuantitySummary>
            <p>Quantidade</p>
            <span>{cartCount} itens</span>
          </QuantitySummary>
          <TotalSummary>
            <p>Valor Total</p>
            <span>{formatPriceToBrlCurrency(totalPrice)}</span>
          </TotalSummary>
        </CartSummary>
        <button onClick={handleFinishPurchase}>Finalizar compra</button>
      </CartFooter>
    </CartContainer>
  )
}
