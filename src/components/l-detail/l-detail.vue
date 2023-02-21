<template>
  <view class="detail">
    <nav-bar>
      <template #left>
        <text @click="backClick" class="arrow icon-fanhui"> </text>
      </template>
      <template #center><text></text></template>
    </nav-bar>
    <view class="detail-content">
      <view class="detail-content__header">
        <view
          class="bg"
          :style="{
            backgroundImage: `url('${detail?.picUrl}')`
          }"
        ></view>
        <view class="header" v-if="detail">
          <image class="header-image" :src="detail.picUrl" mode="widthFix" />
          <view class="header-info">
            <view class="header-info-name">{{ detail.name }}</view>
            <view class="header-info-author">
              <image
                class="author-image"
                :src="detail?.avatarUrl"
                mode="widthFix"
              />
              <text>{{ detail?.nickname }}</text>
            </view>
            <view class="header-info-tags tag">
              <text>{{ detail?.category }}</text>
            </view>
          </view>
        </view>
        <view class="desc">{{ detail.desc }}</view>
        <view class="operate"></view>
      </view>
      <view class="detail-content__body">
        <slot name="body"></slot>
      </view>
    </view>
    <player-controller bottom="0"></player-controller>
  </view>
</template>

<script lang="ts" setup>
defineProps<{
  detail: any;
}>();

function backClick() {
  uni.navigateBack();
}
</script>

<style scoped lang="scss">
.detail {
  color: #fff;

  .arrow {
    font-size: 20px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__header {
      height: 230px;
      padding: 20px;
      .header {
        position: relative;
        display: flex;
        padding-top: 30rpx;
        &-image {
          width: 200rpx;
          border-radius: 20rpx;
        }
        &-info {
          padding-left: 10px;
          & > view {
            margin-top: 20rpx;
          }
          &-name {
            font-weight: 700;
          }
          &-author {
            .author-image {
              z-index: 5;
              width: 50rpx;
              vertical-align: middle;
              margin-right: 10rpx;
              border-radius: 50%;
            }
            text {
              color: var(--default-color);
              font-size: 25rpx;
            }
          }
          &-tags {
            text {
              padding: 3rpx 8rpx;
              border-radius: 10rpx;
              background-color: rgba(255, 255, 255, 0.3);
            }
          }
        }
      }
      .desc,
      .operate {
        position: relative;
        margin-top: 15rpx;
      }
      .desc {
        color: var(--default-color);
      }
    }
    &__body {
      position: relative;
      background-color: #fff;
      color: #000;
      flex: 1;
      padding: 10rpx 30rpx;
      overflow-y: auto;
      &:last-child {
        padding-bottom: 60px;
      }
    }
  }
}
</style>
