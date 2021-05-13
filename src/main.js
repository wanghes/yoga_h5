import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/less/style.less';
import router from './router'
import { Notify } from 'vant';
import { Empty } from 'vant';
import { Lazyload } from 'vant';


// 全局注册

Vue.use(Vant);
Vue.use(Notify);
Vue.use(Lazyload);
Vue.use(Empty);
Vue.config.productionTip = false


const getQueryParams = (url) => {
  let args = new Object();
  let query = url.substring(url.indexOf('?') + 1);
  let pairs = query.split("&");
  for (let i = 0; i < pairs.length; i++) {
      let pos = pairs[i].indexOf('=');
      if (pos == -1) continue;
      let argname = pairs[i].substring(0, pos);
      let value = pairs[i].substring(pos + 1);
      args[argname] = unescape(value);
  }
  args.home = url.split('?')[0]
  return args;
}

let queryParams = getQueryParams(location.href);
window.venues = queryParams.aid && queryParams.aid.split('#')[0];

// console.log(window.venues);

import App from './App.vue'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
