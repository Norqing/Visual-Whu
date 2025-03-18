<template>
  <q-page class="q-pa-md">
    <div class="bg-container"></div>
    <div class="content text-center">
      <h1 class="q-my-md">欢迎体验非遗文化</h1>
      <p class="q-mb-md">探索中国非物质文化遗产的魅力</p>
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        swipeable
        arrows
        class="carousel"
        :fullscreen="false"
        :height="carouselHeight"
      >
        <q-carousel-slide name="slide1" img-src="/images/ich1.jpg">
          <div class="caption">非遗项目1</div>
        </q-carousel-slide>
        <q-carousel-slide name="slide2" img-src="/images/ich2.jpg">
          <div class="caption">非遗项目2</div>
        </q-carousel-slide>
        <q-carousel-slide name="slide3" img-src="/images/ich3.jpg">
          <div class="caption">非遗项目3</div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

const slide = ref("slide1");
const carouselHeight = ref("300px"); // 默认高度

// 自适应轮播图高度（可选，根据图片大小动态调整）
onMounted(() => {
  const img = new Image();
  img.src = "/images/ich1.jpg"; // 使用第一张图片作为参考
  img.onload = () => {
    const aspectRatio = img.height / img.width;
    const maxWidth = Math.min(window.innerWidth * 0.8, 800); // 最大宽度限制
    const calculatedHeight = maxWidth * aspectRatio;
    carouselHeight.value = `${Math.min(calculatedHeight, 500)}px`; // 限制最大高度
  };
});
</script>

<style scoped>
.bg-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  animation: bgMove 15s infinite ease-in-out;
}
.content {
  position: relative;
  z-index: 1;
}
.carousel {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}
.carousel img {
  object-fit: cover; /* 图片自适应容器 */
  width: 100%;
  height: 100%;
}
.caption {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 4px;
}
h1 {
  color: #ff6b6b;
}
p {
  color: #666;
}
@keyframes bgMove {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
