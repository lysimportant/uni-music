<template>
  <view class="search">
    <nav-bar>
      <template #left>
        <text class="icon-fanhui"></text>

      </template>
      <template #center>
        <input class="search-input" :placeholder="indexStore.searchKey"/>
      </template>
    </nav-bar>
    <view class="title_h2">search</view>
  </view>
</template>

<script lang="ts" setup>
import { useIndexStore } from "@/store"
const indexStore = useIndexStore()

</script>

<style scoped lang="scss">
.search {
  &-input {
    border: 1px solid #cccccc;

  }
}

</style>
