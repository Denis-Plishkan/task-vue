import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { getProducts } from '@/api.ts'
import type { Product } from '@/type.ts'

export function useProducts() {
  const products = ref<Product[]>([])
  const displayedProducts = ref<Product[]>([])
  const searchQuery = ref('')

  const containerRef = ref<HTMLElement | null>(null)
  const batchSize = 20
  const isLoading = ref(false)

  onMounted(async () => {
    const data = await getProducts()
    products.value = data?.products || []
    updateDisplayedProducts()
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll)
    }
  })

  onUnmounted(() => {
    containerRef.value?.removeEventListener('scroll', handleScroll)
  })

  const filteredProducts = computed(() =>
    products.value.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  )

  watch(filteredProducts, updateDisplayedProducts)

  function updateDisplayedProducts() {
    displayedProducts.value = filteredProducts.value.slice(0, batchSize)
  }

  function loadMoreProducts() {
    if (isLoading.value || displayedProducts.value.length >= filteredProducts.value.length) return

    isLoading.value = true
    setTimeout(() => {
      const nextBatch = filteredProducts.value.slice(
        displayedProducts.value.length,
        displayedProducts.value.length + batchSize,
      )
      displayedProducts.value = [...displayedProducts.value, ...nextBatch]
      isLoading.value = false
    }, 500)
  }

  function handleScroll() {
    if (!containerRef.value) return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.value
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreProducts()
    }
  }

  return {
    products,
    displayedProducts,
    searchQuery,
    containerRef,
    filteredProducts,
    isLoading,
    updateDisplayedProducts,
    loadMoreProducts,
  }
}
