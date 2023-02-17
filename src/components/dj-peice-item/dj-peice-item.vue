<template>
  <view class="dj-peice-item" @click="$emit('click', item)">
    <template v-if="showPic">
      <image class="image" :src="item.blurCoverUrl" mode="heightFix" />
    </template>
    <view class="content">
      <view class="name">{{ item.name }}</view>
      <view class="info"> {{ item.dj.nickname }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineEmits(["click"]);
withDefaults(
  defineProps<{
    showPic?: boolean;
    item: any;
  }>(),
  {
    showPic: true,
    item: {}
  }
);
</script>
<script lang="ts">
export default {
  name: "dj-peice-item"
};
</script>

<style lang="scss" scoped>
.dj-peice-item {
  display: flex;
  margin: 10rpx 0;
  .image {
    height: 120rpx;
    border-radius: 10rpx;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 15rpx;
    .name {
      color: #4c5667;
    }
    .info {
      color: #a9b1ba;
    }
  }
}
</style>
