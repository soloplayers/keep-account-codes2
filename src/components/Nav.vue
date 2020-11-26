<template>
	<nav>
<!--  注意动态类名是根据当前路由的路径确定的  -->
   <router-link to="/labels" class="item" active-class="selected">
     <Icon name="label"/>
     标签
   </router-link>
    <router-link to="/money" class="item" active-class="selected">
     <Icon name="money"/>
     记账
   </router-link>
   <router-link to="/statistic" class="item" active-class="selected">
     <Icon name="statistic"/>
     统计
   </router-link>
	</nav>
</template>

<script lang="ts">
export default {
name: "Nav",
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
  nav {
    @extend %outerShadow;
    @extend %vanishText;
    display: flex;
    font-size: 16px;
    >.item {
      padding: 2px 0;
      width: 33.3%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon{
        width: 30px;
        height: 30px;
      }
    }
    > .item.selected{
      color: $color-highlight;
    }
  }
</style>