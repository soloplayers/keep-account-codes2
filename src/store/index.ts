import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";
import iconNames from "@/assets/iconNames";

Vue.use(Vuex); // 使用Vue的use将Vuex绑到Vue.prototype上 -- 下面的代码就是：Vue.prototype.$store=store;

/* 有this和Vue的全局的区别，有this的可以直接在template中使用，且可以省去this */

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    record:undefined,
    selectedTags: undefined,
    currentTag: undefined,
    isCreateRecordError: null,
    isCreateTagError: null,
    indexOfOperator: "",
    result: 0,
    total:0,
  } as rootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    fetchResult(state) {
      state.result = parseFloat(
        JSON.parse(localStorage.getItem("result") || "0")
      );
    },
    fetchTotal(state){
      state.total=parseFloat(JSON.parse(localStorage.getItem('total')||'0'));
    },
    fetchIndex(state) {
      state.indexOfOperator = JSON.parse(
        localStorage.getItem("indexOfOperator") || "0"
      );
    },
    fetchSelectedTags(state) {
      state.selectedTags = JSON.parse(
        localStorage.getItem("selectedTags") || "[]"
      );
    },
    fetchRecord(state){
      state.record=JSON.parse(localStorage.getItem('record')||`{
  "tags": [],
  "notes": "",
  "type": "-",
  "amount": 0
}`)
    },
    setDefaultRecord(state){
      state.record=JSON.parse(`{
  "tags": [],
  "notes": "",
  "type": "-",
  "amount": 0
}`);
      store.commit('saveRecord');
    },
    fetchTags(state) {
      state.tagList = JSON.parse(localStorage.getItem("tagList") || "[]");
      if (!state.tagList.length) {
        for (let i = 0; i < iconNames.length; i++) {
          store.commit("createTag", {
            name_en: iconNames[i].en,
            name_zh: iconNames[i].zh,
          });
        }
      }
    },
    fetchRecordList(state) {
      state.recordList = JSON.parse(
        localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createdRecordList(state, record: RecordItem) {
      const record2 = clone(record);
      /* toISOString是日期专有的字符串形式 */
      record2.createTime = new Date().toISOString();
      state.recordList.push(record2);
      store.commit("saveRecordList");
    },
    createTag(state, payload: { name_en: string; name_zh: string }) {
      const names = state.tagList.map((item) => item.name_zh);
      if (names.indexOf(payload.name_zh) >= 0) {
        state.isCreateTagError = new Error("tag name duplicated");
        return;
      } else {
        const id = createId().toString();
        state.tagList.push({
          id: id,
          name_en: payload.name_en,
          name_zh: payload.name_zh,
        });
        store.commit("saveTags");
      }
    },
    createIndexOfOperator(state, index: string) {
      state.indexOfOperator = index;
      store.commit("saveIndexOfOperator");
    },
    clearIndex(state) {
      state.indexOfOperator = "";
      store.commit("saveIndexOfOperator");
    },
    updateTag(state, payload: Tag) {
      const { id, name_zh } = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name_zh);
        if (names.indexOf(name_zh) >= 0) {
          window.alert("标签名重复！");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name_zh = name_zh;
          store.commit("saveTags");
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back();
      } else {
        window.alert("删除失败！");
      }
    },
    saveRecordList(state) {
      localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
    saveTags(state) {
      localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    saveIndexOfOperator(state) {
      localStorage.setItem(
        "indexOperator",
        JSON.stringify(state.indexOfOperator)
      );
    },
    saveSelectedTags(state) {
      localStorage.setItem("selectedTags", JSON.stringify(state.selectedTags));
    },
    saveRecord(state){
      localStorage.setItem('record',JSON.stringify(state.record));
    },
    saveTotal(state){
      localStorage.setItem('total',JSON.stringify(state.total));
    }
  },
  actions: {},
  modules: {},
});

export default store;
