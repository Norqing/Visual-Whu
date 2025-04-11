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
    console.error('LineChart: Container not found');
    return;
  }
  try {
    chart = echarts.init(chartContainer.value);
    console.log('LineChart: Initialized');
    updateChart();
    window.addEventListener('resize', resizeChart);
  } catch (error) {
    console.error('LineChart: Init failed', error);
  }
};

const updateChart = () => {
  if (!chart) return;
  if (!props.chartData || props.chartData.length === 0) {
    console.warn('LineChart: No data');
    return;
  }

  console.log('LineChart: Data', props.chartData);
  const sortedData = [...props.chartData].sort((a, b) => Number(a.name) - Number(b.name));

  const option = {
    title: { text: '非遗项目年度统计', left: 'center' },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: sortedData.map(item => item.name),
      axisLabel: { rotate: 30 }
    },
    yAxis: { type: 'value', name: '数量' },
    series: [
      {
        name: '项目数量',
        type: 'line',
        data: sortedData.map(item => item.value),
        label: { show: true, position: 'top' },
        smooth: true
      }
    ]
  };

  try {
    chart.setOption(option);
  } catch (error) {
    console.error('LineChart: Update failed', error);
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
