import { ref, computed, type Ref } from 'vue'
import type { Product } from '@/type.ts'

export function useFilteredProducts(products: Ref<Product[]>) {
  const searchQuery = ref('')

  const filteredProducts = computed(() => {
    return (products.value ?? []).filter((product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  return { searchQuery, filteredProducts }
}
