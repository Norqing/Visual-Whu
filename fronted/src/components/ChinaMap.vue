<template>
  <div ref="chartContainer" class="china-map-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'


const chartContainer = ref(null)
let chartInstance = null

onMounted(async () => {
  // 初始化图表
  chartInstance = echarts.init(chartContainer.value)
  
  try {
    // 加载中国地图JSON数据
    const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
    const chinaJson = await response.json()
    
    // 注册地图数据
    echarts.registerMap('china', chinaJson)
    
    // 设置图表配置
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}'
      },
      series: [{
        name: '中国',
        type: 'map',
        map: 'china',
        roam: true, // 允许缩放和平移
        emphasis: { // 高亮状态样式
          itemStyle: {
            areaColor: '#ff6b6b',
            borderWidth: 1,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10
          },
          label: {
            show: true,
            color: '#fff'
          }
        },
        itemStyle: { // 默认状态样式
          areaColor: '#e0f7fa',
          borderColor: '#81d4fa',
          borderWidth: 1
        },
        data: [] // 可以添加各省份数据
      }]
    }
    
    // 设置配置项并渲染
    chartInstance.setOption(option)
    
    // 响应窗口大小变化
    window.addEventListener('resize', handleResize)
  } catch (error) {
    console.error('加载地图数据失败:', error)
  }
})

onBeforeUnmount(() => {
  // 销毁图表实例
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', handleResize)
})

// 处理窗口大小变化
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}
</script>

<style scoped>
.china-map-container {
  width: 100%;
  height: 100%;
  min-height: 600px;
  background-color: transparent;
}
</style>