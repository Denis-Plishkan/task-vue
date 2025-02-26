<script setup lang="ts">
import { useProducts } from '@/composables/useProducts'
import { BaseInput } from '@/components'
import { UIProductCard } from '@/components'

const { searchQuery, displayedProducts, filteredProducts, containerRef, isLoading } = useProducts()
</script>

<template>
  <div>
    <BaseInput v-model="searchQuery" />

    <div ref="containerRef" class="product__wrapper">
      <transition-group name="fade" tag="div" class="product-list">
        <UIProductCard v-for="product in displayedProducts" :key="product.id" :product="product" />
      </transition-group>

      <p v-if="filteredProducts.length === 0" class="no-products">
        There are no products with this name !
      </p>
      <p v-if="isLoading" class="loading">Loading...</p>
    </div>
  </div>
</template>

<style lang="scss">
@use 'HomePage';
</style>
