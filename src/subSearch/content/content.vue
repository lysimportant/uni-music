<template>
  <view class="content">
    <search-header @search-event="handleSearchEvent"></search-header>
    <l-tabs
      block-color="linear-gradient(to right,#fa383a, #ff7c79)"
      :opacity="0.7"
      v-model="currentTab"
      block-offset="-10px, -11px"
      active-color="#000"
      @change="handleSearchEvent"
      :list="list"
    >
      1
      <template #single>
        <view class="single">
          <template v-for="(item, index) of searchStore.searchList" :key="index">
            <song-peice-item :show-pic="false" :item="item"></song-peice-item>
          </template>
        </view>
      </template>

      <template #songs>
        <view class="songs">
          <template v-for="(item, index) of searchStore.searchSongs" :key="index">
            <view class="songs-item" @click="handleItemClick(item)">
              <image class="image" :src="item.picUrl" />
              <view class="info">
                <view class="name"> {{ item.name }}</view>
                <view class="other">
                  <text class="text">{{ item.trackCount }}首, </text>
                  <text class="text">by {{ item.authorName }}, </text>
                  <text class="text">播放{{ formatCountCmp(item.playCount) }}次</text>
                </view>
                <view class="tags">
                  <template v-for="(tag, indey) of item.officialTags" :key="indey">
                    <text class="tag"> {{ tag }}</text>
                  </template>
                </view>
              </view>
            </view>
          </template>
        </view>
      </template>
    </l-tabs>
    <player-controller bottom="0" @show-list="isShow = !isShow"></player-controller>
    <music-list v-model="isShow"></music-list>
  </view>
</template>

<script setup lang="ts">
import SearchHeader from "@/subSearch/components/search-header/search-header.vue";
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useSearchStore } from "@/store";
import { formatCount } from "@/utils";
const searchStore = useSearchStore();
const currentTab = ref(0);
const formatCountCmp = computed(() => formatCount);
const isShow = ref(false);
const list = [
  {
    name: "单曲",
    slotName: "single",
    type: 1
  },
  {
    name: "歌单",
    slotName: "songs",
    type: 1000
  }
];
function handleSearchEvent() {
  console.log("first", currentTab.value);
  searchStore.getSearchByNameAction({
    key: searchStore.key,
    type: list[currentTab.value].type
  });
}
function handleItemClick(item: any) {
  uni.navigateTo({
    url: `/subDetail/song-detail/song-detail?id=${item.id}`
  });
}
onLoad(function (options: any) {
  searchStore.key = options.key;
});
</script>

<style scoped lang="scss">
.content {
  .single {
    padding: 0 10px;
    & > view {
      padding-bottom: 5px;
      border-bottom: 1px solid #cccccc;
      :deep(.name) {
        color: var(--primary-color);
        margin: 5rpx 0;
      }
    }
  }
  .songs {
    padding: 0 10px;

    .songs-item {
      display: flex;
      margin: 10rpx 0;
      .image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 10rpx;
      }
      .info {
        margin-left: 10rpx;
        .name {
          margin-top: 10rpx;
          font-size: 600;
          color: #000;
        }
        .other {
          font-size: 22rpx;
          margin: 5rpx 0;
        }
        .tags {
          .tag {
            margin-right: 15rpx;
            color: #f88f5b;
            background: #fff2ea;
            font-size: 18rpx;
            padding: 3rpx;
            border-radius: 3rpx;
          }
        }
      }
    }
  }
}
</style>
