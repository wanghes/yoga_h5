import request from '@/utils/request'


export function list(params) {
    return request({
        url: '/index/teacher/list',
        method: 'get',
        params
    });
}