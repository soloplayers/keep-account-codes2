<template>
  <div ref="father" class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="result">= {{ result }}（默认单位：元）</div>
    <div class="buttons" @click="onAmountChanged(result)">
      <button @click="inputText">1</button>
      <button @click="inputText">2</button>
      <button @click="inputText">3</button>
      <button @click="clear">清空</button>
      <button @click="inputText">4</button>
      <button @click="inputText">5</button>
      <button @click="inputText">6</button>
      <button @click="inputText">+</button>
      <button @click="inputText">7</button>
      <button @click="inputText">8</button>
      <button @click="inputText">9</button>
      <button @click="inputText">-</button>
      <button class="point" @click="inputText">.</button>
      <button @click="inputText">0</button>
      <button class="remove" @click="remove">←</button>
      <button class="ok" @click="ok">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import clone from '@/lib/clone';
@Component({
  components: { FormItem },
})
export default class NumberPad extends Vue {
  @Prop() amount!: number;
  output = '0'; //

  onAmountChanged(amount: number){
    this.$emit('update:amount',amount);
  }

  get indexOfOperator() {
    return this.$store.state.indexOfOperator;
  }
  get record(){
    return this.$store.state.record;
  }

  get result() {
    return this.$store.state.result;
  }

  created() {
    this.$store.commit("fetchIndex");
    this.$store.commit('fetchRecord');
  }

  calculate(expression: string) {
    let sum = 0,
      index = 0;
    for (let i = 1; i < expression.length; i++) {
      if (expression[i] === "+" || expression[i] === "-") {
        sum += parseFloat(expression.substring(index, i));
        index = i;
      }
    }
    if (
      expression.substring(index) === "+" ||
      expression.substring(index) === "-"
    ) {
      sum += 0;
    } else {
      sum += parseFloat(expression.substring(index));
    }
    this.$store.state.result = sum;
  }

  inputText(event: MouseEvent) {
    if (event.target) {
      /*强制告诉ts-event.target为HTML的Button元素*/
      const button = event.target as HTMLButtonElement;
      const input = button.textContent as string;
      let value1, value2;
      /*接下来是针对计算器的相关做一些特殊处理*/
      const div = this.$el.querySelector(".output");
      if (div) {
        div.scrollTop = div.scrollHeight;
      }

      if (this.output === "0") {
        if (input === "+" || input === ".") {
          this.output += input;
          this.$store.commit("createIndexOfOperator", this.output.length - 1);
        } else {
          this.output = input;
        }
      } else {
        if (input === "+" || input === "-") {
          if (this.output[this.output.length - 1] === ".") {
            this.output = this.output.slice(0, this.output.length - 1);
            this.output += ".0" + input;
          } else if ("+-".indexOf(this.output[this.output.length - 1]) >= 0) {
            this.output = this.output.slice(0, this.output.length - 1);
            this.output += input;
          } else {
            this.output += input;
          }
          this.$store.commit("createIndexOfOperator", this.output.length - 1);
        } else if (input === ".") {
          if (this.output[this.output.length - 1] === ".") {
            return;
          } else if ("+-".indexOf(this.output[this.output.length - 1]) >= 0) {
            this.output += "0.";
            return;
          } else if (
            this.output.substring(this.indexOfOperator).indexOf(".") >= 0
          ) {
            return;
          }
          this.output += input;
        } else {
          this.output += input;
        }
      }
      /* 每次输入完成一个表达式后，就重新计算一次并赋值给result */
      this.calculate(this.output);
    }
  }

  remove() {
    // slice(起始，结束) 就是保留这段字符串
    this.output = this.output.slice(0, -1);
    if (!this.output.length) {
      this.output = "0";
    }
    this.calculate(this.output);
  }

  clear() {
    this.record.notes = "";
    this.output = "0";
    this.$store.state.result = 0;
    this.$store.state.record.amount=0
    this.$store.commit("clearIndex");
    this.$store.commit('saveRecord');
  }

  ok() {
    if (window.confirm("确定创建这条账目吗？")) {
      this.$emit("submit", this.$store.state.result);
      this.$store.state.record.amount=this.$store.state.result;
      if(this.$store.state.record.tags.length){
        const newTag=clone(this.record);
        newTag.tags=this.$store.state.record.tags.splice(0,1);
        this.$store.commit("createdRecordList", newTag);
        this.$store.commit('saveRecord');
        if(!this.$store.state.record.tags.length){
          this.$store.state.selectedTags=[];
          this.$store.commit('saveSelectedTags');
        }
      }
      this.clear();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  background: #f5f5f5;
  .output {
    @extend %clearfix;
    @extend %innerShadow;
    font-size: 32px;
    font-family: Consolas, monospace;
    padding: 8px 16px;
    text-align: right;
    height: 64px;
    word-wrap: break-word;
    overflow-y: auto;
  }

  .result {
    font-size: 24px;
    margin-left: 8px;
  }

  .buttons {
    @extend %clearfix;

    > button {
      width: 25%;
      height: 64px;
      float: left;
      $bg_btn: #f2f2f2;

      &.ok {
        height: 64px;
        float: right;
        background: darken($bg_btn, 4 * 7%);
      }

      &.remove {
        font-size: 32px;
      }

      &.point {
        font-size: 32px;
      }

      &:nth-child(1) {
        background: $bg_btn;
      }

      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg_btn, 4%);
      }

      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg_btn, 4 * 2%);
      }

      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10),
      &:nth-child(13) {
        background: darken($bg_btn, 4 * 3%);
      }

      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(14) {
        background: darken($bg_btn, 4 * 4%);
      }

      &:nth-child(12),
      &:nth-child(15) {
        background: darken($bg_btn, 4 * 5%);
      }

      &:last-child {
        background: darken($bg_btn, 4 * 6%);
      }
    }
  }
}
</style>
