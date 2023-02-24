<template>
  <view class="status">
    <text class="start">{{ formatTimeComputed(currentTime) }}</text>
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
    <text class="end">{{ formatTimeComputed(duration) }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";

import { useMusicStore } from "@/store";

import player, {
  seekMusicDuration,
  playMusic,
  pauseMusic,
  handleBackgroundAudio
} from "@/utils/audio";
import { formatMusicTime } from "@/utils";

const musicStore = useMusicStore();
const { isPlayer, currentStatus, currentTime, duration } =
  storeToRefs(musicStore);

// 监听音乐进度
const down = ref(false); // 是否按下
// 放开进度条
function sliderChange(val: any) {
  currentTime.value = val.detail.value;
  seekMusicDuration(val.detail.value);
  down.value = false;
}
// 按下进度条 ing
function slideDownChange(val: any) {
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
  (n: any) => {
    if (n) {
      saveTimer = setInterval(timeFn, 900);
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
  if (currentStatus.value != 0) {
    pauseMusic((falg: boolean) => {
      musicStore.isPlayer = falg;
      musicStore.currentTime = 0;
      musicStore.duration = 0;
      musicStore.lrcs = [];
    });
  }

  if (currentStatus.value === 0) {
    musicStore.currentTime = 0;
    musicStore.isPlayer = false;
    seekMusicDuration(0);
    setTimeout(() => {
      handleBackgroundAudio(
        musicStore.name,
        musicStore.authorName.join(" "),
        musicStore.coverUrl
      );
      playMusic();
    });
  } else if (currentStatus.value === 1) {
    musicStore.currentPlayIndex += 1;
    if (musicStore.currentPlayIndex >= musicStore.playList.length) {
      musicStore.currentPlayIndex = 0;
    }
    return musicStore.playListToggleActions(
      null,
      musicStore.type,
      musicStore.currentPlayIndex
    );
  } else if (currentStatus.value === 2) {
    let random = Math.ceil(Math.random() * musicStore.playList.length);
    if (musicStore.currentPlayIndex === random) random++;
    if (random < 0) random = 0;
    if (random >= musicStore.playList.length) random--;
    console.log("first: ", random);
    musicStore.playListToggleActions(null, musicStore.type, random);
    musicStore.currentPlayIndex = random;
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
  // bottom: 10px;
  display: flex;
  align-items: center;
  & > text {
    width: 12%;
    font-weight: 200;
    font-size: 20rpx;
    text-align: center;
  }
  .start {
    color: #fff;
  }
  .end {
    color: #949494;
  }
  .slide {
    flex: 1;
    margin: 10rpx 0 !important;
  }
}
</style>
