<template>
  <view class="play-index">
    <view
      class="bg"
      :style="{
        backgroundImage: `url('${coverUrl}')`
      }"
    ></view>
    <view class="play-index-content">
      <nav-bar>
        <template #left>
          <text @click="backClick" class="arrow icon-arrow-bottom"> </text>
        </template>
        <template #center>
          <view class="content">
            <view class="name">{{ name }}</view>
            <view class="author">{{ authorName.join("/") }}</view>
          </view>
        </template>
        <template #right></template>
      </nav-bar>
      <template v-if="!type">
        <view v-if="!showLrc">
          <RotateImg @show-lrc="handleToggleImgLrc" />
        </view>
        <view v-if="showLrc">
          <Lrc @show-lrc="handleToggleImgLrc" />
        </view>
      </template>
      <template v-else>
        <view class="dj">
          <image class="dj-image" :src="coverUrl" />
        </view>
      </template>

      <view class="operation">
        <!-- <Interaction /> -->
        <Slider />
        <Controller @show-list="isShow = !isShow" />
      </view>

      <music-list
        v-model="isShow"
        :bottom="isShow ? '0' : '-9999999999px'"
      ></music-list>

      <template v-if="type">
        <Dj />
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { useMusicStore } from "@/store";

import { backClick } from "./config";

import RotateImg from "./c-cpns/rotate-img/rotate-img.vue";
import Lrc from "./c-cpns/lrc/lrc.vue";

import Dj from "./c-cpns/dj/dj.vue";

import Slider from "./c-cpns/slider/slider.vue";
import Controller from "./c-cpns/controller/controller.vue";
import Interaction from "./c-cpns/interaction/interaction.vue";

const musicStore = useMusicStore();
const { type, lrcs, name, authorName, coverUrl } = storeToRefs(musicStore);

const isShow = ref(false);

function change(event: any) {}

const showLrc = ref(false);
function handleToggleImgLrc(falg: boolean) {
  showLrc.value = falg;
}

const topNumber = computed(() => {
  return type.value ? "38%" : "0";
});
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

    .dj {
      margin: 150rpx auto;
      .dj-image {
        width: 400rpx;
        height: 400rpx;
        border-radius: 20rpx;
      }
    }
    .operation {
      position: absolute;
      bottom: v-bind("topNumber");
      left: 0;
      right: 0;
      z-index: 1;
      height: 15%;
    }
  }
}
</style>
