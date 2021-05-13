import request from '@/utils/request'

export function series_channels(params) {
    return request({
        url: '/index/online/channels',
        method: 'get',
        params
    });
}

export function alone_buy(data) {
    return request({
        url: '/index/online/alone_buy',
        method: 'post',
        data
    });
}

export function alones_list(params) {
    return request({
        url: '/index/online/alones',
        method: 'get',
        params
    });
}

export function query_series_by_pid(params) {
    return request({
        url: '/index/online/query_series_by_pid',
        method: 'get',
        params
    });
}

export function query_jingpin_class(params) {
    return request({
        url: '/index/online/jingpin_class',
        method: 'get',
        params
    });
}





export function series_list(params) {
    return request({
        url: '/index/online/series',
        method: 'get',
        params
    });
}

export function query_alone_detail(params) {
    return request({
        url: '/index/online/alone_detail',
        method: 'get',
        params
    });
}

export function query_series_detail(params) {
    return request({
        url: '/index/online/series_detail',
        method: 'get',
        params
    });
}
