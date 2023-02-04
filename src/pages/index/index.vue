<template>
  <view class="content">
    <nav-bar :tip="'推荐的数据'"> </nav-bar>
    <my-swiper height="350px" indicator="bottomLeft" :list="list"></my-swiper>
    <view class="main"> </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getIndexBannerService } from '@/service/index/index'
const list = ref([])

getIndexBannerService().then((res: any) => {
  list.value = res.banners.map((item: any) => {
    return { image: item.pic, title: item.typeTitle }
  })
})
</script>

<style lang="scss" scpoed>
.main {
  // padding: 0 20rpx;
}
</style>
