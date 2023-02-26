<template>
  <view class="l-tabs__container">
    <view class="l-tabs">
      <view :style="{ left: tabBlockLeft }" class="l-tabs-block__item"></view>

      <template v-for="(item, index) in list" :key="item">
        <view
          class="l-tabs__item"
          @click="tabsClick(index, list)"
          :style="{ width: itemWidth }"
          :class="{ 'l-tabs__item-active': modelValue === index }"
          >{{ item.name }}</view
        >
      </template>
    </view>
    <view class="l-tabs__content">
      <template v-for="(item, index) in list" :key="item.name">
        <slot v-if="modelValue === index" :name="item.slotName">{{ item.name }} 插槽默认内容</slot>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
const emit = defineEmits(["update:modelValue", "change"]);
const props = withDefaults(
  defineProps<{
    list: { name: string; slotName: string; type?: number }[];
    itemWidth?: string;
    defaultColor?: string;
    activeColor?: string;
    blockColor?: string;
    height?: string;
    blockOffset?: string;
    blockHeight?: string;
    opacity?: number;
    modelValue?: number;
  }>(),
  {
    defaultColor: "#949494",
    itemWidth: "50px",
    activeColor: "#ffffff",
    blockColor: "#ffffff",
    height: "44px",
    blockOffset: "-10px",
    blockHeight: "5px",
    opacity: 1,
    modelValue: 0
  }
);

const tabBlockLeft = ref();
function tabsClick(index: number, arr: any[]) {
  emit("update:modelValue", index);
  emit("change", arr[index]);
  const width = Number(props.itemWidth.replace("px", ""));
  tabBlockLeft.value = index * width + width / arr.length + "px";
}
onMounted(() => {
  tabsClick(props.modelValue, props.list);
});
const blockOffsetCmp = ref(`translate(${props.blockOffset})`);
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
    text-align: center;
    &__item-active {
      color: v-bind("$props.activeColor");
    }
    // &__item {
    //   padding: 0 20rpx;
    // }
    .l-tabs-block__item {
      position: absolute;
      transition: all 0.3s;
      bottom: 0;
      padding: 0 10px;
      height: v-bind("$props.blockHeight");
      background: v-bind("$props.blockColor");
      transform: v-bind("blockOffsetCmp");
      border-radius: 10rpx;
      opacity: v-bind("$props.opacity");
    }
  }
  .l-tabs__content {
    width: 100%;
    margin: 10px 0;
    color: #949494;
  }
}
</style>
