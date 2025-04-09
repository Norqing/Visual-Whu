<template>
  <q-page class="q-pa-md policy-page">
    <!-- 修改为响应式单位 -->
    <div class="map-container" ref="chartsDOM"></div>
  </q-page>
</template>

<script setup>
import * as echarts from 'echarts';
// 使用正确的相对路径（根据实际目录层级调整）
import getChinaMap from '../api/getmap';
import { onMounted, ref } from 'vue';

const chartsDOM = ref(null);

onMounted(() => {
  const myChart = echarts.init(chartsDOM.value);
  myChart.showLoading();
  
  getChinaMap.then(res => {
    myChart.hideLoading();
    echarts.registerMap('China', res.data);
    
    const option = {
      // 移除geo配置，避免冲突
      series: [{
        name: '中国地图',
        type: 'map',
        map: 'China',
        label: {
          show: true
        },
        data: [
          { name: '上海', value: 100 },
          { name: '北京', value: 200 },
          { name: '广州', value: 150 },
          { name: '深圳', value: 250 },
          { name: '杭州', value: 300 },
          { name: '成都', value: 120 },
        ],
        // 调整缩放和布局
        layoutCenter: ['50%', '70%'], // 居中显示
        layoutSize: '120%', // 放大1.5倍
        zoom: 1.1 // 适当缩放
      }]
    };
    myChart.setOption(option);
  });
});
</script>

<style scoped>
.policy-page {
  width: 100vw;
  height: 100vh;
  background-image: url('/map_images/总背景底图2.png');
  background-size: cover;
  background-position: center;
}

.map-container {
  width: 60vw;  /* 恢复合理尺寸 */
  height: 60vh;
  position: absolute;
  right: 0vw;
  bottom: 5vh;
  background: rgba(255, 255, 255, 0);
  border-radius: 8px;
}
</style>

