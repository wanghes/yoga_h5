import axios from 'axios';
import {
    cookie
} from "@/utils/index"
import {
    BASEURL
} from "@/utils/config"
import { Toast } from 'vant';
import Router from '@/router/index'

const service = axios.create({
    baseURL: BASEURL,
    // withCredentials: true, // 当跨域请求时设置cookie
    timeout: 5000 // 超时时间限制
});

// 请求拦截
service.interceptors.request.use(
    config => {
        let user_id = cookie.get('user_id')
        let user_token = cookie.get('user_token')
        if (user_token) {
            // 让每次请求携带token信息
            config.headers['Authorization'] = "bearer "+user_token;
        }
        if (user_id) {
            config.headers['UserId'] = user_id;
        }
        config.headers['VenuesID'] = window.venues;
        return config;
    },
    error => {
        // 请求出错是做一些事情
        console.log(error);
        return Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data;
         // console.log(res)
        if (res.code !== 200) {
            if (res.code == 401) {
                Toast({
                    message: res.msg || 'Error',
                    duration: 3 * 1000
                });
                cookie.del('user_id');
                cookie.del('user_token');
                setTimeout(() => {
                    Router.push({path: '/login'});
                }, 0);
                return res;
            } else if (res.code == 90001) {
                // 这里不排除错误的地方
                return res;
            }
            Toast({
                message: res.msg || "未知错误，联系管理员",
                duration: 3 * 1000
            });
            return res;
        } else  {
            return res;
        }
    },
    error => {
        console.log(error)
        if (error.response && error.response.status == 500) {
            let res = error.response.data;
            /* 
             * res.code
             * 401: 无效的token， 其客户端登录 ， Token 过期;
             * 需要重新登录
             */
            if (res.code === 401) {
                Toast({
                    message: "请先登录" || 'Error',
                    duration: 3 * 1000
                });
                cookie.del('user_id')
                cookie.del('user_token')
                setTimeout(() => {
                    Router.push({path: '/login'})
                }, 0);
            }
        } else {
            Toast({
                message: res.msg || "未知错误，联系管理员",
                duration: 3 * 1000
            });
            // console.log(res.msg || 'Error')
            return Promise.reject(error);
        }
    }
)

export default service;
