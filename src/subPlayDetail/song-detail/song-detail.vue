<template>
  <l-detail :detail="detailCmp">
    <template #body>
      <template v-for="item of songDetail.AllSongs" :key="item.id">
        <flex-cpn>
          <template #left>
            <image class="detail-content__body__image" :src="item.coverUrl" />
          </template>
          <template #center>
            <view
              class="detail-content__body__info"
              @click="handlePlayClick(item)"
            >
              <view class="detail-content__body__info__name">
                {{ item.name }}
              </view>
              <view class="detail-content__body__info__other">
                <text>
                  {{ formatTimeDiff(item.scheduledPublishTime) }}
                </text>
                <text>{{ formatCount(item.listenerCount) }}</text>
                <text>{{ formatMusicTime(item.duration / 1000) }}</text>
              </view>
            </view>
          </template>
        </flex-cpn>
      </template>
    </template>
  </l-detail>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { onLoad } from "@dcloudio/uni-app";

import { useMusicStore } from "@/store";

import { formatTimeDiff, formatCount, formatMusicTime } from "@/utils";

const musicStore = useMusicStore();
const { songDetail } = storeToRefs(musicStore);

function handlePlayClick(item: any) {
  musicStore.getMusicURLByIdAction(item.id);
}
const detailCmp = computed(() => ({
  picUrl: songDetail.value.coverImgUrl,
  name: songDetail.value.name,
  nickname: songDetail.value.creator.nickname,
  avatarUrl: songDetail.value.creator.avatarUrl,
  categorys: songDetail.value.tags,
  desc: songDetail.value.description
}));

onLoad(function ({ id }: any) {
  musicStore.getSongDetailActions(id);
});
</script>

<style scoped lang="scss">
.detail-content__body {
  &__image {
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
  }
  &__info {
    padding: 0 20rpx;
    text-align: left;

    &__name {
      line-height: 35px;
      font-size: 20px;
    }
    &__other {
      text {
        font-size: 20rpx;
        color: var(--default-color);
        margin-right: 20rpx;
      }
    }
  }
}
</style>
