import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router);


export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login')
    },
    {
        path: '/register',
        component: () => import('@/views/register')
    },
    {
        path: '/forget',
        component: () => import('@/views/fixpass')
    },
    {
        path: '/findOk',
        component: () => import('@/views/fixPassSuccess')
    },
    {
        path: '/',
        component: () => import('@/views/home')
    },
    {
        path: '/book/:type',
        component: () => import('@/views/book')
    },
    {
        path: '/tiyan',
        component: () => import('@/views/tiyan_apply')
    },
    {
        path: '/my_course',
        component: () => import('@/views/my_course')
    },
    {
        path: '/my',
        component: () => import('@/views/my')
    },
    {
        path: '/person',
        component: () => import('@/views/person')
    },
    {
        path: "/my_cards",
        component: () => import('@/views/my_cards')
    },
    {
        path: "/detail",
        component: () => import('@/views/detail')
    },
    {
        path: "/online/index",
        component: () => import('@/views/online/index')
    },
    {
        path: "/online/series",
        component: () => import('@/views/online/series')
    },
    {
        path: "/online/alones",
        component: () => import('@/views/online/alones')
    },
    {
        path: "/online/alones_detail/:id",
        component: () => import('@/views/online/alones_detail')
    },
    {
        path: "/online/series_detail/:id",
        component: () => import('@/views/online/series_detail')
    },
    {
        path: "/miaosha",
        component: () => import('@/views/miaosha/index')
    },
    {
        path: "/miaosha/:id",
        component: () => import('@/views/miaosha/detail')
    },
    {
        path: "/tuangou",
        component: () => import('@/views/tuangou/index')
    },
    {
        path: "/tuangou/:id",
        component: () => import('@/views/tuangou/detail')
    },
    {
        path: "/cards",
        component: () => import('@/views/cards/index')
    },
    {
        path: "/card/:id",
        component: () => import('@/views/cards/detail')
    }
];

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

export default router
