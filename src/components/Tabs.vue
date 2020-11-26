<template>
	<ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value"
        :class="liClass(item)"
        @click="select(item)"
        class="tabs-item"
    >
      {{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
	import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem={
    text: string;
    value: string;
  }

	@Component
	export default class Tabs extends Vue{
		@Prop({required:true,type:Array}) dataSource!: DataSourceItem[];
	  @Prop(String) readonly value!: string;
	  @Prop(String) classPrefix?: string;
	  // @Prop({type:String,default:'64px'}) height!:string;
	  select(item: DataSourceItem){
	    this.$emit('update:value',item.value);
    }
    liClass(item: DataSourceItem){
	    return {
        [this.classPrefix + '-tabs-item']: this.classPrefix,
        selected: item.value === this.value
      }
    }
	}
</script>

<style lang="scss" scoped>
	.tabs {
    background: #cc7a01;
    display: flex;
    text-align: center;
    font-size: 24px;
    &-item {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      color: black;
      /* 使用伪元素+定位可以使下划线不跳出来 */
      &.selected::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 25%;
        width: 50%;
        height: 4px;
        background: aqua;
      }
    }
  }
</style>