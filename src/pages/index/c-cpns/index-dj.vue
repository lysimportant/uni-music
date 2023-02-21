<template>
  <single-card title="热门播客">
    <template v-for="dj in djList" :key="dj.mainSong.id">
      <dj-peice-item @click="djClick" :item="dj"></dj-peice-item>
    </template>
  </single-card>
</template>

<script lang="ts" setup>
import { useMusicStore } from "@/store";
defineProps<{
  djList: any[];
}>();
const musicStore = useMusicStore();

function djClick(item: any) {
  if (musicStore.id == item.mainSong.id) {
    uni.navigateTo({
      url: "/subPlay/play/play"
    });
    return;
  }
  musicStore.getMusicURLByIdAction(item.mainSong.id, 1, item.id);
}
</script>

<style scoped lang="scss"></style>
