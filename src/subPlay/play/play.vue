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
        <view class="interaction">1</view>
        <view class="status">2</view>
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
import { useMusicStore } from "@/store";
import { storeToRefs } from "pinia";
import gan from "@/static/play/gan.png";
import pan from "@/static/play/pan.png";
const musicStore = useMusicStore();
const { currentMusic, isPlayer, currentStatus } = storeToRefs(musicStore);
function showModel() {
  currentStatus.value++;
  if (currentStatus.value >= 3) currentStatus.value = 0;
  uni.showToast({
    icon: "success",
    title: playStatus[currentStatus.value].msg
  });
}
const playStatus = [
  {
    model: "icon-loop",
    msg: "单曲循环"
  },
  {
    model: "icon-circulation",
    msg: "列表循环"
  },
  {
    model: "icon-random",
    msg: "随机播放"
  }
];

const controllerIcons = [
  "icon-per",
  "icon-zanting play",
  "icon-bofang play",
  "icon-next",
  "icon-24gf-playlist list"
];
function backClick() {
  uni.navigateBack();
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
      position: relative;
      height: 15%;

      .interaction {
        background-color: pink;
      }
      .status {
        background-color: skyblue;
      }
      .controller {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        // justify-content: space-evenly;
        align-items: center;
        height: 180rpx;
        color: #ccc;
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
