import { apiGet } from '~/utils/api'
import type { Product } from '~/models/product'

export function getProducts() {
  return apiGet<Product[]>('/products')
}
