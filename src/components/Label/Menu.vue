<template>
  <div class="wrapper">
    <div class="cancel" @click="cancel">取消</div>
    <div class="willDo" @click="addTag">加入待办标签</div>
    <div class="cancelDo" @click="cancelAddTag">取消待办标签</div>
    <router-link :to="`/labels/edit/${currentTag.id}`" class="tag">
      编辑
    </router-link>
    <hr style="border: none">
    <router-link to="/" class="start" v-if="selectedTags.length>0">
      开始记账咯~
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EditLabel from "@/components/Label/EditLabel.vue";
@Component({
  components: { EditLabel },
})
export default class Menu extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }

  get tagList() {
    return this.$store.state.tagList;
  }
  get selectedTags(){
    return this.$store.state.selectedTags;
  }

  created() {
    this.$store.commit('fetchRecord');
    this.$store.commit('fetchSelectedTags');
    this.$store.commit("setCurrentTag", this.tagList[0].id);
  }
  cancel() {
    const ul = document.querySelector("ul.current") as HTMLElement;
    if (ul) {
      ul.click();
    }
  }
  addTag(){
    const index=this.$store.state.selectedTags.indexOf(this.currentTag);
    if(index>=0){
      this.cancel();
      return;
    }
    this.$store.state.selectedTags.push(this.currentTag);
    this.$store.state.record.tags.push(this.currentTag);
    this.$store.commit('saveRecord');
    this.$store.commit('saveSelectedTags');
    this.cancel();
  }
  cancelAddTag(){
    const index=this.$store.state.selectedTags.indexOf(this.currentTag);
    if(index>=0){
      this.$store.state.selectedTags.splice(index,1);
      this.$store.state.record.tags.splice(index,1);
      this.$store.commit('saveRecord');
      this.$store.commit('saveSelectedTags');
    }
    this.cancel();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #ffffff;
  text-align: center;
  border-radius: 12.5%;
}
.willDo:hover,
.cancelDo:hover,
.cancel:hover,
.start:hover,
.tag:hover {
  display: block;
  cursor: default;
  background: #c8c8c9;
}
</style>
