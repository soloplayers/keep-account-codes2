// import Vue from 'vue';
/* 文件名.d.ts以这个后缀结尾的表示定义声明(d)全局的东西 */

type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  /* 表示类型时可以使用日期类型 用?表示可能该属性不存在*/
  createTime?: string;
};

type rootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  record?: RecordItem;
  selectedTags?: RecordItem[];
  currentTag?: Tag;
  isCreateRecordError: Error | null;
  isCreateTagError: Error | null;
  indexOfOperator: string;
  result: number;
  total: number;
};
type Tag = {
  id: string;
  name_en: string;
  name_zh: string;
};

//注：Record这个变量名已经有内置了

type Result = {
  title: string;
  total?: number;
  items: RecordItem[];
};

/*注意：这里是大写的W*/

/*interface Window {
    store:{
        /!* 以下是封装tag的相关 *!/
        tagList:Tag[];
        createTag:(id:string)=>void;
        removeTag:(id:string)=>boolean;
        updateTag:(id:string,name:string)=>void;
        findTag:(id:string)=>Tag|undefined;

        /!* 以下是封装record的相关 *!/
        recordList:RecordItem[];
        createRecord:(record:RecordItem)=>void
    }
}*/

/*将store挂载到Vue原型上 -- 注意要导入Vue*/
/*
declare module 'vue/types/vue'{
    interface Vue{
        $store2:any;
    }
}*/
