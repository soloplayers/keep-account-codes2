<template>
	<div>
	  <span class="text">朋友这是404页面，你路走窄了！</span>
    <router-link to="/" class="link">点击这里回主页</router-link>
	</div>
</template>

<script lang="ts">

export default {
name: "NotFound",
}
</script>

<style lang="scss" scoped>
  .text{
    display: inline-block;
    margin: 200px auto;
  }
  .link {
    color: coral;
  }
</style>