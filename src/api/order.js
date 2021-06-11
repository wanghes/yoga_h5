import request from '@/utils/request'

export function list(data) {
    return request({
        url: '/index/order/list',
        method: 'post',
        data
    });
}
