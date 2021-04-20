import request from '@/utils/request'


export function get_all_course(params) {
    return request({
        url: '/index/course/all',
        method: 'get',
        params
    });
}


export function apply_tiyan(data) {
    return request({
        url: '/index/course/tiyan',
        method: 'post',
        data
    });
}


export function get_tiyan_list(params) {
    return request({
        url: '/index/course/tiyan_list',
        method: 'get',
        params
    });
}

