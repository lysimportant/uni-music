<template>
  <l-detail :detail="djDetail">
    <template #body>
      <template v-for="item of list" :key="item.id">
        <flex-cpn>
          <template #left>
            <image
              class="detail-content__body__image"
              :src="item.coverUrl"
              mode="widthFix"
            />
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

import { useDJStore, useMusicStore } from "@/store";

import { formatTimeDiff, formatCount, formatMusicTime } from "@/utils";

const DJStore = useDJStore();
const musicStore = useMusicStore();
const { list, detail } = storeToRefs(DJStore);

function handlePlayClick(item: any) {
  musicStore.getMusicURLByIdAction(item.mainSong.id);
}

const djDetail = computed(() => ({
  avatarUrl: detail.value.dj?.avatarUrl,
  picUrl: detail.value.picUrl,
  name: detail.value.name,
  nickname: detail.value.dj?.nickname,
  categorys: [detail.value.category],
  desc: detail.value.desc
}));

onLoad(function (options: any) {
  DJStore.getDJDetailActions(options.cid);
});
</script>

<style scoped lang="scss">
.detail-content__body {
  &__image {
    width: 100%;
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
