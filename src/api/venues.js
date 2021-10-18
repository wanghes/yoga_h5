import request from '@/utils/request'


export function query(params) {
    return request({
        url: '/index/venues/query',
        method: 'get',
        params
    });
}

export function venuesWxLogin(data) {
    return request({
        url: '/venues/wx/login',
        method: 'post',
        data
    });
}

export function venuesQueryUserByOpenId(data) {
    return request({
        url: '/venues/venues/query_user_by_openid',
        method: 'post',
        data
    });
}

export function fetchVenues(data) {
    return request({
        url: '/venues/venues/query_by_admin_user_id',
        method: 'post',
        data
    });
}


export function fetchOrders(data) {
    return request({
        url: '/venues/venues/fetch_orders',
        method: 'post',
        data
    });
}

export function fetchBills(data) {
    return request({
        url: '/venues/venues/fetch_bills',
        method: 'post',
        data
    });
}


export function fetchMembers(data) {
    return request({
        url: '/venues/venues/fetch_members',
        method: 'post',
        data
    });
}

