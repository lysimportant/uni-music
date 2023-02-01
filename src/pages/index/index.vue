<template>
  <view class="content">
    <nav-bar>
      <template #center>
        <input class="uni-input" placeholder="自动获得焦点" />
      </template>
    </nav-bar>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scpoed>
.uni-input {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 10px 20px;
  color: #858ca7;
  font-size: 12px;
  border-radius: 20px;
  background: linear-gradient(to right, #d8dbfa, #f3d7ee);
}
</style>
