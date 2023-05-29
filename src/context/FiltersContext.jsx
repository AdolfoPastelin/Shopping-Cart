import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

// 1. Create the context
export const FilterContext = createContext()

// 2. Create a provider, to provide the context
export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    stock: 0
  })

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired
}
