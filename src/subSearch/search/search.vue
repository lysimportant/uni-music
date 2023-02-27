<template>
  <view class="search">
    <search-header @search-event="handleHistoryClick"></search-header>
    <view class="history">
      <view class="header">
        <text>搜索历史</text>
        <text class="icon-del" @click.stop="handleRemoveHistoryClick"></text>
      </view>
      <view class="content">
        <template v-for="item of history">
          <text class="tag over-ellipsis" @click="handleHistoryClick(item)">
            {{ item }}
            <text class></text>
          </text>
        </template>
      </view>
    </view>
    <view class="recommend-list">
      <template v-for="(itemy, indexy) of list">
        <template v-if="indexy === 0">
          <search-hot
            :list="searchStore.searchHotList"
            @song="handleHistoryClick"
            :typelist="list"
            :listname="itemy"
          ></search-hot>
        </template>
        <!--  -->
        <template v-if="indexy === 1">
          <search-hot
            :typelist="list"
            @dj="handleDJEvent"
            :list="searchStore.searchHotDJList"
            :listname="itemy"
          ></search-hot>
        </template>
        <template v-if="indexy === 2">
          <search-hot
            :typelist="list"
            :list="searchStore.searchHotDJList"
            :listname="itemy"
          ></search-hot>
        </template>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { useSearchStore } from "@/store";
import { cache, useNavigate } from "@/utils";
import SearchHeader from "@/subSearch/components/search-header/search-header.vue";
import SearchHot from "@/subSearch/components/search-hot/search-hot.vue";
const searchStore = useSearchStore();

const list = ["热搜榜", "播客", "播客"];
const history = ref<string[]>([]);
function handleHistoryClick(val: string) {
  const _history = cache.get("search-history");
  if (_history) {
    cache.set("search-history", _history + val + ",");
  } else {
    cache.set("search-history", val + ",");
  }
  useNavigate("page", "/subSearch/content/content", { key: val });
}
function handleRemoveHistoryClick() {
  console.log("删除历史记录");
  cache.remove("search-history");
  history.value = [];
  setTimeout(() => {
    setHistory();
  });
}

function handleDJEvent(item: any) {
  useNavigate("page", "/subDetail/dj-detail/dj-detail", { cid: item.id });
}

onShow(() => {
  searchStore.getSearchHostListAction();
  setHistory();
});

function setHistory() {
  const _history: string = cache.get("search-history");
  console.log(_history);
  if (_history) {
    history.value = Array.from(new Set(_history.split(","))).filter((item: string) => item !== "");
  }
}
</script>

<style scoped lang="scss">
.search {
  background: #f7f8fc;

  .history {
    padding: 0 20px 10px;
    .header {
      margin: 10px 0;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
    .tag {
      display: inline-block;
      background: #fff;
      padding: 5px;
      border-radius: 5px;
      margin-right: 5px;
      margin: 10rpx;
      margin-left: 0;
    }
  }
  .recommend-list {
    margin-top: 20px;
    overflow-x: auto;
    white-space: nowrap;
    vertical-align: top;
  }
  .active {
    color: red;
    font-weight: 600;
  }
}
</style>
