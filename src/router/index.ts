import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue';
import Label from '@/views/Labels.vue';
import Statistic from '@/views/Statistic.vue';
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/components/Label/EditLabel.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'/money'
  },
  {
    path:'/money',
    component: Money
  },
  {
    path:'/labels',
    component: Label
  },
  {
    path:'/statistic',
    component: Statistic
  },
  {
    path:'/labels/edit/:id',
    component:EditLabel
  },
  {
    path:'*',
    component:NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
