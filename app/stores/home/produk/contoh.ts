async function fetchProducts() {
  try {
    items.value = await getProducts()
  } catch (e: any) {
    error.value = e.message
  }
}
