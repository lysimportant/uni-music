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

      <!-- #ifdef MP-WEIXIN -->
      <RotateImg
        :style="{
          height: !showLrc ? '65vh' : '0px',
          visibility: showLrc ? 'hidden' : 'visible'
        }"
        @show-lrc="handleToggleImgLrc"
      />
      <Lrc
        :style="{
          height: showLrc ? '65vh' : '0px',
          visibility: showLrc ? 'visible' : 'hidden'
        }"
        @show-lrc="handleToggleImgLrc"
      />

      <!-- #endif -->

      <!-- #ifndef MP-WEIXIN -->
      <RotateImg
        :style="{
          height: !showLrc ? '70vh' : '0px',
          visibility: showLrc ? 'hidden' : 'visible'
        }"
        @show-lrc="handleToggleImgLrc"
      />
      <Lrc
        :style="{
          height: showLrc ? '70vh' : '0px',
          visibility: showLrc ? 'visible' : 'hidden'
        }"
        @show-lrc="handleToggleImgLrc"
      />

      <!-- #endif -->

      <view class="operation">
        <Interaction />
        <Slider />
        <Controller />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useMusicStore } from "@/store";

import { backClick } from "./config";

import RotateImg from "./c-cpns/rotate-img/rotate-img.vue";
import Lrc from "./c-cpns/lrc/lrc.vue";

import Slider from "./c-cpns/slider/slider.vue";
import Controller from "./c-cpns/controller/controller.vue";
import Interaction from "./c-cpns/interaction/interaction.vue";

const musicStore = useMusicStore();
const { currentMusic } = storeToRefs(musicStore);

const showLrc = ref(true);
function handleToggleImgLrc(falg) {
  console.log("first 触发了 修改值： ", showLrc.value, falg);
  showLrc.value = falg;
  console.log("first 触发了 修改值： ", showLrc.value, falg);
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
  overflow: hidden;
  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -50%;
    right: 0;
    filter: blur(30px);
    transform: scale(1.2);
    background-color: black;
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

    lrc,
    rotate-img {
      flex: 1;
    }

    lrc {
      overflow-y: auto;
    }
    .operation {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 5;
      height: 15%;
    }
  }
}
</style>
