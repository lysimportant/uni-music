<template>
  <single-card title="推荐新歌">
    <template v-for="song in newSongs" :key="song.id">
      <song-peice-item :item="song"></song-peice-item>
    </template>
  </single-card>
</template>

<script lang="ts" setup>
defineProps<{
  newSongs: any[];
}>();
</script>

<style scoped lang="scss"></style>
