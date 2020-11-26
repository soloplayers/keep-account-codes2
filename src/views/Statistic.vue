<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type" />
    <div v-if="type==='='" class="total">
      总计：{{total}} 元
    </div>
    <div v-else-if="type==='-'" class="expend">{{-groupedList.reduce((sum,i)=>sum+i.total,0)}} 元</div>
    <div v-else class="income">{{groupedList.reduce((sum,i)=>sum+i.total,0)}} 元</div>
    <ol v-if="groupedList.length">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }} </span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else-if="recordTypeList[2].value==='='"></div>
    <div v-else class="noResult">
      <span>目前还没有记过账哟！快快来记一笔吧~</span>
    </div>
  </Layout>
</template>

<script lang="ts">
/* 坑1：报错信息：can`t find vue/types/umd */
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList2';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type = '-';
  recordTypeList = recordTypeList;
  tagString(tags: Tag[]){
    return tags.length===0? '无':tags[0].name_zh;
  }
  created() {
    this.$store.commit('fetchTotal');
    this.$store.commit('fetchRecordList');
    this.$store.commit('fetchRecord');
  }

  get recordList() {
    return (this.$store.state as rootState).recordList;
  }

  get total(){
    this.$store.state.total=0;
    const newList=clone(this.recordList);
    newList.forEach(i=>{
      if(i.type==='+'){
        this.$store.state.total+=i.amount;
      }
      else {
        this.$store.state.total-=i.amount;
      }
    })
    this.$store.commit('saveTotal');
    return this.$store.state.total;
  }

  get record(){
    return this.$store.state.record;
  }

  get groupedList() {
    /*
    *   数据结构样式：
    *     [
    *       {title,items}
    *       {title,items}
    *       {title,items}
    *           .
    *           .
    *           .
    *     ]
    *
    *  */
    /*
    *   排序后再分组
    *   [
    *     {title:19,items:[19-1,19-2,19-3]  -- items是存的19日这天的所有record}
    *     {title:18,items:[18-1,18-2,18-3]  -- items是存的18日这天的所有record}
    *     {title:17,items:[17-1,17-2,17-3]  -- items是存的17日这天的所有record}
    * ]
    *  */
    /* clone是为了保证原始的recordList不被改动 */
    /* filter 先筛选一遍是否与当前的类型相匹配，就是匹配收入和支出 */
    const newList=clone(this.recordList).filter(r=>r.type===this.type).sort((a,b)=>dayjs(b.createTime).valueOf()-dayjs(a.createTime).valueOf());
    if(!newList.length){
      return [] as Result[];
    }

    const result: Result[]=[{title:dayjs(newList[0].createTime).format('YYYY-MM-DD'),items:[newList[0]]}];
    
    for (let i = 1; i < newList.length; i++) {
      const current=newList[i];
      const last=result[result.length-1];
      if(dayjs(last.title).isSame(dayjs(current.createTime),'day')){
        last.items.push(current);
        /*这个if是保证同一天的record放入items里面*/
      }
      else {
        /*这里的if是保证不是同一天的加入到这个数组里面*/
        result.push({title: dayjs(current.createTime).format('YYYY-MM-DD'),items:[current]})
      }
    }
    result.map(group=>{
      group.total=group.items.reduce((sum,item)=>sum+item.amount,0);
    })
    return result;
  }
  beautify(date: string){
    /* dayjs的相关总结，before和after只是判断在前或在后，没有对应的准确昨天和后天之说。 */
    // 还是要通过isSame来判断。而且dayjs()提供了subtract的API，参数1位减去的数字，参数2位减去的年月日等。
    const now=new Date();
    if(dayjs(date).isSame(now,'day')){
      return '今天';
    }
    else if(dayjs(date).isSame(dayjs().subtract(1,'day'),'day')){
      return '昨天';
    }
    else if(dayjs(date).isSame(dayjs().subtract(2,'day'),'day')){
      return '前天';
    }
    else {
      return dayjs(date).format('YYYY年M月D日');
    }
  }
}
</script>

<style lang="scss" scoped>

.total{
  text-align: center;
  margin-top: 100px;
  color: red;
  background-color:#ffe4c4;
}
.income,.expend{
  margin-top: 8px;
  margin-left: 12px;
}

.noResult{
  padding: 16px;
  text-align: center;
}
  ::v-deep {
    .type-tabs-item {
      background: white;

      &.selected {
        background: #C4C4C4;

        &::after {
          display: none;
        }
      }

      .interval-tabs-item {
        height: 48px;
      }
    }
  }
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title{
    @extend %item;
  }
  .record{
    @extend %item;
    background: white;
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>