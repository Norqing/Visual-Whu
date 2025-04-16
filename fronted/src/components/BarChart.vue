<template>
  <div ref="chartContainer" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  chartData: { type: Array, required: true }
});

const chartContainer = ref(null);
let chart = null;

const initChart = () => {
  if (!chartContainer.value) {
    console.error('BarChart: Container not found');
    return;
  }
  try {
    chart = echarts.init(chartContainer.value);
    console.log('BarChart: Initialized');
    updateChart();
    window.addEventListener('resize', resizeChart);
  } catch (error) {
    console.error('BarChart: Init failed', error);
  }
};

const updateChart = () => {
  if (!chart) return;
  if (!props.chartData || props.chartData.length === 0) {
    console.warn('BarChart: No data');
    return;
  }

  console.log('BarChart: Data', props.chartData);
  const sortedData = [...props.chartData].sort((a, b) => b.value - a.value);
  const top10Data = sortedData.slice(0, 10);

  const option = {
    title: { text: '非遗项目分类统计', left: 'center' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '5%', right: '5%', bottom: '10%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: top10Data.map(item => item.name),
      axisLabel: { rotate: 30 }
    },
    yAxis: { type: 'value', name: '数量' },
    series: [
      {
        name: '数量',
        type: 'bar',
        data: top10Data.map(item => item.value),
        barWidth: '40%',
        label: { show: true, position: 'top' }
      }
    ]
  };

  try {
    chart.setOption(option);
  } catch (error) {
    console.error('BarChart: Update failed', error);
  }
};

const resizeChart = () => {
  if (chart) chart.resize();
};

watch(() => props.chartData, updateChart, { deep: true });

onMounted(async () => {
  await nextTick();
  initChart();
});

onUnmounted(() => {
  if (chart) {
    chart.dispose();
    window.removeEventListener('resize', resizeChart);
  }
});
</script>
