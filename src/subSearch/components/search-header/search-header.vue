<template>
  <nav-bar>
    <template #left>
      <text @click="backClick" class="icon-fanhui"></text>
    </template>
    <template #center>
      <view class="search-center">
        <text class="icon-search icon-sousuo"></text>
        <input
          v-model="searchStore.key"
          @confirm="handleConfirmEvent"
          class="search-input"
          focus
          :placeholder="indexStore.searchKey ?? '热门词'"
        />
      </view>
    </template>
    <template #right>
      <text class="btn" @click="handleConfirmEvent">搜索</text>
    </template>
  </nav-bar>
  <view class="body"> </view>
</template>
<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";

import { useIndexStore, useSearchStore } from "@/store";

const emit = defineEmits(["searchEvent"]);

const indexStore = useIndexStore();
const searchStore = useSearchStore();

function handleConfirmEvent() {
  emit("searchEvent");
}

onLoad(function (options: any) {
  searchStore.key = options.key;
});

function backClick() {
  uni.navigateBack();
}
</script>
<script lang="ts">
export default {
  name: "search-header"
};
</script>

<style scoped lang="scss">
.search-center {
  //position: relative;
  width: 100%;
  .icon-search {
    position: absolute;
    top: 0;
    left: 5px;
  }
  .search-input {
    padding: 5px 10px 5px 25px;
    border: 1px solid #cccccc;
    border-radius: 100px;
    background: #ffffff;
  }
  .btn {
    width: 100%;
    height: 30px;
  }
}
</style>
