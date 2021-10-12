import request from '@/utils/request'


export function query(params) {
    return request({
        url: '/index/venues/query',
        method: 'get',
        params
    });
}

export function venuesWxLogin(data) {
    return request({
        url: '/venues/wx/login',
        method: 'post',
        data
    });
}

export function venuesQueryUserByOpenId(data) {
    return request({
        url: '/venues/venues/query_user_by_openid',
        method: 'post',
        data
    });
}