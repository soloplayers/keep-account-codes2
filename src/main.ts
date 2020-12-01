import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import icons from '@/components/Icons.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', icons);
/* 小技巧--将store挂载到vue的原型上面 */
// Vue.prototype.$store2 = store2;

/*使用全局数据管理使数据互通，修复数据不能及时更新的bug*/
/* 缺点：
* 1、全局变量太多了
* 2、严重依赖window
*  */

/* 改进1：将全局函数都挂载到一个对象store上 */
/* 改进2：直接自己封装一个store对象存在store目录的index2.ts下 */


// tag store
/*window.store.tagList = tagListModel.fetch();
window.store.createTag = (name: string) => {
    if (name.trim() !== '') {
        tagListModel.create(name);
    }
};
window.store.removeTag = (id: string) => {
    return tagListModel.remove(id);
};
window.store.updateTag = (id: string, name: string) => {
    return tagListModel.update(id, name);
};
window.store.findTag = (id: string) => {
    return window.store.tagList.filter(t => t.id === id)[0];
};

//record store
window.store.recordList = recordListModel.fetch();
window.store.createRecord = (record: RecordItem) => {
    recordListModel.create(record);
};*/
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
