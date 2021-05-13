import request from '@/utils/request'


export function allList(params) {
    return request({
        url: '/index/adviser/all',
        method: 'get',
        params
    });
}