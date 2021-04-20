import request from '@/utils/request'


export function login(data) {
    return request({
        url: '/index/login',
        method: 'post',
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