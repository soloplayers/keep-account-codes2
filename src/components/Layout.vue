<template>
	<div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
	  <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
	</div>
</template>

<script lang="ts">
export default {
  props:['classPrefix'],
  name: "Layout"
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
  .layout-wrapper{
    @extend %vanishText;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .content{
    overflow: auto;
    flex-grow: 1;
  }
</style>