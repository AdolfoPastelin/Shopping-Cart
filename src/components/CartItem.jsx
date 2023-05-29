import PropTypes from 'prop-types'

export function CartItem ({ product, addItemToCart, decreaseItemQuantity }) {
  return (
    <>
      <li>
        <div className='py-2'>
          <strong>{product.title} - ${product.price}</strong>
        </div>
        <img
          src={`${product.thumbnail}`}
          alt={`${product.title} thumbnail`}
          className='aspect-auto w-auto my-2'
        />
        <footer className='flex gap-4 justify-center items-center py-1'>
          <button onClick={decreaseItemQuantity} className='bg-slate-600 px-2 py-1'>-</button>
          <p>Qty: {product.quantity}</p>
          <button onClick={addItemToCart} className='bg-slate-600 px-2 py-1'>+</button>
        </footer>
      </li>

      <span className='border border-slate-700'></span>
    </>
  )
}

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  decreaseItemQuantity: PropTypes.func.isRequired
}
