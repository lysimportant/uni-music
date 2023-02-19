<template>
  <view class="l-tabs__container">
    <view class="l-tabs">
      <view :style="{ left: tabBlockLeft }" class="l-tabs-block__item"></view>

      <template v-for="(item, index) in list" :key="item">
        <view
          class="l-tabs__item"
          ref="tabItemRef"
          @click="tabsClick(index, ($event as any).instance, tabItemRef)"
          :class="{ 'l-tabs__item-active': currentTab === index }"
          >{{ item.name }}</view
        >
      </template>
    </view>
    <view class="l-tabs__content">
      <template v-for="(item, index) in list" :key="item.name">
        <slot v-if="currentTab === index" :name="item.slotName"
          >{{ item.name }} 插槽默认内容</slot
        >
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";

const props = withDefaults(
  defineProps<{
    list: { name: string; slotName: string }[];
    defaultColor?: string;
    activeColor?: string;
    blockColor?: string;
    height?: string;
    blockOffset?: string;
    blockHeight?: string;
  }>(),
  {
    defaultColor: "#949494",
    activeColor: "#ffffff",
    blockColor: "#ffffff",
    height: "44px",
    blockOffset: "-10px",
    blockHeight: "5px"
  }
);

const currentTab = ref(0);
const tabItemRef = ref([]);
const tabBlockLeft = ref();
function tabsClick(index: number, el, arr) {
  currentTab.value = index;
  tabBlockLeft.value =
    index * el.$el.clientWidth + el.$el.clientWidth / arr.length + "px";
}
onMounted(() => {
  tabsClick(currentTab.value, tabItemRef.value[0], props.list);
});
const blockOffsetCmp = ref(`translateX(${props.blockOffset})`);
</script>

<style scoped lang="scss">
.l-tabs__container {
  display: flex;
  flex-direction: column;
  .l-tabs {
    position: relative;
    display: flex;
    height: v-bind("$props.height");
    line-height: v-bind("$props.height");
    // font-size: 16px;
    color: v-bind("$props.defaultColor");
    &__item-active {
      color: v-bind("$props.activeColor");
    }
    &__item {
      padding: 0 20rpx;
    }
    .l-tabs-block__item {
      position: absolute;
      transition: all 0.3s;
      bottom: 0;
      padding: 0 10px;
      height: v-bind("$props.blockHeight");
      background-color: v-bind("$props.blockColor");
      transform: v-bind("blockOffsetCmp");
      border-radius: 10rpx;
    }
  }
  .l-tabs__content {
    width: 100%;
    margin: 10px 0;
    color: #949494;
  }
}
</style>
