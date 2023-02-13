<template>
  <div class="my-swiper">
    <u-swiper
      :height="height"
      :list="list"
      mode="dot"
      title
      :indicator-pos="indicator"
    >
    </u-swiper>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    list: any[];
    indicator?: string;
    height?: string;
  }>(),
  {
    list: [] as any,
    indicator: "bottomCenter",
    height: "250"
  }
);
</script>

<style lang="scss" scoped>
.my-swiper {
  padding: 0 20rpx;
  overflow: hidden;
  .u-swiper-wrap {
    background-color: #fff;
    margin-top: 20rpx;
  }
}
</style>
