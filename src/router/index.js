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
        path: "/my_cards",
        component: () => import('@/views/my_cards')
    },
    {
        path: "/detail",
        component: () => import('@/views/detail')
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
