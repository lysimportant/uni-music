<template>
  <view class="my-swiper">
    <u-swiper
      :height="height"
      :list="list"
      mode="dot"
      title
      :indicator-pos="indicator"
    >
    </u-swiper>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    list: any[];
    indicator?: string;
    height?: string;
    margin?: string;
  }>(),
  {
    list: [] as any,
    indicator: "bottomCenter",
    height: "250",
    margin: "0 0"
  }
);
</script>

<style lang="scss" scoped>
.my-swiper {
  padding: 0 20rpx;
  overflow: hidden;
  margin-top: v-bind(margin);
  .u-swiper-wrap {
    background-color: #fff;
    margin-top: 20rpx;
  }
}
</style>
