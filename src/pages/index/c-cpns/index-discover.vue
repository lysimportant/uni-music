<template>
  <view class="discover">
    <template v-for="(item, index) in discoverIcons" :key="item.id">
      <view class="item">
        <image class="image" :src="item.iconUrl" />
        <text v-if="index === 0" class="date">30</text>
        <text class="text">
          {{ item.name }}
        </text>
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
defineProps<{
  discoverIcons: any[];
}>();
</script>

<style scoped lang="scss">
.discover {
  // white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 10px 0;
  &::-webkit-scrollbar {
    max-width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
    background-color: transparent;
  }

  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 200rpx;
    margin: 0 20rpx;
    align-items: center;
    .date {
      position: absolute;
      top: 20px;
      color: #fff;
      font-weight: 500;
    }
    .image {
      width: 100rpx;
      height: 100rpx;
    }
    .text {
      color: #666f7e;
      font-size: 12px;
    }
  }
}
</style>
