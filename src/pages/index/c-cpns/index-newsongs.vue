<template>
  <single-card title="推荐新歌">
    <template v-for="song in newSongs" :key="song.id">
      <song-peice-item @click="songClick" :item="song"></song-peice-item>
    </template>
  </single-card>
</template>

<script lang="ts" setup>
import { useMusicStore } from "@/store";
defineProps<{
  newSongs: any[];
}>();
const musicStore = useMusicStore();

function songClick(params: any) {
  musicStore.getMusicURLByIdAction(params.id);
}
</script>

<style scoped lang="scss"></style>
