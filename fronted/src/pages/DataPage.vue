<template>
  <q-page class="q-pa-md">
    <h2 class="q-mb-md text-center">非遗文化数据分析</h2>
    <q-select
      v-model="chartType"
      :options="chartOptions"
      label="选择图表类型"
      outlined
      dense
      class="q-mb-md"
      style="max-width: 200px"
    />
    <div class="chart-container">
      <q-list dense>
        <q-item v-for="(item, index) in sampleData" :key="index">
          <q-item-section>{{ item.name }}</q-item-section>
          <q-item-section side>{{ item.value }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const chartType = ref("柱状图");
const chartOptions = ["柱状图", "饼图", "折线图"];
const sampleData = ref([
  { name: "剪纸", value: 120 },
  { name: "皮影", value: 200 },
  { name: "刺绣", value: 150 },
]);
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  overflow-y: auto;
}
h2 {
  color: #ff6b6b;
}
</style>
