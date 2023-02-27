<template>
  <view class="recommend-list__content">
    <view class="header title_h2">{{ listname }}</view>
    <view class="body">
      <template v-for="(itemx, index) of list">
        <view class="item over-ellipsis" @click="handleItemClick(listname, itemx)">
          <text class="index" :class="index < 3 && 'active'">{{ index + 1 }}</text>
          <text class="name">{{ itemx.name }}</text>
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
const emit = defineEmits(["song", "dj"]);
const props = defineProps<{
  listname: string;
  list: any[];
  typelist: any[];
}>();
function handleItemClick(type: string, item: any) {
  console.log("first 发送事件", type, item, props.typelist);
  if (type === props.typelist[0]) {
    emit("song", item.name);
  } else {
    emit("dj", item);
  }
}
</script>

<style scoped lang="scss">
.recommend-list__content {
  display: inline-block;
  vertical-align: top;

  width: 50%;
  margin-left: 20px;
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  z-index: 9;
  .header {
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 1px solid #cccccc;
  }
  .body {
    .item {
      width: 100%;
      margin: 15px 0;
      // padding: 5px 0;
      white-space: nowrap;
      overflow: hidden;
      .index {
        margin: 0 10rpx;
      }
    }
  }
  .active {
    color: red;
    font-weight: 600;
  }
}
</style>
