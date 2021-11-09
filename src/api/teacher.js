import request from '@/utils/request'


export function list(params) {
    return request({
        url: '/index/teacher/list',
        method: 'get',
        params
    });
}


export function list_by_star(params) {
    return request({
        url: '/index/teacher/list_by_star',
        method: 'get',
        params
    });
}



