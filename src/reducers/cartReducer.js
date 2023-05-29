export const initialState = JSON.parse(window.localStorage.getItem('cart')) || []

const REDUCER_ACTION_TYPES = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  DECREASE_ITEM_QUANTITY: 'DECREASE_ITEM_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
}

export const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case REDUCER_ACTION_TYPES.ADD_ITEM_TO_CART: {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        updateLocalStorage(newState)
        return newState
      }

      // Return copy of previous array and fixed quantity to 1 when is not already in the cart
      const newState = [
        ...state,
        {
          ...actionPayload, // product
          quantity: 1
        }
      ]

      updateLocalStorage(newState)
      return newState
    }

    case REDUCER_ACTION_TYPES.REMOVE_ITEM_FROM_CART: {
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }

    case REDUCER_ACTION_TYPES.DECREASE_ITEM_QUANTITY: {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex === -1) return

      const newState = structuredClone(state)

      if (newState[productInCartIndex].quantity > 1) {
        newState[productInCartIndex].quantity -= 1
      }

      updateLocalStorage(newState)
      return newState
    }

    case REDUCER_ACTION_TYPES.CLEAR_CART: {
      localStorage.removeItem('cart')
      return []
    }
  }

  return state
}
