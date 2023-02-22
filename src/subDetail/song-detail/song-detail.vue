<template>
  <l-detail :detail="detailCmp" v-if="songDetail">
    <template #body>
      <template v-for="item of songDetail.AllSongs" :key="item.id">
        <flex-cpn margin="5px 0">
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
          <template #right><text></text></template>
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

import {
  formatTimeDiff,
  formatCount,
  formatMusicTime,
  pauseMusic
} from "@/utils";

const musicStore = useMusicStore();
const { playList, songDetail } = storeToRefs(musicStore);

function handlePlayClick(item: any) {
  pauseMusic();
  const _music = playList.value.findIndex((itemx: any) => itemx.id === item.id);
  if (_music >= 0) {
    musicStore.playListToggleActions(item);
    return;
  }

  musicStore.getMusicURLByIdAction(item.id, 1, 0, true);
  playList.value = songDetail.value.AllSongs;

  uni.navigateTo({
    url: "/subPlay/play/play"
  });
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
@import "../commom/common.scss";
</style>
