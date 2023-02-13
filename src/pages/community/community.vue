<template>
  <view class="community">
    <nav-bar>
      <template #center>
        <u-tabs :list="list" v-model="currentTab"></u-tabs>
      </template>
    </nav-bar>
  </view>
</template>
<script setup lang="ts">
import store from "@/store";
import { ref } from "vue";
// const { communityStore } = store()
// communityStore.getCommunityData()

const currentTab = ref(0);
const list = [
  {
    name: "广场"
  },
  {
    name: "歌房"
  },
  {
    name: "视频"
  }
];
</script>
<script lang="ts">
export default {
  name: "community"
};
</script>

<style lang="scss">
.u-tabs {
  background-color: #000;
}
</style>
