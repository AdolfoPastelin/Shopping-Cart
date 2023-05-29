import { AddToCartIcon, RemoveFromCartIcon } from '../components/Icons'
import { useCart } from '../hooks/useCart'
import PropTypes from 'prop-types'

export function Products ({ products = [] }) {
  const { cart, addItemToCart, removeItemFromCart } = useCart()

  const checkIfProductIsInCart = (product) => {
    return cart.some((item) => item.id === product.id)
  }

  return (
    <main className='w-full px-20 mb-16'>
      <ul className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-content-center gap-12 p-0 list-none'>
        {products.length > 0 && products.map(product => {
          const isProductInCart = checkIfProductIsInCart(product)

          return (
          <li key={product.id} className='grid grid-rows-[1fr_200px] bg-gradient-to-tr from-slate-800 to-black rounded-2xl shadow-md shadow-slate-400'>
            <article className='flex flex-col justify-center items-center'>
              <h2 className='text-2xl font-bold py-10'>{product?.title}</h2>
              <img src={product?.thumbnail} alt={`Thumbnail of ${product?.title}`} className='rounded-2xl h-60 object-center object-cover max-w-[90%]' />
            </article>

            <section className='flex flex-col items-center justify-center gap-10'>
              <p className='text-xl'>${product?.price} USD</p>
              <p className={'text-md'}>
                {product?.stock < 1
                  ? <span>Out of stock. :/</span>
                  : <span>There {product?.stock === 1
                    ? `is ${product.stock} item `
                    : `are ${product.stock} items `}
                    left in stock.
                  </span>
                }
              </p>
              <article className='flex gap-10'>
                <button className={`${isProductInCart ? 'bg-red-700' : 'bg-blue-800'} mb-2`} onClick={() => {
                  isProductInCart
                    ? removeItemFromCart(product)
                    : addItemToCart(product)
                }}>
                  {isProductInCart
                    ? <span className='flex justify-center items-center gap-2 text-sm'>
                      Remove from Cart <RemoveFromCartIcon />
                    </span>
                    : <span className='flex justify-center items-center gap-2 text-sm'>
                      Add to Cart <AddToCartIcon />
                    </span>}
                </button>
              </article>
            </section>
          </li>
          )
        })}
      </ul>
      {products.length < 1 ? <p className='flex flex-col justify-center items-center font-bold my-16'>No products were found to display</p> : null}
    </main>
  )
}

Products.propTypes = {
  products: PropTypes.array.isRequired
}
