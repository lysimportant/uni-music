<template>
  <view class="controller">
    <template v-for="(item, index) of playStatus" :key="item.mdoel">
      <text
        v-if="currentStatus === index"
        class="model"
        :class="item.model"
        @click="showModel()"
      ></text>
    </template>
    <template v-for="(item, index) of controllerIcons" :key="item">
      <template v-if="index === 1 || index === 2">
        <text
          v-if="item === 'icon-zanting play' && isPlayer"
          :class="item"
          @click="musicStore.toggleMusicAction"
        ></text>
        <text
          v-if="item === 'icon-bofang play' && !isPlayer"
          @click="musicStore.toggleMusicAction"
          :class="item"
        ></text>
      </template>
      <template v-else>
        <text
          :class="item"
          @tap.stop
          @touchmove.top
          @click.stop.prevent="handleOperationClick(item)"
        ></text>
      </template>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useMusicStore } from "@/store";

import { playStatus, controllerIcons } from "../../config";

const emit = defineEmits(["show-list"]);

const musicStore = useMusicStore();
const { isPlayer, currentStatus, currentPlayIndex, type, playList } =
  storeToRefs(musicStore);

function handleOperationClick(item: string) {
  if (item.includes("list")) {
    emit("show-list");
  }
  if (item.includes("next")) {
    currentPlayIndex.value++;
    if (currentPlayIndex.value === playList.value.length) {
      currentPlayIndex.value--;
    }
    musicStore.playListToggleActions({}, type.value, currentPlayIndex.value);
  }
  if (item.includes("per")) {
    currentPlayIndex.value--;
    if (currentPlayIndex.value < 0) {
      currentPlayIndex.value = playList.value.length;
    }
    musicStore.playListToggleActions({}, type.value, currentPlayIndex.value);
  }
}

// 切换模式显示
function showModel() {
  currentStatus.value++;
  if (currentStatus.value >= 3) currentStatus.value = 0;
  uni.showToast({
    icon: "success",
    title: playStatus[currentStatus.value].msg
  });
}
</script>

<style scoped lang="scss">
.controller {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  // height: 120rpx;
  color: #ccc;
  padding-left: 9%;
  z-index: 1;
  padding-bottom: 25px;
  text {
    width: 15%;
    font-size: 50rpx;
    margin: 0 10rpx;
    text-align: center;
  }
  .play {
    color: #fff;
    font-size: 80rpx !important;
  }
  .list {
    font-size: 45rpx;
  }
}
</style>
