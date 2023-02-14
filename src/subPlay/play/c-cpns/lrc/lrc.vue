<template>
  <view class="lrc" @click="$emit('show-lrc', false)">
    <view ref="lrcContentRef" class="lrc-content">
      <template v-for="(item, index) of lrcs" :key="index">
        <view class="line">{{ item.lrc }} </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";

import { useMusicStore } from "@/store";

defineEmits(["show-lrc"]);

const musicStore = useMusicStore();
const { lrcs, currentTime } = storeToRefs(musicStore);
// const lrcContentRef = ref<Element>();
// onMounted(() => {
//   lrcContentRef.value = document.querySelector(".lrc")!;
// });
// const currentIndex = computed(() => {
//   lrcs.value.findIndex((item, index) => {
//     return currentTime.value > item.time;
//   });
// });
// watch(
//   () => currentTime.value,
//   () => {
//     lrcContentRef.value?.scrollTo({
//       top: currentTime.value * 10,
//       behavior: "smooth"
//     });
//   }
// );
</script>
<script lang="ts">
export default {
  options: {
    // 微信小程序中 options 选项
    multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
    styleIsolation: "isolated", //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
    addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
    virtualHost: true //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
  }
};
</script>
<style scoped lang="scss">
.lrc {
  // flex: 1;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  /* #ifndef MP-WEIXIN */
  margin-top: 35px;
  height: 70vh;
  /* #endif */
  /* #ifdef MP-WEIXIN */
  margin-top: 35rpx;
  height: 65vh;
  /* #endif */
  overflow-y: auto;
  .lrc-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    // flex-direction: row;
    height: 100%;
    padding-top: 100%;
    .line {
      text-align: center;
      width: 100%;
      height: 60rpx;
      line-height: 60rpx;
    }
  }
}
</style>
