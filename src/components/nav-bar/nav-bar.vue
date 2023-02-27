<template>
  <view
    class="nav-bar"
    :style="{ background: top ? '#f7f6fb' : 'transparent' }"
    :class="{ top: top }"
  >
    <!-- #ifdef MP-WEIXIN || APP-PLUS -->
    <view class="placeholder" />
    <!-- #endif -->

    <view class="content">
      <view class="left" @click="handleLeftClick">
        <slot name="left">
          <view class="iconfont icon-menu"></view>
        </slot>
      </view>
      <view class="center" @click="handleCenterClick">
        <slot name="center">
          <view class="iconfont icon-sousuo my-search"></view
          ><input
            :disabled="disabled"
            :style="{
              background: top ? '#fff' : '',
              border: !top ? '1px solid #ccc' : '0'
            }"
            class="my-input"
            :placeholder="tip"
          />
        </slot>
      </view>
      <view class="right" @click="handleRightClick">
        <slot name="right">
          <view class="iconfont icon-yuyin"></view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useCommonStore } from "@/store";

const emit = defineEmits(["left", "center", "right"]);
withDefaults(
  defineProps<{
    tip?: string;
    top?: boolean;
    contentHeight?: string;
    disabled?: boolean;
  }>(),
  {
    tip: "等待操作",
    top: false,
    contentHeight: "44px"
  }
);
const commonStore = useCommonStore();

function handleLeftClick() {
  emit("left");
}
function handleCenterClick() {
  emit("center");
}
function handleRightClick() {
  emit("right");
}
</script>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  z-index: 2;
  .placeholder {
    height: v-bind("commonStore.statusBarHeight");
  }
  .content {
    display: flex;
    justify-content: space-between;
    height: v-bind("contentHeight");
    line-height: v-bind("contentHeight");

    .right,
    .left {
      text-align: center;
      width: 12%;
      .iconfont {
        font-size: 45rpx;
      }
    }
    .center {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #858ca7;
      .my-search {
        position: absolute;
        left: 10px;
      }
      .my-input {
        width: 100%;
        height: 30px;
        padding: 0 30px;
        font-size: 12px;
        border-radius: 20px;
        background: linear-gradient(to right, #d8dbfa, #f3d7ee);
      }
    }
  }
}
</style>
