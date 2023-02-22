<template>
  <view class="music-list" @tap.stop @touchmove.stop v-if="showMain">
    <view
      class="music-list-bg"
      :class="activeMain && 'music-list-bg_active'"
      @click.stop="handleBgClick"
    />
    <view
      class="music-list-content"
      :class="activeMain && 'music-list-content_active'"
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
import { nextTick, onMounted, ref, watch } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
}>();

const musicStore = useMusicStore();
onMounted(() => {
  musicStore.currentPlayIndex = musicStore.playList.findIndex(
    (item: any) => item.id === musicStore.id
  );
});
const showMain = ref(false);
const activeMain = ref(false);
// 异步修改样式
watch(
  () => props.modelValue,
  (newVal) => {
    console.log("watch=>", newVal);
    if (newVal) {
      showMain.value = true;
      setTimeout(() => {
        activeMain.value = true;
      });
    } else {
      activeMain.value = false;
      setTimeout(() => {
        showMain.value = false;
      }, 300);
      // 300的延迟是和transition的动画时间一致
    }
  }
);

const { playList, currentPlayIndex, currentStatus, isPlayer, currentTime } =
  storeToRefs(musicStore);
function handlePlayClick(item: any) {
  pauseMusic((flag: boolean) => {
    isPlayer.value = flag;
    currentTime.value = 0;
    console.log("first  音乐暂停");
  });
  musicStore.playListToggleActions(item, 1);
}

function handleBgClick() {
  emit("update:modelValue", !props.modelValue); // 只更新外部的值，内部由watch去处理
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
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  color: #000;
  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: all 0.3s ease-out;
    &_active {
      opacity: 1;
    }
  }
  &-content {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 90%;
    padding: 20px;
    border-radius: 15px;
    transform: translateX(5%) translateY(100%);
    transition: all 0.3s;
    z-index: 999;
    &_active {
      transform: translateX(5%) translateY(-15px);
    }
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
