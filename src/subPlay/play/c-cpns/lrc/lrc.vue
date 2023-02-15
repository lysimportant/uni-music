<template>
  <view class="lrc" @click="$emit('show-lrc', false)">
    <scroll-view
      :scroll-top="scrollTop"
      scroll-y="true"
      class="my--scroll"
      scroll-with-animation
      @scroll="scroll"
    >
      <template v-for="(item, index) in lrcs" :key="index">
        <view class="line" :class="{ one: index === 0 }">
          <text
            :class="{
              active: currentIndex === index
            }"
            >{{ item.lrc }}</text
          >
        </view>
      </template>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useMusicStore } from "@/store";

defineEmits(["show-lrc"]);

const musicStore = useMusicStore();
const { lrcs, currentTime, currentIndex } = storeToRefs(musicStore);

function getIndex() {
  for (let i = 0; i < lrcs.value.length - 1; i++) {
    if (lrcs.value[i].time > currentTime.value) {
      if (currentIndex.value === i) return;
      currentIndex.value = i - 1;
      return;
    }
  }
}

const scrollTop = computed(() => {
  getIndex();
  return currentIndex.value * 40;
});

function scroll(event) {}
</script>
<style scoped lang="scss">
.lrc {
  flex: 1;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  /* #ifndef MP-WEIXIN */
  margin-top: 35px;
  height: 65vh;
  /* #endif */
  /* #ifdef MP-WEIXIN */
  margin-top: 35rpx;
  height: 60vh;
  /* #endif */
  .my--scroll {
    padding: 20px 30px;
    height: 100%;

    ::-webkit-scrollbar {
      width: 1px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      width: 1px;
      background-color: transparent;
    }
    .one {
      padding: 60% 0 80rpx;
    }
    .active {
      font-size: 35rpx;
      background-image: linear-gradient(60deg, rgba(255, 255, 255, 0.7), #fff);
      background-clip: text;
      color: transparent !important;
    }
    .line {
      left: 0;
      width: 100%;
      color: #949494;
      min-height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
