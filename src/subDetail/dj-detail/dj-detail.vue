<template>
  <l-detail :detail="DJDetail">
    <template #body>
      <template v-for="item of playList" :key="item.id">
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

import { formatTimeDiff, formatCount, formatMusicTime } from "@/utils";

const musicStore = useMusicStore();
const { playList, DJDetail } = storeToRefs(musicStore);

function handlePlayClick(item: any) {
  musicStore.getMusicURLByIdAction(item.mainSong.id, 1, item.id);
  uni.navigateTo({
    url: "/subPlay/play/play"
  });
}

const djDetail = computed(() => ({
  avatarUrl: DJDetail.value.dj?.avatarUrl,
  picUrl: DJDetail.value.picUrl,
  name: DJDetail.value.name,
  nickname: DJDetail.value.dj?.nickname,
  categorys: [DJDetail.value.category],
  desc: DJDetail.value.desc
}));

onLoad(function (options: any) {
  musicStore.getDJDetailActions(options.cid);
});
</script>

<style scoped lang="scss">
@import "../commom/common.scss";
</style>
