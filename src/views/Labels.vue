<template>
  <Layout>
    <div class="title">选择标签以开始~</div>
    <div class="tags">
      <Tags />
    </div>
    <div class="tips">
      温馨提示：双击直接操作，右击可选操作
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper.ts";
import Tags from "@/components/Money/Tags.vue";

@Component({
  components: { Tags, Button },
})
export default class Labels extends mixins(TagHelper) {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  background: bisque;
  font-size: 16px;
  padding-left: 16px;
}
.title {
  text-align: center;
  font-size: 32px;
  background-color: chocolate;
  @extend %vanishText;
}
.tips {
  @extend %vanishText;
  padding: 8px;
}
</style>
