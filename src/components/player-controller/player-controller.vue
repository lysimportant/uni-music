<template>
  <view class="player-controller" v-if="currentMusic.url !== ''">
    <view
      @click="handleJumpPage"
      class="pic-url animation_rotate"
      :style="{ 'animation-play-state': isPlayer ? 'running' : 'paused' }"
    >
      <image
        class="image"
        :src="currentDj.coverUrl ?? currentMusic.picUrl"
        mode="heightFix"
      />
    </view>
    <view class="info" @click="handleJumpPage">
      <text class="song-name">
        {{ currentDj.name ?? currentMusic.name }}
      </text>
      <text class="author-name">
        -
        {{
          currentDj.authorName.join("/") ?? currentMusic.authorName.join("/")
        }}
      </text>
    </view>
    <view class="controller">
      <text
        @click="operation"
        :class="[isPlayer ? 'icon-zanting' : 'icon-bofang']"
      ></text>
      <text class="icon-24gf-playlist"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/store";
import { storeToRefs } from "pinia";

const musicStore = useMusicStore();
const { currentMusic, isPlayer, currentDj } = storeToRefs(musicStore);

function handleJumpPage() {
  uni.navigateTo({
    url: "/subPlay/play/play"
  });
}
function operation() {
  musicStore.toggleMusicAction();
}
</script>
<script lang="ts">
export default {
  name: "player-controller"
};
</script>

<style lang="scss" scoped>
.player-controller {
  position: fixed;
  /* #ifdef H5 */
  bottom: 45px;
  /* #endif */
  /* #ifndef H5 */
  bottom: 0;
  /* #endif */
  left: 0;
  right: 0;
  height: 110rpx;
  background-color: rgba($color: #fff, $alpha: 1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  .pic-url {
    border: 8px solid #000;
    border-radius: 50%;
    width: 90rpx;
    height: 90rpx;
    margin-left: 40rpx;
    margin-right: 15rpx;
    .image {
      height: 100%;
      border-radius: 50%;
    }
  }
  .info {
    @include show_text(1);
    flex: 1;
    .author-name {
      color: #7d818a;
      // font-size: 20rpx;
    }
  }

  .controller {
    margin-right: 23rpx;
    text {
      margin: 0 20rpx;
      font-size: 45rpx;
    }
  }
}
</style>
