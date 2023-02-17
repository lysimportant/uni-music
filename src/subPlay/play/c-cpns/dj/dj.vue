<template>
  <view class="dj">
    <image class="dj-image" :src="currentDj.coverUrl" mode="widthFix" />
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMusicStore } from "@/store";
const musicStore = useMusicStore();
const { currentMusic, type, currentDj } = storeToRefs(musicStore);
</script>

<style scoped lang="scss">
.dj {
  // margin: auto;
  margin: 150rpx auto;

  .dj-image {
    width: 400rpx;
    border-radius: 20rpx;
  }
}
</style>
