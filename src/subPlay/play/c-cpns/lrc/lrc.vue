<template>
  <view class="lrc" @click="$emit('show-lrc', false)">
    <view class="show-arrow-time" v-show="touchMove">
      <text class="arrow icon-sanjiaoright"></text>
      <text class="arrow-line"></text>
      <text class="time">
        {{ formatCurrentMusic(currentTime) }} {{ currentTIme_ }}
      </text>
    </view>
    <scroll-view
      @touchend="debounce"
      @touchstart="touchMove = true"
      :scroll-top="scrollTop"
      scroll-y="true"
      class="my--scroll"
      scroll-with-animation
      @scroll="scroll"
      v-if="isToggle"
    >
      <view class="one"></view>
      <template v-for="(item, index) in lrcs" :key="item.time">
        <view class="line">
          <text :class="currentIndex === index && 'active'">
            {{ item.lrc }}
          </text>
        </view>
      </template>
      <view class="last"></view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { useMusicStore } from "@/store";

import { formatMusicTime, useDebounce } from "@/utils";
defineEmits(["show-lrc"]);

const musicStore = useMusicStore();
const { lrcs, currentTime, currentIndex } = storeToRefs(musicStore);
const formatCurrentMusic = computed(() => formatMusicTime);
const touchMove = ref(false);

const isToggle = ref(true);
watch(
  () => lrcs.value,
  () => {
    setTimeout(() => {
      isToggle.value = false;
      nextTick(() => {
        isToggle.value = true;
      });
    }, 200);
  }
);

const debounce = useDebounce(() => {
  touchMove.value = false;
}, 5000);

function getIndex() {
  for (let i = 0; i < lrcs.value.length - 1; i++) {
    if (lrcs.value[i].time > currentTime.value) {
      if (currentIndex.value === i) return;
      currentIndex.value = i - 1;
      return;
    }
  }
}

const currentTIme_ = ref("");
const scrollTop = computed(() => {
  getIndex();
  return currentIndex.value * 70;
});

function scroll(event: any) {
  for (let i = 0; i < lrcs.value.length - 1; i++) {
    if (lrcs.value[i].time > currentTime.value) {
      const index = Math.floor(event.detail.scrollTop / 60);
      const time = lrcs.value[index]?.time;
      if (!time) break;
      currentTIme_.value = formatMusicTime(time);
      break;
    }
  }
}
</script>
<style scoped lang="scss">
.lrc {
  flex: 1;
  position: relative;
  /* #ifndef MP-WEIXIN */
  margin-top: 35px;
  height: 65vh;
  /* #endif */
  /* #ifdef MP-WEIXIN */
  margin-top: 35rpx;
  height: 60vh;
  /* #endif */
  text-align: center;

  .show-arrow-time {
    position: absolute;
    /* #ifdef MP-WEIXIN */
    top: 50%;
    /* #endif */
    /* #ifndef MP-WEIXIN */
    top: 49%;
    /* #endif */
    left: 0;
    right: 0;
    z-index: 3;
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    .arrow {
      width: 8%;
      font-size: 25px;
      color: #949494;
    }
    .time {
      width: 15%;
      font-size: 15px;
      color: #949494;
    }
    .arrow-line {
      flex: 1;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  .my--scroll {
    box-sizing: border-box;
    // position: relative;
    padding: 20px 30px !important ;
    height: 100%;

    // ????????????

    ::-webkit-scrollbar {
      width: 1px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      width: 1px;
      background-color: transparent;
    }
    .one {
      padding: 50% 0 120rpx;
    }
    .last {
      padding: 80rpx 0 58%;
    }
    .active {
      font-size: 35rpx;
      background-image: linear-gradient(60deg, rgba(255, 255, 255, 0.6), #fff);
      background-clip: text;
      color: transparent !important;
    }
    .line {
      left: 0;
      width: 100%;
      height: 60px;
      color: #949494;
      margin: 20rpx 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
