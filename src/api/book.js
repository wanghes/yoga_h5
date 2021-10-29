import request from '@/utils/request'




export function tuanke_list_by_date(data) {
    return request({
        url: '/index/tuanke/tuanke_list_by_date',
        method: 'post',
        data
    });
}


export function sijiao_list_by_date(data) {
    return request({
        url: '/index/sijiao/sijiao_list_by_date',
        method: 'post',
        data
    });
}


export function tuanke_list(params) {
    return request({
        url: '/index/tuanke/list',
        method: 'get',
        params
    });
}

export function sijiao_list(params) {
    return request({
        url: '/index/sijiao/list',
        method: 'get',
        params
    });
}

export function add(data) {
    return request({
        url: '/index/book/add',
        method: 'post',
        data
    });
}

export function getCourse(params) {
    return request({
        url: '/index/member/course',
        method: 'get',
        params
    });
}

// export function cancel(data) {
// 	return request({
// 		url: '/admin/book/cancel',
// 		method: 'put',
// 		data
// 	})
// }