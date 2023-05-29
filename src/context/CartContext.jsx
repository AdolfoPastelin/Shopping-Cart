import { createContext } from 'react'
import { useCartReducer } from '../hooks/useCartReducer'
import PropTypes from 'prop-types'

export const CartContext = createContext()

export function CartContextProvider ({ children }) {
  const { state, addItemToCart, removeItemFromCart, decreaseItemQuantity, clearCart } = useCartReducer()

  return (
    <>
      <CartContext.Provider value={{
        cart: state,
        addItemToCart,
        removeItemFromCart,
        decreaseItemQuantity,
        clearCart
      }}>
        {children}
      </CartContext.Provider>
    </>
  )
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
