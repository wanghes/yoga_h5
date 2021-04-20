import request from '@/utils/request'


export function query(params) {
    return request({
        url: '/index/course/query',
        method: 'get',
        params
    });
}