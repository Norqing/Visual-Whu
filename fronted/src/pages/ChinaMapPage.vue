<template>
  <div class="map-page">
    <ChinaMap />
  </div>
</template>

<script setup>
import ChinaMap from '../components/ChinaMap.vue'
</script>

<style scoped>
.map-page {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>