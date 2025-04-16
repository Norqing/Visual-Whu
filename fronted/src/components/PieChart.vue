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
    console.error('PieChart: Container not found');
    return;
  }
  try {
    chart = echarts.init(chartContainer.value);
    console.log('PieChart: Initialized');
    updateChart();
    window.addEventListener('resize', resizeChart);
  } catch (error) {
    console.error('PieChart: Init failed', error);
  }
};

const updateChart = () => {
  if (!chart) return;
  if (!props.chartData || props.chartData.length === 0) {
    console.warn('PieChart: No data');
    return;
  }

  console.log('PieChart: Data', props.chartData);
  const sortedData = [...props.chartData].sort((a, b) => b.value - a.value);
  let displayData = sortedData;
  if (sortedData.length > 10) {
    const top9 = sortedData.slice(0, 9);
    const othersSum = sortedData.slice(9).reduce((sum, item) => sum + item.value, 0);
    displayData = [...top9, { name: '其他', value: othersSum }];
  }

  const option = {
    title: { text: '非遗项目分布', left: 'center' },
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { orient: 'vertical', left: '5%', top: 'middle' },
    series: [
      {
        name: '分布情况',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        data: displayData,
        label: { show: true, formatter: '{b}: {c} ({d}%)' }
      }
    ]
  };

  try {
    chart.setOption(option);
  } catch (error) {
    console.error('PieChart: Update failed', error);
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
