import request from '@/utils/request'


export function getUser(params) {
    return request({
        url: '/index/weixin/userinfo',
        method: 'get',
        params
    });
}

export function getCode(params) {
    return request({
        url: '/index/weixin/code',
        method: 'get',
        params
    });
}

export function getAuth(params) {
    return request({
        url: '/index/weixin/auth',
        method: 'get',
        params
    });
}

export function pay(data) {
    return request({
        url: '/index/weixin/pay',
        method: 'post',
        data
    });
}