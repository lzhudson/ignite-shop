import { styled } from '../../styles'

export const CartContainer = styled('div', {
  width: '30rem',
  height: '100vh',
  background: '$gray900',
  boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.80)',
  position: 'absolute',
  right: '0',
  top: '0',
  padding: '1.5rem',
  zIndex: '1',
  transition: 'all 0.5s ease-in-out',
  variants: {
    opened: {
      true: {
        transform: 'translateX(0)',
      },
      false: {
        transform: 'translateX(100%)',
      },
    },
  },
  h3: {
    marginTop: '$xl',
    fontSize: '$lg',
    color: '$gray100',
  },
})

export const CloseCart = styled('button', {
  background: 'transparent',
  border: 'none',
  marginLeft: 'auto',
  display: 'block',
  lineHeight: 0,
  cursor: 'pointer',
})

export const ProductList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem',
  gap: '1.5rem',
})

export const CardProduct = styled('div', {
  display: 'flex',
  gap: '1.25rem',
})

export const CardProductImageContainer = styled('div', {
  width: '100%',
  maxWidth: 95,
  height: '95',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const CardProductContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  p: {
    fontSize: '$md',
    fontFamily: '$roboto',
    fontWeight: 400,
    color: '$gray300',
  },
  span: {
    fontSize: '$md',
    fontFamily: '$roboto',
    fontWeight: 700,
    color: '$gray100',
    marginTop: '0.25rem',
  },
  button: {
    marginTop: 'auto',
    fontSize: '1rem',
    color: '$green500',
    fontWeight: 'bold',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
})

export const CartFooter = styled('div', {
  marginTop: '12.375rem',
  button: {
    width: '100%',
    maxWidth: 384,
    padding: '1.25rem 2rem',
    borderRadius: '8px',
    backgroundColor: '$green500',
    color: '$white',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    cursor: 'pointer',
    margin: '0 auto',
    display: 'block',
    marginTop: '3.625rem',
  },
})

export const CartSummary = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

export const QuantitySummary = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  p: {
    fontSize: '1rem',
    fontWeight: '400',
    color: '$gray100',
  },
  span: {
    fontSize: '1.125rem',
    fontWeight: '400',
    color: '$gray300',
  },
})

export const TotalSummary = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  p: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '$gray100',
  },
  span: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '$gray300',
  },
})
