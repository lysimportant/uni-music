<template></template>
<style lang="scss">
@import "./uni_modules/vk-uview-ui/index.scss";
.top {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #fff;
}
.title_h1 {
  font-weight: 700;
  font-size: 22px;
}

.title_h2 {
  font-weight: 500;
  font-size: 18px;
}

[class*="icon-"] {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.animation_rotate {
  -webkit-animation: my_rotate 5s linear infinite; /* Chrome, Safari, Opera */
  animation: my_rotate 5s linear infinite;
}

@keyframes my_rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
