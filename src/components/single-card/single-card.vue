<template>
  <view class="single-card">
    <view class="header">
      <view class="left title_h2">
        <slot name="left">
          <text>{{ title }}</text>
          <text class="iconfont arrow icon-jiantou_liebiaoxiangyou"></text>
        </slot>
      </view>
      <view class="right">
        <slot name="right"></slot>
      </view>
    </view>
    <view class="cotent">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
  }>(),
  {
    title: "默认标题"
  }
);
</script>
<script lang="ts">
export default {
  name: "single-card"
};
</script>

<style scoped lang="scss">
.single-card {
  .header {
    .left {
      display: flex;
      align-items: center;
      margin: 15rpx 0;
      .arrow {
        margin-left: -5px;
        font-size: 45rpx;
      }
    }
  }
}
</style>
