<template>
  <view class="interaction">------------- {{ currentIndex }} -----------</view>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { storeToRefs } from "pinia";

import { useMusicStore } from "@/store";

const musicStore = useMusicStore();
const { lrcs, currentTime } = storeToRefs(musicStore);

const currentIndex = computed(() => {
  return lrcs.value.findIndex((item, index) => {
    console.log(item.time, lrcs.value[index].time);
    return currentTime.value > item.time;
  });
});

watch(
  () => currentTime.value,
  () => {
    const index = lrcs.value.findIndex((item, index) => {
      console.log(currentTime.value, item.time, lrcs.value[index].time);
      return currentTime.value > item.time;
    });

    console.log("watch index: ", index);
  }
);
</script>

<style scoped lang="scss">
.interaction {
  background-color: pink;
}
</style>
