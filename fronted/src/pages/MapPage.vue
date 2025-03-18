<template>
  <q-page class="q-pa-md">
    <h2 class="q-mb-md text-center">非遗文化地图</h2>
    <div class="map-container">
      <q-btn
        flat
        label="加载地图（待实现）"
        color="primary"
        class="q-mt-md"
        @click="showMapNotice"
      />
    </div>
    <div class="q-mt-md text-center">
      <p>此处将展示非遗文化地理分布</p>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

function showMapNotice() {
  $q.notify({
    message: "地图功能待实现，请后续集成高德地图API",
    color: "info",
    position: "top",
  });
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
  background: #e0e0e0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
h2 {
  color: #ff6b6b;
}
p {
  color: #666;
}
</style>
