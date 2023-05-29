import { useContext, useMemo } from 'react'
import { FilterContext } from '../context/FiltersContext'

export function useFilters ({ products = [] }) {
  const { filters = {}, setFilters = () => {} } = useContext(FilterContext)

  const filterProducts = useMemo(() => (products) => {
    return products.filter((product) => (
      product.price >= filters.minPrice &&
      product.stock > filters.stock &&
      (
        product.category === filters.category ||
        filters.category === 'all'
      )
    ))
  }, [filters])

  const filteredProducts = filterProducts(products)

  return { filteredProducts, setFilters }
}
