import { Filters } from '../components/Filters'
import PropTypes from 'prop-types'

export function Header ({ categories }) {
  return (
    <>
      <h1 className='my-16 text-4xl font-semibold'>Shopping Cart App</h1>
      <Filters categories={categories}/>
    </>
  )
}

Header.propTypes = {
  categories: PropTypes.array.isRequired
}
