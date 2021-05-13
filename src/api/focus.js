import request from '@/utils/request'


export function list(params) {
    return request({
        url: '/index/focus',
        method: 'get',
        params
    });
}