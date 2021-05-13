import request from '@/utils/request'


export function query(params) {
    return request({
        url: '/index/venues/query',
        method: 'get',
        params
    });
}