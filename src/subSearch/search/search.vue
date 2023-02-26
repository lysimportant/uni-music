<template>
  <view class="search">
    <search-header @search-event="handleHistoryClick"></search-header>
    <view class="history">
      <view class="header">搜索历史</view>
      <view class="content">
        <text class="tag" @click="handleHistoryClick('勾指起誓')">勾指起誓</text>
        <text class="tag">勾指起誓</text>
        <text class="tag">勾指起誓</text>
        <text class="tag">勾指起誓</text>
      </view>
    </view>
    <view scroll-x scroll-with-animation class="recommend-list">
      <template v-for="itemy of list">
        <view class="recommend-list__content">
          <view class="header title_h2">{{ itemy }}</view>
          <view class="body">
            <template v-for="(itemx, index) of searchStore.searchHotList">
              <view class="item" @click="handleItemClick(itemy, itemx)">
                <text class="index" :class="index < 3 && 'active'">{{ index + 1 }}</text>
                <text class="name over-ellipsis">{{ itemx.searchWord }}</text>
              </view>
            </template>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { useSearchStore } from "@/store";
import { useNavigate } from "@/utils";
import SearchHeader from "@/subSearch/components/search-header/search-header.vue";
const searchStore = useSearchStore();

const list = ["热搜榜", "有声书榜 接口问题没实现", "有声书榜 接口问题没实现"];
function handleItemClick(type: string, item: any) {
  if (type === list[0]) {
    handleHistoryClick(item.searchWord);
  }
}
function handleHistoryClick(val: string) {
  useNavigate("page", "/subSearch/content/content", { key: val });
}

onLoad(function (options: any) {
  console.log(options.key);
  searchStore.getSearchHostListAction();
});
</script>

<style scoped lang="scss">
.search {
  background: #f7f8fc;

  .history {
    padding: 20px;
    .header {
      margin: 10px 0;
      font-weight: 600;
    }
    .tag {
      background: #fff;
      padding: 5px;
      border-radius: 5px;
      margin-right: 5px;
    }
  }
  .recommend-list {
    margin-top: 20px;
    overflow-x: auto;
    white-space: nowrap;
    .recommend-list__content {
      display: inline-block;
      width: 65%;
      margin-left: 20px;
      background: #ffffff;
      padding: 10px;
      border-radius: 10px;
      .header {
        font-weight: 600;
        padding-bottom: 10px;
        border-bottom: 1px solid #cccccc;
      }
      .body {
        .item {
          margin: 10px 0;
          padding: 5px 0;
          .index {
            margin: 0 10px;
          }
        }
      }
    }
  }
  .active {
    color: red;
    font-weight: 600;
  }
}
</style>
