<template>
  <view class="play-index">
    <view
      class="bg"
      :style="{ backgroundImage: `url('${currentMusic.picUrl}')` }"
    ></view>
    <view class="play-index-content">
      <nav-bar>
        <template #left>
          <text @click="backClick" class="arrow icon-arrow-bottom"> </text>
        </template>
        <template #center>
          <view class="content">
            <view class="name">{{ currentMusic.name }}</view>
            <view class="author">{{ currentMusic.authorName.join("/") }}</view>
          </view>
        </template>
        <template #right></template>
      </nav-bar>
      <view class="page-image">
        <view
          :style="{
            'animation-play-state': isPlayer ? 'running' : 'paused',
            backgroundImage: `url('${pan}')`
          }"
          class="pan animation_rotate"
          @click="musicStore.toggleMusicAction"
        >
          <image class="image" :src="currentMusic.picUrl" mode="heightFix" />
        </view>
        <image
          :style="{
            transform: isPlayer
              ? 'rotate(20deg)   translate(-16%, -102%)'
              : 'translate(40%, -100%)'
          }"
          :src="gan"
          class="gan"
          mode="heightFix"
        />
      </view>
      <view class="operation">
        <view class="interaction"
          >{{ duration }}--------------{{ currentTime }}</view
        >
        <view class="status">
          <text>{{ formatCurrentTime(currentTime * 1000) }}</text>
          <slider
            class="slide"
            :value="currentTime"
            :max="duration"
            @change="sliderChange"
            @changing="slideDownChange"
            activeColor="#cfcfcf"
            backgroundColor="#949494"
            block-color="#fff"
            block-size="12"
          />
          <text>{{ formatMusicTotalTime }}</text>
        </view>
        <view class="controller">
          <template v-for="(item, index) of playStatus" :key="item.mdoel">
            <text
              v-if="currentStatus === index"
              class="model"
              :class="item.model"
              @click="showModel()"
            ></text>
          </template>
          <template v-for="(item, index) of controllerIcons" :key="item">
            <template v-if="index === 1 || index === 2">
              <text
                v-if="item === 'icon-zanting play' && isPlayer"
                :class="item"
                @click="musicStore.toggleMusicAction"
              ></text>
              <text
                v-if="item === 'icon-bofang play' && !isPlayer"
                @click="musicStore.toggleMusicAction"
                :class="item"
              ></text>
            </template>
            <template v-else>
              <text :class="item"></text>
            </template>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { useMusicStore } from "@/store";
import { storeToRefs } from "pinia";
import gan from "@/static/play/gan.png";
import pan from "@/static/play/pan.png";
import { formatMusicTime } from "@/utils";
import { playStatus, controllerIcons, backClick } from "./config";
import player, { seekMusicDuration } from "@/utils/audio";
const musicStore = useMusicStore();
const { currentMusic, isPlayer, currentStatus, currentTime, duration } =
  storeToRefs(musicStore);

const down = ref(false);
// 监听音乐进度
function sliderChange(val) {
  currentTime.value = val.detail.value;
  seekMusicDuration(val.detail.value);
  down.value = false;
}
function slideDownChange(val) {
  down.value = true;
  currentTime.value = val.detail.value;
}
let saveTimer: any = null;
function timeFn() {
  !down.value && (currentTime.value = player.currentTime);
}
watch(
  () => isPlayer.value,
  (n) => {
    if (n) {
      saveTimer = setInterval(timeFn, 1000);
    } else {
      clearInterval(saveTimer);
      saveTimer = null;
    }
  },
  {
    deep: true,
    immediate: true
  }
);
player.onEnded((res) => {
  if (currentStatus.value === 0) {
    console.log("单曲播放");
    seekMusicDuration(0);
  } else if (currentStatus.value === 1) {
    console.log("列表播放");
  } else if (currentStatus.value === 2) {
    console.log("随机播放");
  }
});
// 播放当前时间的进度
const formatCurrentTime = computed(() => formatMusicTime);
// 歌的总时长
const formatMusicTotalTime = computed(() =>
  formatMusicTime(currentMusic.value.dt)
);

// 切换模式显示
function showModel() {
  currentStatus.value++;
  if (currentStatus.value >= 3) currentStatus.value = 0;
  uni.showToast({
    icon: "success",
    title: playStatus[currentStatus.value].msg
  });
}
</script>

<script lang="ts">
export default {
  name: "play"
};
</script>

<style scoped lang="scss">
.play-index {
  position: relative;
  height: 100vh;
  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -50%;
    right: 0;
    filter: blur(30px);
    background-size: cover;
  }
  .play-index-content {
    position: relative;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    display: flex;
    flex-direction: column;

    .nav-bar {
      .content {
        text-align: center;
        // position: absolute;
        // display: flex;
        .arrow {
          color: #fff;
          font-size: 50rpx;
        }
        flex-direction: column;
        .name {
          height: 24px;
          color: #fff;
          font-size: 30rpx;
          margin-bottom: 10rpx;
        }
        .author {
          font-size: 25rpx;
          color: #ccc;
          height: 20px;
          line-height: 20px;
        }
      }
    }
    .page-image {
      flex: 1;
      position: relative;
      // background-color: pink;
      display: flex;
      flex-direction: column;
      align-items: center;
      .pan {
        position: relative;
        top: 20%;
        width: 280px;
        height: 280px;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .image {
          border-radius: 50%;
          height: 380rpx;
        }
      }
      .gan {
        position: relative;
        top: -10%;
        transition: all 0.3s;
        transform-origin: 20px 70px;
        // rotate(22deg) translate(-8%, -100%);
        // transform: translate(40%, -100%);
      }
    }
    .operation {
      display: flex;
      flex-direction: column;

      .interaction {
        background-color: pink;
      }
      .status {
        margin: 10rpx 0;
        display: flex;
        align-items: center;
        .badge-button {
          width: 10px;
          height: 10px;
          background-color: #fff;
          border-radius: 50%;
        }
        & > text {
          color: #fff;
          width: 15%;
          text-align: center;
        }
        & > view {
          padding: 0 10rpx;
          flex: 1;
        }
        .slide {
          flex: 1;
        }
        :deep(.u-slider) {
          height: 1px;
        }
        :deep(.u-slider__gap) {
          height: 1px !important;
        }
      }
      .controller {
        display: flex;
        align-items: center;
        color: #ccc;
        padding: 0 0 20px;
        padding-left: 9%;
        text {
          width: 15%;
          font-size: 50rpx;
          margin: 0 10rpx;
          text-align: center;
        }
        .play {
          color: #fff;
          font-size: 80rpx !important;
        }
        .list {
          font-size: 45rpx;
        }
      }
    }
  }
}
</style>
