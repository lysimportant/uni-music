<template>
  <view class="dj-tba">
    <l-tabs
      :list="list"
      v-model="currentTab"
      default-color="#949494"
      active-color="#fff"
      block-color="#fff"
    >
      <text></text>
      <template #detail>
        <view class="detail" @click="handleJumpClick">
          <flex-cpn height="60px">
            <template #left>
              <image class="detail-image" :src="currentDj.radio.coverUrl" />
            </template>
            <template #center>
              <view class="detail-info">
                <view class="name">{{ currentDj.radio.name }}</view>
                <view class="other">
                  {{ countCmp(currentDj.radio.subCount) }}人收藏 |
                  {{ formatDate(currentDj.radio.updatedTime, "MM月DD日") }}更新
                </view>
              </view>
            </template>
            <template #right><text></text></template>
          </flex-cpn>
        </view>
        <view class="detail-other">
          <view class="header">
            <text class="tag">{{ currentDj.categoryName }}</text>
            <text class="name">{{ name }}</text>
          </view>
          <view class="time">
            <text>发布时间: {{ formatDate(currentDj.createTime, "YYYY-MM-DD") }}</text>
            <text>播放量: {{ formatCount(currentDj.listenerCount) }}</text>
          </view>
          <view class="desc">
            <text>{{ currentDj.desc }}</text>
          </view>
        </view>
      </template>

      <template #reommend>
        <view class="recommend">
          <scroll-view scroll-y class="scroll-Y">
            <template v-for="(item, index) in currentDj.recommend" :key="item.id">
              <flex-cpn
                margin="10px 0"
                @click="handleRecommendClick(item)"
                :style="{
                  paddingBottom: index === currentDj.recommend.length - 1 ? '100px' : '0'
                }"
              >
                <template #left>
                  <image class="recommend-image" :src="item.picUrl" />
                </template>

                <template #center>
                  <view class="recommend-info">
                    <view class="name">{{ item.rcmdtext }}</view>
                    <view class="other">
                      {{ formatCount(item.playCount) }}
                      {{ item.programCount }}
                      {{ item.name }}
                    </view>
                  </view>
                </template>
              </flex-cpn>
            </template>
          </scroll-view>
        </view>
      </template>
    </l-tabs>
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMusicStore } from "@/store";
import { formatCount, formatDate, useNavigate } from "@/utils";
import { computed, ref } from "vue";
const musicStore = useMusicStore();
const currentTab = ref(0);
const { currentDj, name } = storeToRefs(musicStore);
const countCmp = computed(() => formatCount);
function handleJumpClick() {
  useNavigate("page", "/subDetail/dj-detail/dj-detail", { cid: currentDj.value.radio.id });
}

function handleRecommendClick(item: any) {
  useNavigate("page", "/subDetail/dj-detail/dj-detail", { cid: item.id });
}

const list = [
  {
    name: "详情",
    slotName: "detail"
  },
  {
    name: "推荐",
    slotName: "reommend"
  }
];
</script>

<style scoped lang="scss">
.dj-tba {
  position: relative;
  padding: 0 10px;
  height: 200px;
  margin-top: 35px;
  .detail {
    // text-align: center;
    padding: 12px;
    background-color: rgba(148, 148, 148, 0.4);
    border-radius: 15rpx;

    &-image {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }
    &-info {
      padding: 10rpx 20px;
      .name,
      .other {
        margin: 10rpx 0;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .other {
        font-size: 20rpx;

        color: #949494;
      }
    }
  }
  .detail-other {
    margin: 10px 0;
    padding: 12px;
    background-color: rgba(148, 148, 148, 0.4);
    color: #fff;
    border-radius: 15rpx;
    & > view {
      margin: 10rpx 0;
    }
    .tag {
      font-size: 1px;
      padding: 1px 2px;
      border: 1px solid #fff;
      border-radius: 5rpx;
    }
    .header {
      .name {
        margin-left: 10rpx;
        font-size: 18px;
      }
    }

    .desc,
    .time {
      color: var(--default-color);
    }
    .time {
      font-size: 16rpx;
      & > text {
        margin-right: 20rpx;
      }
    }
    .desc {
      font-size: 18rpx;
    }
  }
  .recommend {
    width: 100%;
    padding: 0 20rpx;
    position: relative;
    z-index: 10;
    .scroll-Y {
      height: 350px;
      &:last-child {
        padding-bottom: 100px;
      }
    }
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }
    &-info {
      margin-left: 20rpx;
      .name,
      .other {
        margin-top: 20rpx;
        color: #fff;
      }
      .other {
        font-size: 20rpx;
        color: var(--default-color);
      }
    }
  }
}
</style>
