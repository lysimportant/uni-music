<template>
  <nav-bar>
    <template #left>
      <text @click="backClick" class="arrow icon-fanhui"></text>
    </template>
    <template #center>
      <view class="search-center">
        <text class="icon-search icon-sousuo"></text>
        <input
          v-model="searchStore.key"
          @confirm="handleConfirmEvent"
          class="search-input"
          focus
          :placeholder="text ?? '热门词'"
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
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

import { useSearchStore } from "@/store";
import { cache } from "@/utils";
const emit = defineEmits(["searchEvent"]);
const text = ref("");
const searchStore = useSearchStore();

function handleConfirmEvent() {
  const _history = cache.get("search-history");
  if (searchStore.key === "") {
    emit("searchEvent", text.value);
    cache.set("search-history", _history && _history + text.value + ",");
  } else {
    emit("searchEvent", searchStore.key);
    cache.set("search-history", _history + searchStore.key + ",");
  }
}

onLoad(function (options: any) {
  text.value = options.key;
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
.arrow {
  font-size: 20px;
}
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
    color: #000;
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
