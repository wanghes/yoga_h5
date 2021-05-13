import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/index/login',
        method: 'post',
        data
    });
}

export function register(data) {
    return request({
        url: '/index/register',
        method: 'post',
        data
    });
}

export function updateInfo(data) {
    return request({
        url: '/index/update/info',
        method: 'put',
        data
    });
}

export function smsLogin(data) {
    return request({
        url: '/index/sms/login',
        method: 'post',
        data
    });
}

export function getVcode(data) {
    return request({
        url: '/index/get/vcode',
        method: 'post',
        data
    });
}

export function editPassword(data) {
    return request({
        url: '/index/update/password',
        method: 'put',
        data
    });
}

export function getUser(params) {
    return request({
        url: '/index/member/query',
        method: 'get',
        params
    });
}