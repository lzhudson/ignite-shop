import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
})

export const ButtonCart = styled('button', {
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem',
  borderRadius: '6px',
  background: '$gray800',
  position: 'relative',
  border: 'none',
  width: '3rem',
  height: '3rem',
  cursor: 'pointer',
  svg: {
    color: '$gray300',
  },

  span: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    backgroundColor: '$green500',
    color: '$white',
    fontWeight: 'bold',
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    border: '3px solid $gray900',
    borderRadius: '50%',
  },
})
