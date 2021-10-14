import router, {
    userRoutes,
    adminRoutes
} from './router';
import { cookie, getQueryParams } from "@/utils/index";
import { Toast } from 'vant';
const weixin = require("@/api/weixin");
const userApi = require("@/api/user");
const venuesApi = require("@/api/venues");

window.AuthType = "";
const QueryParams = getQueryParams(location.href);
const QueryCode = QueryParams.code;
window.venues = QueryParams.aid;

// 直接登录操作
const crossLogin = async (openId, to, from, next) => {
    // 1.优先进行判断是否为普通的成员用户
    let userInfo = await userApi.getUserByOpenId({
        openid: openId
    });
    console.log("userInfo = " + JSON.stringify(userInfo))
    if (userInfo.code == 200 && !!userInfo.data && userInfo.data.userType == 2) {
        let loginInfo = await userApi.wxLogin({
            phone: userInfo.data.phone,
            openid: openId
        });

        if (loginInfo.code == 200 && loginInfo.data) {
            let data = loginInfo.data;
          
            window.AuthType = "user";
            cookie.set('user_id', data.user_id);
            cookie.set('user_phone', data.phone);
            cookie.set('user_token', data.token);
            cookie.set('user_head', data.head);
            cookie.set('user_openid', data.openid);
            cookie.set('user_name', data.name);
            router.addRoutes(userRoutes);
            next({
                ...to,
                replace: true
            });
        } else {
            next();
        }
        return;
    }

    // 2.再确认该用户是不是场馆主用户
    let venuesInfo = await venuesApi.venuesQueryUserByOpenId({
        openid: openId
    });
    // userType = 1 馆主用户, userType = 2 普通用户
    console.log("venuesInfo = " + JSON.stringify(venuesInfo))
    if (venuesInfo.code == 200 && !!venuesInfo.data && venuesInfo.data.userType == 1) {
        let loginInfo = await venuesApi.venuesWxLogin({
            phone: venuesInfo.data.phone,
            openid: openId
        });

        if (loginInfo.code == 200 && loginInfo.data) {
            let data = loginInfo.data;
            window.AuthType = "admin"
            cookie.set('user_phone', data.phone);
            cookie.set('user_token', data.token);
            cookie.set('user_head', data.head);
            cookie.set('user_openid', data.openid);
            cookie.set('user_name', data.name);
            cookie.set('admin_user_id', data.user_id);
            router.addRoutes(adminRoutes);
            next({
                path: "/admin",
                replace: true
            });
        } else {
            next();
        }
        return;
    }
    
    // 如果两种类型用户都没有注册过，则跳转到 普通的成员用户登录页面
    router.addRoutes(userRoutes);
    window.AuthType = "none";
    next({
        ...to,
        replace: true
    });
}

const whiteList = ['/home','/login', '/forget', '/tiyan', '/register', '/404'];

router.beforeEach(async (to, from, next) => {
    document.title = to.meta && to.meta.title || "小鱼管家";
    const CookieOpenID = cookie.get('user_openid');
    // console.log("CookieOpenID = " + CookieOpenID);
    // console.log("AuthType = " + window.AuthType);

    if (!!window.AuthType && window.AuthType == 'none') {
        next();
    } else if (!!window.AuthType && window.AuthType == 'user') {
        next();
    } else if (!!window.AuthType && window.AuthType == 'admin') {
        next();
    } else  {
        if (CookieOpenID) {
            /* CookieOpenID存在的情况, 直接读取登录信息 */
            crossLogin(CookieOpenID, to, from, next);
        } else {
            /* CookieOpenID不存在的情况, 判断有没有Code, 走微信认证 */
            if (!QueryCode) {
                let res = await weixin.getCode({
                    callback: window.location.href
                });
                if (res.code == 200 && !!res.data) {
                    window.location.href = res.data;
                } else {
                    console.log(res);
                }
            } else {
                // code 存在 通过code进行微信认证授权，获取用户的openid
                let res = await weixin.getAuth({
                    code: QueryCode
                });
                if (res.code == 200 && !!res.data) {
                    const ACCESS_TOKEN = res.data.access_token;
                    const OPENID = res.data.openid;
                    
                    let wxUser = await weixin.getUser({
                        openid: OPENID,
                        access_token: ACCESS_TOKEN
                    });

                    if (wxUser.code == 200 && wxUser.data) {
                        cookie.set("weixin_nickname",  wxUser.data.nickname);
                        cookie.set("weixin_openid",  wxUser.data.openid);
                        cookie.set("weixin_headimgurl",  wxUser.data.headimgurl);
                    }
                    // console.log(wxUser)
                    // console.log("OPENID = " + OPENID);
                    // 先去判断是否可以登录，用户已经存在就能登录
                    crossLogin(OPENID, to, from, next);
                } else {
                    // http://localhost:8080/?aid=LYK03fc5rP&code=1&type=app#/
                    if (QueryCode == 1) {
                        console.log("测试中")
                        crossLogin('oz3jNt3hGT_qqdUWFCnxn7_gzjWA1', to, from, next);
                        next();
                    }
                    console.log("Auth认证未知错误")
                    next();
                }
            }
        }
    }

})


