<template>
  <view class="player-controller" v-if="playList.length > 0">
    <view
      @click="handleJumpPage"
      class="pic-url animation_rotate"
      :style="{ 'animation-play-state': isPlayer ? 'running' : 'paused' }"
    >
      <image class="image" :src="coverUrl" />
    </view>
    <view class="info" @click="handleJumpPage">
      <text class="song-name">
        {{ name }}
      </text>
      <text class="author-name">
        -
        {{ authorName.join("/") }}
      </text>
    </view>
    <view class="controller">
      <text
        @click="operation"
        :class="[isPlayer ? 'icon-zanting' : 'icon-bofang']"
      ></text>
      <text class="icon-24gf-playlist" @click.prevent="handleEmitClick"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/store";
import { storeToRefs } from "pinia";
const emit = defineEmits(["showList"]);
withDefaults(
  defineProps<{
    bottom?: string;
  }>(),
  {
    bottom: "45px"
  }
);
const musicStore = useMusicStore();
const { coverUrl, authorName, name, isPlayer, playList } =
  storeToRefs(musicStore);

function handleJumpPage() {
  uni.navigateTo({
    url: "/subPlay/play/play"
  });
}

function handleEmitClick() {
  console.log("first 触发显示菜单~~~~~~");
  emit("showList");
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
  bottom: v-bind("$props.bottom");
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
  color: #000;
  .pic-url {
    border: 8px solid #000;
    border-radius: 50%;
    width: 90rpx;
    height: 90rpx;
    margin-left: 40rpx;
    margin-right: 15rpx;
    .image {
      width: 100%;
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
