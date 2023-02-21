<template>
  <view
    class="music-list"
    :style="{
      background: anima ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'
    }"
    v-if="playList.length > 0"
    @click.stop="handleBgClick"
  >
    <view
      class="music-list-content"
      :style="{
        bottom: anima ? '15px' : '-9999px'
      }"
    >
      <view class="header">
        <text class="title_h1">当前播放</text>({{ playList.length }})
      </view>
      <view class="status">
        <view>
          <text :class="[playStatus[currentStatus].model]"> </text>
          <text> {{ playStatus[currentStatus].msg }}</text>
        </view>
        <view>
          <text class="icon-del"></text>
        </view>
      </view>
      <view class="container">
        <template v-for="(item, index) of playList" :key="item.id">
          <view
            class="container__item"
            @click.stop="handlePlayClick(item)"
            :class="{ active: currentPlayIndex === index }"
          >
            <view class="index">{{ index }}</view>
            <view class="name over-ellipsis">
              <text class="name-song over-ellipsis"> {{ item.name }}-</text>
              <text class="name-author over-ellipsis">{{
                item.authorName.join(" ")
              }}</text>
            </view>
            <view class="dt">{{ formatMusicTime(item.duration / 1000) }}</view>
            <view class="operate"><text class="icon-del"></text></view>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useMusicStore } from "@/store";
import { storeToRefs } from "pinia";

import { formatMusicTime, pauseMusic } from "@/utils";
import { onMounted, ref } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
}>();

const musicStore = useMusicStore();
const anima = ref(true);
onMounted(() => {
  anima.value = true;
});
const { playList, currentPlayIndex, currentStatus, isPlayer, currentTime } =
  storeToRefs(musicStore);
function handlePlayClick(item: any) {
  pauseMusic((flag: boolean) => {
    isPlayer.value = flag;
    currentTime.value = 0;
  });
  musicStore.playListToggleActions(item);
}

function handleBgClick() {
  anima.value = false;
  console.log("first 触发了 handleBgClick>>>>>>> 开始动画");
  setTimeout(() => {
    emit("update:modelValue", !props.modelValue);
    console.log("first 触发了 handleBgClick>>>>>>> 动画完成");
  }, 1000);
}
const playStatus = [
  {
    model: "icon-loop",
    msg: "单曲播放"
  },
  {
    model: "icon-circulation",
    msg: "列表播放"
  },
  {
    model: "icon-random",
    msg: "随机播放"
  }
];
</script>

<style scoped lang="scss">
.music-list {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  .music-list-content {
    position: absolute;
    background-color: #fff;
    width: 90%;
    padding: 20px;
    border-radius: 15px;
    transform: translateX(5%);
    bottom: 15px;
    transition: all 0.3s;

    z-index: 999;
    .header {
      position: sticky;
      top: 0;
    }
    .status {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 0;
      border-bottom: 1px solid #ccc;
      view {
        text {
          margin: 0 5rpx;
        }
      }
    }
    .container {
      max-height: 400px;
      overflow-y: auto;
      &__item {
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        padding: 20rpx 0;
        & > view {
          display: inline-block;
        }
        .index {
          width: 50px;
          text-align: center;
        }
        .name {
          width: 165px;

          &-song {
            width: 130px;
          }
          &-author {
            width: 35px;
            font-size: 16rpx;
          }
        }
        .dt {
          width: 50px;
          text-align: center;
        }
        .operate {
          width: 30px;
          text-align: right;
        }
      }
    }
  }
  .active {
    color: red;
  }
}
</style>
