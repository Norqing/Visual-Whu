<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
body {
  font-family: "Arial", sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  overflow-x: hidden;
}
.container-limited {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
