<template>
  <single-card title="推荐歌单">
    <view class="recommend">
      <template v-for="item in songs" :key="item.id">
        <song-item :item="item"></song-item>
      </template>
    </view>
  </single-card>
</template>

<script lang="ts" setup>
defineProps<{
  songs: any[];
}>();
</script>

<style scoped lang="scss">
.recommend {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 15rpx 0 0;
  &::-webkit-scrollbar {
    background: transparent;
  }
}
</style>
