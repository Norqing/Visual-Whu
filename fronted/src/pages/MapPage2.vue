<template>
  <q-page class="q-pa-md policy-page">
    <!-- 导航按钮区域 -->
    <div class="nav-buttons">
      <q-btn 
        class="nav-btn"
        label="国家非遗政策" 
        @click="switchSite('map')"
        :class="{ active: currentSite === 'map' }"
      />
      <q-btn 
        class="nav-btn"
        label="地方非遗政策"
        @click="switchSite('map2')" 
        :class="{ active: currentSite === 'map2' }"
      />
    </div>

    <!-- 标题区域 -->
    <div class="title-area">
      <h1 class="title-text">地方非遗政策</h1>
      <img src="\map_images\标题修饰.png" alt="标题修饰" class="title-decoration">
    </div>
    
    <!-- 添加搜索框 -->
    <div class="search-area">
      <q-input 
        v-model="searchProvince"
        outlined
        placeholder="输入省份名称"
        class="search-input"
      />
      <q-btn 
        class="search-btn"
        icon="search"
        @click="handleSearch"
      />
    </div>
    
    <!-- 文本框区域 -->
    <div class="textbox-container">
      <template v-for="(item, index) in textItems" :key="index">
        <div class="textbox-item" :style="getTextboxStyle(index+1)">
          <img 
            :src="`/map_images/${item.icon}`" 
            class="policy-icon"
            alt="政策图标"
          />
          <div class="textbox" @click="onTextClick(index)">
            {{ item.text }}
          </div>
          <div class="line"></div>
        </div>
      </template>
    </div>

    <!-- 地图容器 -->
    <!-- 在文本框区域下方添加分页控件 -->
    <div class="pagination">
      <q-btn 
        class="page-btn"
        icon="chevron_left"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage <= 1"
      />
      <span class="page-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <q-btn 
        class="page-btn"
        icon="chevron_right"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
      />
    </div>
    
    <!-- 地图容器保持不变 -->
    <div class="map-container" ref="chartsDOM"></div>
    <div class="boundary-container" ref="boundaryDOM"></div>
  </q-page>
</template>

<script setup>
import * as echarts from 'echarts';
import getChinaMap from '../api/getmap';
import getBoundaries from '../api/getboundaries';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const currentSite = ref('map2');
const searchProvince = ref('');
const localPolicies = ref([]);

// 文本框数据
const textItems = ref([
  { text: '地方政策1', url: null, icon: '地方级政策前缀修饰1.png' },  
  { text: '', url: null, icon: '地方级政策前缀修饰2.png' },
  { text: '', url: null, icon: '地方级政策前缀修饰3.png' },
  { text: '', url: null, icon: '地方级政策前缀修饰4.png' }
]);

// 导入本地JSON数据 
// 修改JSON导入路径
import localPoliciesData from '/public/data/_地方非遗政策.json';

// 新增分页相关变量
const currentPage = ref(1);
const pageSize = 4; // 每页显示4条数据
const totalPages = ref(1);

const fetchLocalPolicies = async (province) => {
  try {
    const provinceStr = String(province || '').trim();
    currentPage.value = 1; // 搜索时重置到第一页
    
    // 直接从本地JSON数据中过滤匹配项
    const matchedPolicies = localPoliciesData.filter(item => 
      item.province && item.province.includes(provinceStr)
    );
    
    // 计算总页数
    totalPages.value = Math.ceil(matchedPolicies.length / pageSize);
    localPolicies.value = matchedPolicies;
    
    // 更新当前页数据
    updateCurrentPageData();
  } catch (error) {
    console.error('获取地方政策失败:', error);
    textItems.value = [
      { text: '地方政策', url: null, icon: '地方级政策前缀修饰1.png' },
      { text: '', url: null, icon: '地方级政策前缀修饰2.png' },
      { text: '', url: null, icon: '地方级政策前缀修饰3.png' },
      { text: '', url: null, icon: '地方级政策前缀修饰4.png' }
    ];
  }
};

// 新增分页更新函数
const updateCurrentPageData = () => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = localPolicies.value.slice(startIndex, endIndex);
  
  textItems.value = currentData.map((item, index) => ({
    text: item.title || `地方政策${index + 1}`,
    url: item.url || null,
    icon: `地方级政策前缀修饰${(index % 4) + 1}.png`
  }));
};

// 新增分页切换函数
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  updateCurrentPageData();
};

// 修改handleSearch函数
const handleSearch = () => {
  const searchText = String(searchProvince.value || '').trim();
  if (searchText) {
    fetchLocalPolicies(searchText);
  } else {
    // 清空搜索时重置状态
    currentPage.value = 1;
    totalPages.value = 1;
    localPolicies.value = [];
    textItems.value = [
      { text: '地方政策1', url: null, icon: '地方级政策前缀修饰1.png' },
      { text: '地方政策2', url: null, icon: '地方级政策前缀修饰2.png' },
      { text: '地方政策3', url: null, icon: '地方级政策前缀修饰3.png' },
      { text: '地方政策4', url: null, icon: '地方级政策前缀修饰4.png' }
    ];
  }
};

// 移除原有的watch监听
// watch(searchProvince, (newVal) => {
//   fetchLocalPolicies(newVal);
// });

const getTextboxStyle = (i) => {
  const positions = [
    { top: 10, left: 4 },   // 第一列位置
    { top: 10, left: 10 },   // 第二列位置
    { top: 10, left: 16 },  // 第三列位置
    { top: 10, left: 22 }   // 第四列位置
  ];
  return {
    top: `${positions[i-1].top}vh`,
    left: `${positions[i-1].left}vw`
  };
};

const onTextClick = (index) => {
  const item = textItems.value[index];
  if (item.url) {
    window.open(`https://www.ihchina.cn/zhengce_details/${item.url}`, '_blank');
  } else {
    console.log('点击了政策:', item.text);
  }
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
        layoutCenter: ['50%', '75%'],
        layoutSize: '120%',
        zoom: 1,
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
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          return `${params.name}<br/>非遗政策数量: ${params.value || 0}`;
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        text: ['高', '低'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['rgb(240,236,227)', 'rgb(209,196,158)']
        }
      },
      series: [{
        name: '中国地图',
        type: 'map',
        map: 'China',
        label: {
          show: false,  // 显示省份标签
          color: '#333',
          fontSize: 12
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
        emphasis: {
          itemStyle: {
            areaColor: 'rgb(233,213,181)'  // 悬停时显示淡黄色
          },
          label: {
            show: true,
            color: '#000',
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        selectedMode: 'single',
        select: {
          itemStyle: {
            areaColor: 'rgb(233,213,181)'
          }
        },


        layoutCenter: ['50%', '75%'],
        layoutSize: '120%',
        zoom: 1,
        zIndex: 10,
      }],
      title: {
        text: '地方级非遗政策数量',
        left: 155,  // 修改为左侧
        top: 60,      // 调整顶部距离
        textStyle: {
          color: '#333',
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      graphic: [{
        type: 'image',
        left: 110,     // 左侧距离
        top: 75,      // 图片在标题下方
        style: {
          image: '/map_images/标题修饰.png',
          width: 250
        }
      }],
      padding: [10, 20]  // 这里添加了逗号
    };  // 这里缺少了分号
    boundaryChart.setOption(boundaryOption);
    myChart.setOption(mainOption);
    
    // 添加点击事件监听
    myChart.on('click', function(params) {
      const provinceName = params.name;
      const policyCount = params.value;

      
      console.log('点击参数:', params);
      console.log('省份名称:', provinceName);
      console.log('政策数量:', policyCount);

      
      // 可以根据省份名称自动搜索
      searchProvince.value = provinceName;
      handleSearch();
    });

  });
});
</script>

<style scoped>
.policy-page {
  width: 100vw;
  height: 100vh;
  background-image: url('/map_images/总背景底图2.png');
  background-size: cover; /* 修改为cover模式 */
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* 添加固定背景 */
  background-size: 100vw 100vh; /* 完全拉伸 */
  background-attachment: scroll; /* 允许滚动 */
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
  left: 1vw;  /* 更靠近左侧 */
  width: 25vw;  /* 缩小宽度 */
  top: 10vh;
  z-index: 5;
}

.textbox-item {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;  /* 左对齐 */
}

.textbox {
  writing-mode: vertical-lr;
  text-orientation: upright;
  width: auto;
  min-height: 15vh;
  max-height: 60vh;
  padding: 1vh 0;
  margin-left: 0;
  font-family: "SimSun", serif;
  font-size: 0.9vw;
  font-weight: bold;
  transition: all 0.3s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.6;
  word-break: break-all;
  text-align: start; /* 修改为居中 */
  white-space: normal;
  display: flex; /* 使用flex布局 */
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}

/* 调整文本框容器样式 */
.textbox-item {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center; /* 修改为居中 */
  justify-content: center;
  transform: translateX(-50%); /* 保持中间位置不变 */
}

.textbox {
  -webkit-line-clamp: unset;
  -webkit-box-orient: unset;
  display: block;
}

.textbox:hover {
  color: #ff6b6b; /* 文字颜色变红 */
  text-shadow: 0 0 5px rgba(255, 107, 107, 0.5); /* 添加文字阴影效果 */
  transform: scale(1.05); /* 轻微放大 */
  cursor: pointer; /* 鼠标指针变为手型 */
}

.line {
  width: 0.05vh;
  height: 6vw;
  margin-left: 0;  /* 去除左边距 */
}

.line::after {
  right: 50%;
  top: 100%;
  transform: translateX(50%);
}

/* 分页控件样式 */
.pagination {
  position: absolute;
  left: 4vw;  /* 与标题区域对齐 */
  bottom: 10vh;  /* 调整为10vh */
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 10;
}

.page-btn {
  padding: 8px 16px;
  background-color: rgba(255,255,255,0.7);
  border-radius: 4px;
  min-width: 40px;
}

.page-info {
  color: #333;
  font-family: "SimSun", serif;
  font-size: 1vw;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  height: 70vh; /* 从60vh增加到70vh */
  position: absolute;
  right: 5vw;
  bottom: 10vh; /* 恢复到底部5vh位置 */
  background: rgba(255, 255, 255, 0);
  border-radius: 8px;
  z-index: 2;
}

.boundary-container {
  width: 40vw;
  height: 70vh; /* 从60vh增加到70vh */
  position: absolute;
  right: 5vw;
  bottom: 10vh; /* 恢复到底部5vh位置 */
  pointer-events: none;
  z-index: 1;
}

.policy-icon {
  width: 1.5vw;  /* 从3vw减小到2vw */
  height: 1.5vw; /* 从3vw减小到2vw */
  margin-bottom: 1vh;
  object-fit: contain;
}


/* 添加搜索框样式 */
/* 搜索框样式优化 */
.search-area {
  position: absolute;
  top: 10vh;
  right: 11.5vw;
  z-index: 10;
}

.search-input {
  width: 30vw;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  font-size: 1.2vw;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  padding: 8px 20px;
}
</style>