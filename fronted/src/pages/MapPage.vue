<template>
  <q-page class="q-pa-md policy-page">
    <!-- 左上角标题区域 -->
    <div class="title-area">
      <h1 class="title-text">国家非遗政策</h1>
      <img src="\map_images\标题修饰.png" alt="标题修饰" class="title-decoration">
    </div>
    
    <!-- 左侧文本框区域 -->
    <div class="textbox-container">
      <div v-for="(item, index) in textItems" :key="index" 
           class="textbox-item" 
           :style="{
             ...getTextboxStyle(index + 1),
             opacity: showText ? 1 : 0,
             transform: showText ? 'translateX(0)' : 'translateX(20px)',
             transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
           }">
        <div class="textbox" :title="item">{{ item.length > 20 ? item.substring(0, 20) + '...' : item }}</div>
        <div class="line"></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const textItems = ref(Array(9).fill('加载中...'))
const showText = ref(false) // 新增显示状态

onMounted(async () => {
  showText.value = false // 初始隐藏
  try {
    const response = await fetch('http://localhost:8000/api/policy-content')
    if (!response.ok) throw new Error('网络响应不正常')
    const data = await response.json()
    
    const items = Array(9).fill('')
    data.forEach(item => {
      const index = item.id - 1
      if(index >= 0 && index < 9) {
        items[index] = item.content || '无内容'
      }
    })
    textItems.value = items
    setTimeout(() => {
      showText.value = true // 数据加载完成后显示
    }, 100)
  } catch (error) {
    console.error('获取政策内容失败:', error)
    textItems.value = Array(9).fill('数据加载失败')
  }
})

const getTextboxStyle = (i) => {
  // 只保留奇数编号的位置数据
  const positions = [
    { top: 6, left: 4.5 },    // 1
    { top: 15, left: 0 },     // 3
    { top: 24, left: -8.5 },    // 5
    { top: 33, left: -12 },      // 7
    { top: 42, left: -13 },     // 9
    { top: 51, left: -12 },    // 11
    { top: 60, left: -8.5},    // 13
    { top: 69, left: -3.5 },    // 15
    { top: 78, left: -0.5 }    // 17
  ];
  return {
    top: `${positions[i-1].top}vh`,
    left: `${positions[i-1].left}vw`
  };
};
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

.title-area {
  position: absolute;
  top: 1vh;
  left: 6.6vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title-text {
  font-family: "SimSun", serif;
  font-size: 2vw; /* 从2.5vw减小到2vw */
  font-weight: bold;
  color: #000;
  margin: 0;
  padding-left: 1.5vw;
  margin-bottom:-2vh ;
}

.title-decoration {
  width: 15vw;
  height: auto;
  margin-left: -0.5vw;
  margin-top: -2.5vh;
}

.textbox-container {
  position: absolute;
  left: 2vw;
  width: 20vw;
  top: 10vh;
}

.textbox-item {
  position: absolute;
  display: flex;
  align-items: flex-end;
  margin-bottom: 2vh;
  will-change: transform, opacity; /* 优化动画性能 */
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
  font-size: 0.8vw;
  white-space: normal;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  transition: color 0.3s ease; /* 只对颜色变化添加过渡 */
}

.textbox:hover {
  color: #ff6b6b; /* 文字高亮颜色 */
 
  cursor: pointer; /* 鼠标指针变化 */
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
</style>
