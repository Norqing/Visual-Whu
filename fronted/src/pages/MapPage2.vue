<template>
  <q-page class="q-pa-md policy-page">
    <!-- 导航按钮区域 -->
    <div class="nav-buttons">
      <q-btn 
        class="nav-btn"
        label="非遗政策地图" 
        @click="switchSite('map')"
        :class="{ active: currentSite === 'map' }"
      />
      <q-btn 
        class="nav-btn"
        label="非遗文化地图"
        @click="switchSite('map2')" 
        :class="{ active: currentSite === 'map2' }"
      />
    </div>

    <!-- 标题区域 -->
    <div class="title-area">
      <h1 class="title-text">地方级非遗政策</h1>
      <img src="\map_images\标题修饰.png" alt="标题修饰" class="title-decoration">
    </div>
    
    <!-- 文本框区域 -->
    <div class="textbox-container">
      <div v-for="(item, index) in textItems" :key="index" 
           class="textbox-item" 
           :style="getTextboxStyle(index + 1)">
        <div class="textbox" @click="onTextClick(index)">
          {{ item }}
        </div>
        <div class="line"></div>
      </div>
    </div>

    <!-- 地图容器 -->
    <div class="map-container" ref="chartsDOM"></div>
    <div class="boundary-container" ref="boundaryDOM"></div>
  </q-page>
</template>

<script setup>
import * as echarts from 'echarts';
import getChinaMap from '../api/getmap';
import getBoundaries from '../api/getboundaries';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentSite = ref('map2');

// 文本框数据
const textItems = ref([
  '地方政策示例1',
  '地方政策示例2',
  // 添加更多示例...
]);

const getTextboxStyle = (i) => {
  const positions = [
    { top: 6, left:18 },
    { top: 15, left: 13.5 },
    // 添加更多位置...
  ];
  return {
    top: `${positions[i-1].top}vh`,
    left: `${positions[i-1].left}vw`
  };
};

const onTextClick = (index) => {
  console.log('点击了政策:', textItems.value[index]);
};

const switchSite = (site) => {
  currentSite.value = site;
  if(site === 'map') {
    router.push('/map/policy');
  } else {
    router.push('/map/local');
  }
};

const chartsDOM = ref(null);
const boundaryDOM = ref(null); // 新增边界地图引用

onMounted(() => {
  const myChart = echarts.init(chartsDOM.value);
  // 初始化边界地图
  const boundaryChart = echarts.init(boundaryDOM.value);
  
  myChart.showLoading();
  boundaryChart.showLoading();

  Promise.all([getChinaMap, getBoundaries]).then(([res, boundaries]) => {
    myChart.hideLoading();
    boundaryChart.hideLoading();
    
    echarts.registerMap('China', res.data);
    echarts.registerMap('ChinaBoundary', boundaries.data);

    // 中国地图配置保持不变
    // 调整边界地图配置
    const boundaryOption = {
      series: [{
        // 最外层 - 8px淡褐色边框
        type: 'map',
        map: 'ChinaBoundary',
        roam: false,
        silent: true,
        layoutCenter: ['50%', '70%'],
        layoutSize: '120%',
        zoom: 1.1,
        zIndex: 2, // 确保在顶层
   
        itemStyle: {
          areaColor: 'rgba(0,0,0,0)',
          borderWidth: 8,
          borderColor: '#ac967f',
          borderCap: 'round',  // 线帽样式为圆形
          borderJoin: 'round',  // 连接处为圆角
          borderType: 'solid',
          shadowBlur: 4,  // 添加轻微阴影模糊效果
          shadowColor: '#ac967f'  // 阴影颜色与边框一致
        },
        emphasis: {
          disabled: true
        }
      }]
    };
    
    // 调整中国地图配置
    const mainOption = {
      visualMap: {
        min: 0,
        max: 10,
        text: ['高', '低'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['rgb(240,236,227)', 'rgb(209,196,158)']  // 修改为指定的RGB颜色渐变
        }
      },
      series: [{
        name: '中国地图',
        type: 'map',
        map: 'China',
        label: {
          show: false  // 关闭地图上的省份文本标签
        },
        data: [
          {name: '北京市', value: 7}, {name: '天津市', value: 5},
          {name: '河北省', value: 4}, {name: '山西省', value: 11},
          {name: '内蒙古自治区', value:8}, {name: '辽宁省', value:5},
          {name: '吉林省', value: 2}, {name: '黑龙江省', value: 5},
          {name: '上海', value: 5}, {name: '江苏省', value: 3},
          {name: '浙江省', value: 6}, {name: '安徽省', value: 5},
          {name: '福建省', value: 7}, {name: '江西省', value: 4},
          {name: '山东省', value:9}, {name: '河南省', value: 3},
          {name: '湖北省', value: 5}, {name: '湖南省', value: 4},
          {name: '广东省', value: 6}, {name: '广西壮族自治区', value: 6},
          {name: '海南省', value: 5}, {name: '重庆市', value: 4},
          {name: '四川省', value: 9}, {name: '贵州省', value:7},
          {name: '云南省', value: 9}, {name: '西藏自治区', value:3},
          {name: '陕西省', value:4}, {name: '甘肃省', value: 10},
          {name: '青海省', value: 6}, {name: '宁夏回族自治区', value: 8},
          {name: '新疆维吾尔自治区', value: 1}, {name: '台湾', value: 0},
          {name: '香港', value: 0}, {name: '澳门', value: 0}
        ],
        emphasis: {  // 取消悬停高亮效果
          itemStyle: {
            areaColor: undefined  // 取消悬停颜色
          }
        },
        selectedMode: 'single',  // 启用单选模式
        select: {  // 设置选中样式
          itemStyle: {
            areaColor: 'rgb(233,213,181)'  // 点击时显示淡黄色
          }
        },
        layoutCenter: ['50%', '70%'],
        layoutSize: '120%',
        zoom: 1.1,
        zIndex: 3 , // 确保在边界地图下方
      }],
      title: {
        text: '地方级非遗政策数量',
        left: 155,  // 修改为左侧
        top: 20,      // 调整顶部距离
        textStyle: {
          color: '#333',
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      graphic: [{
        type: 'image',
        left: 110,     // 左侧距离
        top: 35,      // 图片在标题下方
        style: {
          image: '/map_images/标题修饰.png',
          width: 250
        }
      }],
      padding: [10, 20]  // 这里添加了逗号
    };  // 这里缺少了分号
    boundaryChart.setOption(boundaryOption);
    myChart.setOption(mainOption);
    
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
  background-repeat: no-repeat;
  background-attachment: scroll;
}

/* 导航按钮样式 */
.nav-buttons {
  position: absolute;
  top: 2vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;  
  gap: 25vw;
  z-index: 100;
}

.nav-btn {
  padding: 10px 30px;
  background-color: rgba(255, 255, 255, 0.342) !important;
  border-radius: 4px;
  font-family: "SimSun", serif;
  font-size: 1.2vw;
  color: #333 !important;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.nav-btn.active {
  background-color: rgba(233, 213, 181, 0.7) !important;
}

/* 标题区域样式 */
.title-area {
  position: absolute;
  top: 6vh;
  left: 4vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10;
}

.title-text {
  font-family: "SimSun", serif;
  font-size: 2vw;
  font-weight: bold;
  color: #000;
  margin: 0;
  padding-left: 1.5vw;
  margin-bottom: -2vh;
}

.title-decoration {
  width: 15vw;
  height: auto;
  margin-left: -0.5vw;
  margin-top: -2.5vh;
}

/* 文本框区域样式 */
.textbox-container {
  position: absolute;
  left: 2vw;
  width: 20vw;
  top: 10vh;
  z-index: 5;
}

.textbox-item {
  position: absolute;
  display: flex;
  align-items: flex-end;
  margin-bottom: 2vh;
  will-change: transform, opacity;
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.textbox {
  width: 20vw;
  min-height: 3vh;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1vw;
  margin-right: 0.5vw;
  font-size: 0.9vw;
  font-family: "SimSun", serif;
  font-weight: bold;
  white-space: normal;
  word-break: break-all;
  text-align: center;
  transition: color 0.3s ease;
}

.textbox:hover {
  color: #ff6b6b;
  cursor: pointer;
}

.line {
  width: 6vw;
  height: 0.05vh;
  background-color: #000;
  margin-left: 0.5vw;
  margin-bottom: 1.5vh;
  position: relative;
}

.line::after {
  content: '';
  display: block;
  position: absolute;
  right: -1vw;
  top: 50%;
  transform: translateY(-50%);
  width: 0.8vw;
  height: 0.8vw;
  background-image: url('/map_images/国家级非遗政策牵引点.png');
  background-size: contain;
  background-repeat: no-repeat;
}

/* 分页按钮样式 */
.pagination {
  position: absolute;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 10;
}

.page-btn {
  padding: 8px 16px;
  background-color: rgba(255,255,255,0.7);
  border-radius: 4px;
}

/* 详情区域样式 */
.detail-container {
  position: absolute;
  right: 5vw;
  top: 15vh;
  width: 40vw;
  height: 80vh;
  background: rgba(255, 255, 255, 0.105);
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 5;
}

.detail-content {
  font-family: "SimSun", serif;
  font-size: 1vw;
  line-height: 1.6;
  white-space: pre-wrap;
  color: #333;
}

/* 地图容器样式 */
.map-container {
  width: 40vw;
  height: 60vh;
  position: absolute;
  right: 5vw;
  bottom: 5vh;
  background: rgba(255, 255, 255, 0);
  border-radius: 8px;
  z-index: 2;
}

.boundary-container {
  width: 40vw;
  height: 60vh;
  position: absolute;
  right: 5vw;
  bottom: 5vh;
  pointer-events: none;
  z-index: 1;
}
</style>

