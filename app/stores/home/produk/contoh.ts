import type { ApiResponse } from '~/models/api.model'
import type { Product } from '~/models/product.model'

const res = await apiGet<ApiResponse<Product[]>>('/products')

products.value = res.data
