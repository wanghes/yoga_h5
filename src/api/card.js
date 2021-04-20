import request from '@/utils/request'


export function myCards(params) {
    return request({
        url: '/index/member/cards',
        method: 'get',
        params
    });
}