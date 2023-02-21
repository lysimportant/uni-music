<template>
  <view class="song-item" @click="handleItemClick">
    <view class="bg"></view>
    <image class="image" :src="item.picUrl" />
    <text class="text">{{ item?.name }}</text>
  </view>
</template>
<script setup lang="ts">
const props = defineProps<{
  item: any;
}>();

function handleItemClick() {
  uni.navigateTo({
    url: `/subDetail/song-detail/song-detail?id=${props.item.id}`
  });
}
</script>
<script lang="ts">
export default {
  name: "song-item"
};
</script>

<style lang="scss" scoped>
.song-item {
  position: relative;
  font-size: 16rpx;
  display: flex;
  flex-direction: column;
  margin-right: 10rpx;

  .bg {
    position: absolute;
    top: -10rpx;
    left: 20rpx;
    height: 20px;
    width: 90%;
    z-index: 0;
    background-color: rgba(204, 204, 204, 0.8);
    opacity: 0.65;
    border-radius: 10px;
  }
  .image {
    position: relative;
    z-index: 1;
    width: 250rpx;
    height: 250rpx;
    border-radius: 10rpx;
  }
  .text {
    font-size: 25rpx;
    margin: 10rpx 0;
    @include show_text(2);
  }
}
</style>
