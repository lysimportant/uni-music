<template>
  <view>---------- </view>
</template>

<script setup lang="ts">
import { useDJStore } from "@/store";
const DJStore = useDJStore();

DJStore.getDJRecommendAction();
</script>
<script lang="ts">
export default {
  name: "podcast",
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
