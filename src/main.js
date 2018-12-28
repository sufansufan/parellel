// import Vue from "vue";
import store from './vuex/store'
import App from './App'
import router from './router'
// import axios from "axios";
// import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import 'babel-polyfill'
// import VeLine from "v-charts/lib/line";
// import VeRine from "v-charts/lib/ring";
// import VeHistogram from "v-charts/lib/histogram";
import exportExcel from './pageModel/common/exportExcel/export'

import GlobalVal from '../static/js/globalVal'
import Util from '../static/js/util'
import ErrorCode from '../static/js/errorCode'
import Checkout from '../static/js/checkout'
import * as filters from '../static/js/filter'
//图片裁剪

// register component to use
Vue.component(VeBar.name, VeBar)
Vue.component(VeLine.name, VeLine)
Vue.component(VeRing.name, VeRing)
Vue.component(VeHistogram.name, VeHistogram)
Vue.use(exportExcel)
// Vue.use(ElementUI);
Vue.use(GlobalVal)
Vue.use(Util)
Vue.use(Checkout)
Vue.use(ErrorCode)

// 加载
Vue.prototype.$Loading = (text, time = 30000) => {
  const loading = ELEMENT.Loading.service({
    lock: true,
    text: text || '正在处理您的请求，请稍候...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  Vue.nextTick(() => {
    document.getElementById('focusFix').focus()
  })
  loading.async = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (loading.visible) {
        ELEMENT.Message.error('请求超时')
        loading.close()
        reject('请求超时')
      }
    }, time) // 超时设定 30s
  })
  return loading
}

//过滤
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//axios的设置
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf8'
Vue.prototype.$axios = axios
//服务起响应拦截器
axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case '20001':
      case '20002':
      case '20003':
        router.push({ path: '/' })
        break
    }
    return response
  },
  error => {
    return Promise.reject(error.response.data)
  }
)
//路由拦截和面包屑导航设置
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('isLogin')) {
      // 通过vuex state获取当前的token是否存在   || store.state.isLogin
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
    let arr = to.matched.map(item => item.meta.title.split(','))
    store.commit('setBreadcrumbs', arr.reduce((t, n) => t.concat(n), []))
  } else {
    next()
  }
})

//挂载
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
