import Link from 'next/link'
import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  width: '100%',
  marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  minWidth: '540px',
  img: {
    objectFit: 'cover',
    width: '100%'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',
    button: {
      display: 'flex',
      padding: '0.75rem',
      alignItems: 'center',
      borderRadius: '6px',
      backgroundColor: '$green500',
      border: 'none',
      cursor: 'pointer',
    },
    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },
    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const ProductContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
})
