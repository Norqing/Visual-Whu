<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="nav-toolbar">
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>非遗文化展示</q-toolbar-title>
        <q-btn flat label="首页" to="/" />
        <q-btn flat label="文化地图" to="/map" />
        <q-btn flat label="数据分析" to="/data" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>导航</q-item-label>
        <q-item clickable to="/">
          <q-item-section>首页</q-item-section>
        </q-item>
        <q-item clickable to="/map">
          <q-item-section>文化地图</q-item-section>
        </q-item>
        <q-item clickable to="/data">
          <q-item-section>数据分析</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.nav-toolbar {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}
</style>
