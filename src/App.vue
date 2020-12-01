<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-family: $font-hei;
  font-size: 16px;
  background: #f5f5f5;
  width: 460px;
  margin-right: auto;
  margin-left: auto;
}
@media (max-width: 500px) {
  body {
    width: 360px;
  }
}
</style>
