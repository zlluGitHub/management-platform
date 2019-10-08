// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

//引入代码高亮样式
import './assets/css/content.min.css';
import './assets/css/globle.css'
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
import axios from 'axios';
import qs from 'qs';
import { log } from 'util'
axios.defaults.baseURL = config.url; //根据环境的不同为 axios 添加基础 url 
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

// 添加日志
Vue.prototype.$addJournal = function (val) {
  let data={
    author:val.author?val.author:'',
    content:val.content?val.content:'',
    img_url:val.img_url?val.img_url:'',
  }
  axios.post('/journal', qs.stringify(data)).then(res => {
        console.log('记录成功！');
        }).catch(err => {
          // this.$Message.error(message + "失败！");
        });
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
