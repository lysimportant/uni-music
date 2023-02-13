<template>
  <view class="nav-bar">
    <!-- #ifdef MP-WEIXIN || APP-PLUS -->
    <view class="placeholder" />
    <!-- #endif -->

    <view class="content">
      <view class="left">
        <slot name="left">
          <view class="iconfont icon-menu"></view>
        </slot>
      </view>
      <view class="center">
        <slot name="center">
          <view class="iconfont icon-sousuo my-search"></view
          ><input class="my-input" :placeholder="tip" />
        </slot>
      </view>
      <view class="right">
        <slot name="right">
          <view class="iconfont icon-yuyin"></view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
withDefaults(
  defineProps<{
    tip?: string;
    contentHeight?: string;
  }>(),
  {
    tip: "等待操作",
    contentHeight: "44px"
  }
);
const res = uni.getSystemInfoSync();
const statusBarHeight = ref(res.statusBarHeight + "px");
</script>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  z-index: 2;
  .placeholder {
    height: v-bind("statusBarHeight");
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
        font-size: 55rpx;
      }
    }
    .center {
      position: relative;
      // left: 0;
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
