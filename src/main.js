import Vue from 'vue'
import App from './App'
import VueJsonForm from '../packages/index'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(VueJsonForm)

new Vue({
  render: h => h(App)
}).$mount('#app')
