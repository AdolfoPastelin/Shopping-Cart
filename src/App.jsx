import { products } from './mocks/products.json'
import { Header } from './components/Header'
import { Cart } from './components/Cart'
import { Products } from './components/Products'
import { useFilters } from './hooks/useFilters'
import { getUniqueCategories } from './services/getUniqueCategories'
import { CartContextProvider } from './context/CartContext'

function App () {
  const { filteredProducts } = useFilters({ products })

  const uniqueCategories = getUniqueCategories(products)

  return (
    <CartContextProvider>
      <Header categories={uniqueCategories} />
      <Cart />
      <Products products={filteredProducts}/>
    </CartContextProvider>
  )
}

export default App
