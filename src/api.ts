import type { Product } from '@/type'

export const getProducts = async (): Promise<{ products: Product[] }> => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100')
    if (!response.ok) {
      throw new Error(`error download: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error('error get products:', error)
    return { products: [] }
  }
}
