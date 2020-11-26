<template>
  <div class="wrapper">
    <!--用label将input包起来即可-->
    <label class="FormItem">
      <span class="name">{{ this.filedName }}</span>
      <input
          :placeholder="placeholder"
          type="text"
          :value="value"
          @input="onValueChanged($event.target.value)"
          class="input"
      >
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue{
  @Prop({default:''}) value!: string;
  @Prop() filedName?: string;
  @Prop() placeholder?: string;

  onValueChanged(value: string){
    this.$emit('update:value',value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.FormItem {
  background: #f5f5f5;
  font-size: 18px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
    @extend %vanishText;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    @extend %vanishText;
  }
}
</style>