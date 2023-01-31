<template>
  <view class="nav-bar bg">
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
        <slot name="center"> </slot>
      </view>
      <view class="right">
        <!-- #ifndef MP-WEIXIN -->
        <slot name="right"></slot>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const res = uni.getSystemInfoSync()
const statusBarHeight = ref(res.statusBarHeight + 'px')
const contentHeight = ref('44px')
</script>

<style lang="scss">
.bg {
  background: linear-gradient(to right, #e7e5fb, #f7eaf4);
}

.nav-bar {
  .placeholder {
    height: v-bind('statusBarHeight');
  }
  .content {
    display: flex;
    justify-content: space-between;
    height: v-bind('contentHeight');
    line-height: v-bind('contentHeight');
    .iconfont {
      font-size: 60rpx;
    }
    .right,
    .left {
      text-align: center;
      width: 20%;
    }
    .center {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
