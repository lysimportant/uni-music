<template>
  <view class="status">
    <text>{{ formatTimeComputed(currentTime * 1000) }}</text>
    <slider
      class="slide"
      :value="currentTime"
      :max="duration"
      @change="sliderChange"
      @changing="slideDownChange"
      activeColor="#cfcfcf"
      backgroundColor="#949494"
      block-color="#fff"
      block-size="12"
    />
    <text>{{ formatTimeComputed(currentMusic.dt) }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";

import { useMusicStore } from "@/store";

import player, { seekMusicDuration, playMusic } from "@/utils/audio";
import { formatMusicTime } from "@/utils";

const musicStore = useMusicStore();
const { currentMusic, isPlayer, currentStatus, currentTime, duration } =
  storeToRefs(musicStore);

// 监听音乐进度
const down = ref(false); // 是否按下
// 放开进度条
function sliderChange(val) {
  currentTime.value = val.detail.value;
  seekMusicDuration(val.detail.value);
  down.value = false;
}
// 按下进度条 ing
function slideDownChange(val) {
  down.value = true;
  currentTime.value = val.detail.value;
}
let saveTimer: any = null;
function timeFn() {
  !down.value && (currentTime.value = player.currentTime);
  duration.value !== player.duration && (duration.value = player.duration);
}
watch(
  () => isPlayer.value,
  (n) => {
    if (n) {
      saveTimer = setInterval(timeFn, 1000);
    } else {
      clearInterval(saveTimer);
      saveTimer = null;
    }
  },
  {
    deep: true,
    immediate: true
  }
);

// TODO: 考虑迁移到 APP监听
player.onEnded((res) => {
  if (currentStatus.value === 0) {
    console.log("单曲播放");
    seekMusicDuration(0);
    playMusic();
  } else if (currentStatus.value === 1) {
    console.log("列表播放");
  } else if (currentStatus.value === 2) {
    console.log("随机播放");
  }
});

// 播放当前时间的进度 歌的总时长
const formatTimeComputed = computed(() => formatMusicTime);
</script>

<style scoped lang="scss">
.status {
  position: relative;
  z-index: 2;
  margin: 10rpx 0;
  display: flex;
  align-items: center;
  .badge-button {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
  }
  & > text {
    color: #fff;
    width: 15%;
    text-align: center;
  }
  .slide {
    flex: 1;
  }
}
</style>
