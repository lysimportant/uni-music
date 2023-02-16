<template>
  <view class="page-image" @click="$emit('show-lrc', true)">
    <view
      :style="{
        'animation-play-state': isPlayer ? 'running' : 'paused',
        backgroundImage: `url('${pan}')`
      }"
      class="pan animation_rotate"
    >
      <image class="pan-image" :src="currentMusic.picUrl" mode="heightFix" />
    </view>
    <image
      :style="{
        transform: isPlayer
          ? 'rotate(20deg)   translate(-16%, -102%)'
          : 'translate(40%, -100%)'
      }"
      :src="gan"
      class="gan"
      mode="heightFix"
    />
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMusicStore } from "@/store";

import gan from "@/static/play/gan.png";
import pan from "@/static/play/pan.png";

defineEmits(["show-lrc"]);
const musicStore = useMusicStore();
const { currentMusic, isPlayer } = storeToRefs(musicStore);
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
.page-image {
  /* #ifndef MP-WEIXIN */
  margin-top: 35px;
  height: 65vh;
  /* #endif */
  /* #ifdef MP-WEIXIN */
  margin-top: 35rpx;
  height: 60vh;
  /* #endif */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pan {
    position: relative;
    top: 20%;
    width: 280px;
    height: 280px;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .pan-image {
      border-radius: 50%;
      height: 380rpx;
    }
  }
  .gan {
    position: relative;
    top: -10%;
    transition: all 0.3s;
    transform-origin: 20px 70px;
  }
}
</style>
