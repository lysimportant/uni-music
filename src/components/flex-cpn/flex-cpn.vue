<template>
  <view class="flex-cpn" :style="{ height: height, margin: margin }">
    <view class="left" :style="{ width: lfetWidth }">
      <slot name="left">左</slot></view
    >
    <view class="center"> <slot name="center">中</slot></view>
    <view class="right" :style="{ width: rightWidth }">
      <slot name="right">右</slot></view
    >
  </view>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    lfetWidth?: string;
    rightWidth?: string;
    height?: string;
    margin?: string;
  }>(),
  {
    lfetWidth: "15%",
    rightWidth: "15%"
  }
);
</script>

<style scoped lang="scss">
.flex-cpn {
  display: flex;
  // line-height: v-bind("$props.height");
  .center {
    flex: 1;
  }
}
</style>
