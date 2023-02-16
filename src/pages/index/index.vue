<template>
  <view class="content">
    <view :class="{ bg: !isTop }"></view>
    <nav-bar :top="isTop" :tip="'推荐的数据'"> </nav-bar>
    <my-swiper
      height="350px"
      indicator="bottomLeft"
      :margin="isTop ? barHeight : 0"
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
import { storeToRefs } from "pinia";
import { onPageScroll } from "@dcloudio/uni-app";

import { useIndexStore, useCommonStore } from "@/store";
import IndexDiscover from "./c-cpns/index-discover.vue";
import IndexRecommendSongs from "./c-cpns/index-recommend-songs.vue";
import IndexNewsongs from "./c-cpns/index-newsongs.vue";
import { computed, ref } from "vue";
// 获取数据
const indexStore = useIndexStore();
const commonStore = useCommonStore();
indexStore.getIndexDataAction();
const { banners, discoverIcons, songs, newSongs } = storeToRefs(indexStore);
const isTop = ref(true);
onPageScroll(({ scrollTop }) => {
  if (scrollTop !== 0) {
    isTop.value = true;
  } else {
    isTop.value && (isTop.value = false);
  }
});

const barHeight = computed(() => {
  const height = Number(commonStore.statusBarHeight.slice(0, 2));
  return height + 44 + "px";
});
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 60px;
  // 背景
  .bg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 160px;
    filter: blur(1px);
    background-image: linear-gradient(to top right, #e9e8f9, #f6e4f2);
  }
}
.main {
  padding: 0 20rpx;
}
</style>
