import { useId, useMemo, useState } from 'react'
import { CartIcon, ClearCartIcon, CloseCartIcon, CheckOutIcon } from './Icons'
import { CartItem } from './CartItem'
import { useCart } from '../hooks/useCart'

export function Cart () {
  const cartCheckboxId = useId()
  const [isCartViewOpen, setIsCartViewOpen] = useState(false)
  const { cart, clearCart, addItemToCart, decreaseItemQuantity } = useCart()

  const handleCartView = () => {
    setIsCartViewOpen(!isCartViewOpen)
  }

  const calculateCartTotalSum = (cart) => {
    return cart.reduce((acc, product) => acc + (product.price * product.quantity), 0)
  }

  const cartTotalSum = useMemo(() => calculateCartTotalSum(cart), [cart])

  return (
    <>
      <div className={`${isCartViewOpen ? 'fixed' : 'hidden'} top-0 right-0 bg-red-700 text-black w-[238px] h-20 z-40 bg-gradient-to-tr from-slate-950 to-slate-900`}>.</div>
      <h2 className={`font-bold text-2xl pb-6 text-left ${isCartViewOpen ? 'fixed' : 'hidden'} top-8 right-40 z-50`}>Cart</h2>
      <label
        htmlFor={cartCheckboxId}
        className={`${isCartViewOpen ? 'bg-red-700' : 'bg-blue-800'} flex items-center rounded-full cursor-pointer h-8 justify-center p-1 fixed right-8 top-8 transition-all duration-300 w-10 z-50 hover:scale-110`}>
        {isCartViewOpen ? <CloseCartIcon /> : <CartIcon />}
      </label>
      <input id={cartCheckboxId} type="checkbox" onChange={handleCartView} value={isCartViewOpen} hidden />

      <aside className='hidden bg-gradient-to-tr from-slate-950 to-slate-900 p-8 fixed top-0 right-0 w-60 h-full overflow-y-auto border-l-2 border-slate-600'>
        <ul className='flex flex-col gap-10 mt-16'>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addItemToCart={() => addItemToCart(product)}
              decreaseItemQuantity={() => decreaseItemQuantity(product)}
              product={product} />
          ))}
        </ul>

        <section className='my-9'>
          <h2 className='font-bold text-xl'>Total</h2>
          <p className='text-lg'>${cartTotalSum}<span className='text-sm'> USD</span></p>
        </section>

        <section className='flex flex-col justify-center items-center gap-4'>
          <button className='flex justify-center items-center gap-2 bg-green-900'>
            checkout <CheckOutIcon />
          </button>

          <button onClick={() => clearCart()} className='flex justify-center items-center gap-2 bg-slate-800'>
            Clear Cart <ClearCartIcon />
          </button>
        </section>
      </aside>
    </>
  )
}
