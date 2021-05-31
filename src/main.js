import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/less/style.less';
import router from './router'
import { Notify } from 'vant';
import { Empty } from 'vant';
import { Toast } from 'vant';
import { Lazyload } from 'vant';
import { cookie, getQueryParams} from "@/utils/index";
const weixin = require("@/api/weixin");
const userApi = require("@/api/user");
// 全局注册

Vue.use(Vant);
Vue.use(Notify);
Vue.use(Lazyload);
Vue.use(Empty);
Vue.config.productionTip = false

// http://localhost:8080/?aid=LYK03fc5rP&code=1&type=app#/
const fetchUserInfo = async (code) => {
	if (!code) {
		let res = await weixin.getCode({
			callback: location.href
		});
		if (res.code == 200 && !!res.data){
			location.href = res.data;
		} else {
			console.log(res);	
		}
	} else {
		let res = await weixin.getAuth({
			code
		});
		if (res.code == 200 && !!res.data) {
			const ACCESS_TOKEN = res.data.access_token
			const OPENID = res.data.openid

			let userInfo = await userApi.getUserByOpenId({
				openid: OPENID
			});
			// console.log("userInfo = " + JSON.stringify(userInfo))
			if (userInfo.code == 200 && !!userInfo.data) {
				let loginInfo = await userApi.wxLogin({
					phone: userInfo.data.phone,
					openid:OPENID
				});

				let data = loginInfo.data;
				cookie.set('user_id', data.user_id);
                cookie.set('user_phone', data.phone);
				cookie.set('user_token', data.token);
                cookie.set('user_head', data.head);
                cookie.set('user_openid', OPENID);
				Toast.success("登录成功");
			} else {
				let weixinUser = await weixin.getUser({
					openid: OPENID,
					access_token: ACCESS_TOKEN
				});
				let {
					nickname,
					headimgurl,
					openid
				} = weixinUser.data;
				cookie.set('weixin_openid', openid);
				cookie.set('weixin_nickname', nickname);
				cookie.set('weixin_headimgurl', headimgurl);
				
				router.replace({
					path:"/register"
				});
			} 
		} else {
		 	//Toast.fail("用户授权失败");
		}
	}
}

let queryParams = getQueryParams(location.href);
window.venues = queryParams.aid;

fetchUserInfo(queryParams.code);

import App from './App.vue'

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
