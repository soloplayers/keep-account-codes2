<template>
  <Layout class-prefix="layout" class="wrapper">
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="display1">
      待办标签：
      <ul v-if="record.tags.length" class="display">
        <li
            v-for="item in record.tags"
            :key="item.id"
        >
          <Icon
              :name="item.name_en"
              class="icon"
          />
          <div class="text">{{ item.name_zh }}</div>
        </li>
        <Icon name="top" class="top"/>
      </ul>
      <span v-else>无</span>
      <div class="clearfix">
        <button @click="clear">清除所有待办标签</button>
      </div>
    </div>
    <FormItem
      filed-name="备注："
      placeholder="写点备注吧~"
      :value.sync="record.notes"
    />
    <NumberPad :amount.sync="record.amount" @submit="saveRecord" class="num" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList1.ts";
import Icons from "../components/Icons.vue";
@Component({
  components: { Tabs, Tags, FormItem, NumberPad, Icons },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  get tagList(){
    return this.$store.state.tagList;
  }

  get selectedTags() {
    return this.$store.state.selectedTags;
  }

  get record(){
    return this.$store.state.record;
  }

  recordTypeList = recordTypeList;
  created() {
    this.$store.commit('fetchRecord');
    this.$store.commit("fetchRecordList");
    this.$store.commit("fetchSelectedTags");
  }

  clear() {
    this.$store.state.selectedTags = [];
    this.$store.commit('setDefaultRecord');
    this.$store.commit("saveSelectedTags");
  }

  saveRecord() {
    if (!this.record.tags.length) {
      window.alert("请选择至少一个标签！");
      return;
    }

    if (this.$store.state.isCreateRecordError === null) {
      window.alert("已保存");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
::v-deep .layout-content {
  display: flex;
  flex-direction: column;
}
.wrapper{
  display: flex;
}
.display {
  position: relative;
  flex-grow: 1;
  flex-wrap: wrap;
  display: flex;
  > .top{
    color: red;
    position: absolute;
    font-size: 36px;
    left: 28px;
    top: 80px;
  }
  > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    $bg: #f5f5f5;
    margin-top: 8px;
    margin-left: 24px;
    > .icon {
      background: $bg;
      font-size: 48px;
      border-radius: 12.5%;
    }

    > .text {
      font-size: 18px;
    }
  }
}
.display1 {
  font-size: 24px;
  background-color: #ffe4c4;
  .clearfix{
    @extend %clearfix;
  }
  button {
    cursor: pointer;
    background-color: transparent;
    float: right;
  }
}
.notes {
  padding: 12px 0;
  display: flex;
  align-items: center;
  font-size: 18px;
  > .label {
    margin-left: 8px;
    color: chocolate;
  }
}
</style>
