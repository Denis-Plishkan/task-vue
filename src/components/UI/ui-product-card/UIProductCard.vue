<script setup lang="ts">
import type { Product } from '@/type'
import BaseIcon from '@/components/Base/BaseIcon.vue'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="product-card">
    <div class="product-card__left">
      <div class="product-card__left-img">
        <img :src="product.thumbnail" :alt="product.title" />
      </div>
    </div>

    <div class="product-card__right">
      <h3 class="product-card__right-title">{{ product.title }}</h3>
      <p class="product-card__right-description">{{ product.description }}</p>

      <div class="product-card__right-discounts">
        <p class="product-card__right-discount">Discount {{ product.discountPercentage }} %</p>
        <p class="product-card__right-brand">{{ product.brand }}</p>
      </div>

      <div class="product-card__right-infos">
        <p class="product-card__right-price">$ {{ product.price }}</p>
        <p class="product-card__rating">
          <BaseIcon id="star" />
          {{ product.rating }}
        </p>
        <p class="product-card__category">{{ product.category }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'UIProductCard';
</style>
