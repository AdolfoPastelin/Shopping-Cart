import { useState, useId, useContext } from 'react'
import { FilterContext } from '../context/FiltersContext'
import PropTypes from 'prop-types'

export function Filters ({ categories }) {
  const [isInStockOnly, setIsInStockOnly] = useState(false)
  const priceRangeFilterId = useId()
  const categoryFilterId = useId()
  const stockFilterId = useId()
  const { filters, setFilters } = useContext(FilterContext)

  const handleMinPrice = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value
    }))
  }

  const handleCategorySelection = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      category: e.target.value
    }))
  }

  const handleOnlyInStockSelection = () => {
    if (isInStockOnly) {
      setFilters((prevState) => ({
        ...prevState,
        stock: 0
      }))
    } else {
      setFilters((prevState) => ({
        ...prevState,
        stock: -1
      }))
    }

    setIsInStockOnly(!isInStockOnly)
  }

  return (
    <section className="flex lg:flex-row lg:justify-evenly lg:gap-0 flex-col justify-center gap-5 items-center my-20">
      <div className="filter-container">
        <label htmlFor={priceRangeFilterId} className='cursor-text'>Minimun price starting from: </label>
        <input type="range" id={priceRangeFilterId} name={priceRangeFilterId} min="0" max="1200" step={10} onChange={handleMinPrice} value={filters.minPrice} className='grayscale cursor-grab active:cursor-grabbing' />
        <p>${filters.minPrice} USD</p>
      </div>

      <div className='filter-container'>
        <label htmlFor={categoryFilterId} className='cursor-text'>Category: </label>
        <select name={categoryFilterId} id={categoryFilterId} onChange={handleCategorySelection} className='cursor-pointer'>
          <option value="all">All Categories</option>
          {categories && categories.map((category, index) => (
            <option key={index} value={category}>{`${category.slice(0, 1).toUpperCase()}${category.slice(1)}`}</option>
          ))}
        </select>
      </div>

      <div className='filter-container'>
        <label htmlFor={stockFilterId} className='cursor-text'>Also show products out of stock: </label>
        <input type="checkbox" id={stockFilterId} name={stockFilterId} onChange={handleOnlyInStockSelection} checked={isInStockOnly} className='w-4 cursor-pointer' />
      </div>
    </section>
  )
}

Filters.propTypes = {
  categories: PropTypes.array.isRequired
}
