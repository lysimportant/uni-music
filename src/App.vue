<template></template>
<style lang="scss">
@import "./uni_modules/vk-uview-ui/index.scss";

:root {
  --default-color: #949494;
  --primary-color: #517dad;
}

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
  font-size: 20px;
}

.over-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis; /* 弹性伸缩盒子模型显示*/
  display: -webkit-box;
  /* 限制在一个块元素显示的文本的行数*/
  -webkit-line-clamp: 1;
  /*大设置或检索伸缩盒对象的子元素的排列方式*/
  -webkit-box-orient: vertical;
}
.fxied-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: -99999999px;
  height: 100vh;
  transition: all 1s;
  z-index: 99999999999999999999;
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
  -webkit-animation: my_rotate 15s linear infinite; /* Chrome, Safari, Opera */
  animation: my_rotate 15s linear infinite;
}

@keyframes my_rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animation_opticy {
  -webkit-animation: my_opcity 0.4s linear forwards; /* Chrome, Safari, Opera */
  animation: my_opcity 0.4s linear forwards;
}
.animation_opticy_reverse {
  -webkit-animation: my_opcity 0.55s linear reverse; /* Chrome, Safari, Opera */
  animation: my_opcity 0.55s linear reverse;
}
@keyframes my_opcity {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
