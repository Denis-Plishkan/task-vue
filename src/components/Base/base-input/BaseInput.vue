<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const searchQuery = ref(props.modelValue)

const updateQuery = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  searchQuery.value = value
  emit('update:modelValue', value)
}
</script>

<template>
  <input
    type="text"
    v-model="searchQuery"
    @input="updateQuery"
    placeholder="🔍 Search products..."
    class="search-input"
  />
</template>

<style lang="scss">
@use 'BaseInput';
</style>
