import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import FastClick from 'fastclick'

import store from './store/index'


Vue.config.productionTip = false;

//fastClick  处理移动端300ms点击间隙问题   
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

//引入样式
import '@/style/common.less'

//引入全局
import '@/plugins/vant.js'
import '@/config/rem.js'
import '@/config/filter.js'


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
