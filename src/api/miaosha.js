import request from '@/utils/request'

export function allList(params) {
    return request({
        url: '/index/miaosha/all',
        method: 'get',
        params
    });
}

export function query(params) {
    return request({
        url: '/index/miaosha/query',
        method: 'get',
        params
    });
}

export function listByCardId(params) {
    return request({
        url: '/index/miaosha/list_by_card_id',
        method: 'get',
        params
    });
}