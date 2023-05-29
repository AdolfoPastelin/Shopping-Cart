import { useReducer } from 'react'
import { cartReducer, initialState } from '../reducers/cartReducer'

export function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItemToCart = product => dispatch({ type: 'ADD_ITEM_TO_CART', payload: product })
  const removeItemFromCart = product => dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: product })
  const decreaseItemQuantity = product => dispatch({ type: 'DECREASE_ITEM_QUANTITY', payload: product })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return { state, addItemToCart, removeItemFromCart, decreaseItemQuantity, clearCart }
}
