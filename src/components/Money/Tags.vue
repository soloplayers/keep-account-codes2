<template>
  <div class="tags">
    <ul class="current" @click="clearMenu">
      <li
        v-for="item in tagList"
        :key="item.id"
        @contextmenu="editMenu($event, item)"
      >
        <Icon
          :name="item.name_en"
          class="icon"
          :class="{ selected: isSelected(item) }"
          @dblclick.native="editCount($event,item)"
        />
        <div class="text">{{ item.name_zh }}</div>
      </li>
    </ul>
    <div class="tips">
      <a href="mailto:helei9045@gmail.com">发送邮件</a>告诉我更多的标签哦~
    </div>
    <Menu
        :style="{ display: menu[0], left: menu[1], top: menu[2] }"
        class="test"
    />
  </div>
</template>
<script lang="ts">
import {Component} from 'vue-property-decorator';
import { TagHelper } from "@/mixins/TagHelper.ts";
import { mixins } from "vue-class-component";
import Menu from "@/components/Label/Menu.vue";
@Component({
  components: { Menu },
})
export default class Tags extends mixins(TagHelper) {
  menu: string[] = [];
  get selectedTags() {
    return this.$store.state.selectedTags;
  }
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    // 初始化数据
    this.$store.commit("fetchTags");
    this.$store.commit("fetchSelectedTags");
  }

  clearMenu() {
    this.menu = [];
  }

  isSelected(item: Tag) {
    const index = this.selectedTags.indexOf(item);
    return index >= 0;
  }

  editCount(event: MouseEvent,item: Tag){
    this.$store.state.selectedTags.push(item);
    this.$store.state.record.tags.push(item);
    this.$store.commit('saveRecord');
    this.$store.commit('saveSelectedTags');
    this.$router.replace('/');
  }

  editMenu(event: MouseEvent, item: Tag) {
    // 每次进来将记录数组清空
    this.menu = [];
    event.preventDefault();
    this.menu.push("block");
    this.menu.push(event.pageX + "px");
    this.menu.push(event.pageY + "px");
    this.$store.commit("setCurrentTag", item.id);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.test {
  display: none;
  position: absolute;
  width: 100px;
  color: #202124;
  > div {
    padding: 5px;
    margin: 0 auto;
  }
}

.tips {
  padding-top: 16px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  > a {
    color: #134985;
  }
}

.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  > .current {
    flex-grow: 1;
    flex-wrap: wrap;
    display: flex;
    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      $bg: #f5f5f5;
      margin-top: 8px;
      margin-left: 12px;
      > .icon {
        background: $bg;
        font-size: 48px;
        border-radius: 12.5%;
      }
      > .selected {
        background: darken($bg, 33%);
        color: white;
      }

      > .text {
        font-size: 18px;
      }
    }
  }
}
</style>
