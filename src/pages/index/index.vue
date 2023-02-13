<template>
  <view class="content">
    <view class="bg"></view>
    <nav-bar :tip="'推荐的数据'"> </nav-bar>
    <my-swiper
      height="350px"
      indicator="bottomLeft"
      :list="banners"
    ></my-swiper>
    <view class="main">
      <IndexDiscover :discover-icons="discoverIcons" />
      <IndexRecommendSongs :songs="songs" />
      <IndexNewsongs :new-songs="newSongs" />
    </view>
    <player-controller></player-controller>
  </view>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/store";
import { storeToRefs } from "pinia";
import IndexDiscover from "./c-cpns/index-discover.vue";
import IndexRecommendSongs from "./c-cpns/index-recommend-songs.vue";
import IndexNewsongs from "./c-cpns/index-newsongs.vue";
// 获取数据
const indexStore = useIndexStore();
indexStore.getIndexDataAction();
const { banners, discoverIcons, songs, newSongs } = storeToRefs(indexStore);
</script>

<style lang="scss" scoped>
// 背景
.bg {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 160px;
  filter: blur(1px);
  background-image: linear-gradient(to top right, #e9e8f9, #f6e4f2);
}
.content {
  padding-bottom: 60px;
}
.main {
  padding: 0 20rpx;
  // 发现区域
}
</style>
