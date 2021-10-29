import Vue from 'vue'
import Vant, { Image as VanImage } from 'vant';
import '@/assets/less/style.less';
import 'vant/lib/index.less';
import router from './router'
import { Notify } from 'vant';
import { Empty } from 'vant';
import VueClipboard from 'vue-clipboard2'
import { Lazyload } from 'vant';
import { DatetimePicker } from 'vant';

import './permission'

// 全局注册
Vue.use(Vant);
Vue.use(Notify);
Vue.use(Lazyload);
Vue.use(Empty);
Vue.use(VanImage);
Vue.use(DatetimePicker);
Vue.use(VueClipboard)
Vue.config.productionTip = false

import App from './App.vue'

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
