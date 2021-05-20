import request from '@/utils/request'

export function myCards(params) {
    return request({
        url: '/index/member/cards',
        method: 'get',
        params
    });
}

export function list(params) {
    return request({
        url: '/index/cards/list',
        method: 'get',
        params
    });
}

export function query(params) {
    return request({
        url: '/index/cards/query',
        method: 'get',
        params
    });
}
