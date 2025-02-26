<script setup lang="ts">
defineProps(['id'])
</script>

<template>
  <svg>
    <use :href="`#${id}`"></use>
  </svg>
</template>

<style scoped></style>
