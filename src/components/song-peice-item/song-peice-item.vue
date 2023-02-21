<template>
  <view class="song-peice-item" @click="$emit('click', item.id)">
    <template v-if="showPic">
      <image class="image" :src="item.picUrl" />
    </template>
    <view class="content">
      <view class="name">{{ item.name }}</view>
      <view class="info">
        <template v-for="(ar, ind) in item.song.artists" :key="ind">
          {{ handler_(ar.name, ind, item.song.artists.length - 1) }}
        </template>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { handler_ } from "@/utils";
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
  name: "song-peice-item"
};
</script>

<style lang="scss" scoped>
.song-peice-item {
  display: flex;
  margin: 10rpx 0;
  .image {
    width: 120rpx;
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
