import Image from 'next/image'
import { ButtonCart, HeaderContainer } from './styles'
import { Bag } from 'phosphor-react'
import logoImg from '../../assets/logo.svg'
import { useState } from 'react'
import { Cart } from '../Cart'
import { useShoppingCart } from 'use-shopping-cart'

export function Header() {
  const [openCart, setOpenCart] = useState(false)

  const { cartCount } = useShoppingCart()
  function handleToggleCart() {
    setOpenCart((prevState) => !prevState)
  }
  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
      <ButtonCart onClick={handleToggleCart}>
        <Bag size={24} />
        <span>{cartCount}</span>
      </ButtonCart>
      <Cart opened={openCart} handleToggleCart={handleToggleCart} />
    </HeaderContainer>
  )
}
