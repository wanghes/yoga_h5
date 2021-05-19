import request from '@/utils/request'

export function allList(params) {
    return request({
        url: '/index/tuangou/all',
        method: 'get',
        params
    });
}

export function query(params) {
    return request({
        url: '/index/tuangou/query',
        method: 'get',
        params
    });
}

export function listByCardId(params) {
    return request({
        url: '/index/tuangou/list_by_card_id',
        method: 'get',
        params
    });
}