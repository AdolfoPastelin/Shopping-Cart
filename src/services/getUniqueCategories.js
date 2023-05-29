export const getUniqueCategories = (products) => {
  const categoryArray = products.map(({ category }) => category)
  return Array.from(new Set(categoryArray))
}
