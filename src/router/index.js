import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

const commonRoutes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import('@/views/user/home'),
        meta: {
            title:"小鱼管家-客户端"
        }
    },
    {
        path: '/login',
        component: () => import('@/views/user/login')
    },
    {
        path: '/register',
        component: () => import('@/views/user/register')
    },
    {
        path: '/forget',
        component: () => import('@/views/user/person/fixpass')
    },
    {
        path: '/tiyan',
        component: () => import('@/views/user/tiyan_apply')
    },
    
    {
        path: "/404",
        component: () => import('@/views/404')
    },
    {
        path: "*",
        component: () => import('@/views/404')
    },
]

export const userRoutes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import('@/views/user/home'),
        meta: {
            title:"小鱼管家-客户端"
        }
    },
    {
        path: '/findOk',
        component: () => import('@/views/user/person/fixPassSuccess')
    },
    {
        path: '/book/:type',
        component: () => import('@/views/user/book/index')
    },
    {
        path: '/my_course',
        component: () => import('@/views/user/person/my_course')
    },
    {
        path: '/my',
        component: () => import('@/views/user/person/my')
    },
    {
        path: '/person',
        component: () => import('@/views/user/person/person')
    },
    {
        path: "/my_cards",
        component: () => import('@/views/user/person/my_cards')
    },
    {
        path: "/my_tiyans",
        component: () => import('@/views/user/person/my_tiyans')
    },
    {
        path: "/detail",
        component: () => import('@/views/user/book/detail')
    },
    {
        path: "/online/index",
        component: () => import('@/views/user/online/index')
    },
    {
        path: "/online/series",
        component: () => import('@/views/user/online/series')
    },
    {
        path: "/online/alones",
        component: () => import('@/views/user/online/alones')
    },
    {
        path: "/online/alones_detail/:id",
        component: () => import('@/views/user/online/alones_detail')
    },
    {
        path: "/online/series_detail/:id",
        component: () => import('@/views/user/online/series_detail')
    },
    {
        path: "/online/video/:id",
        component: () => import('@/views/user/online/video')
    },
    {
        path: "/miaosha",
        component: () => import('@/views/user/miaosha/index')
    },
    {
        path: "/miaosha/:id",
        component: () => import('@/views/user/miaosha/detail')
    },
    {
        path: "/tuangou",
        component: () => import('@/views/user/tuangou/index')
    },
    {
        path: "/tuangou/:id",
        component: () => import('@/views/user/tuangou/detail')
    },
    {
        path: "/cards",
        component: () => import('@/views/user/cards/index')
    },
    {
        path: "/card/:id",
        component: () => import('@/views/user/cards/detail')
    },
    {
        path: '/pay/success',
        component: () => import('@/views/user/payok')
    },
    {
        path: '/pay/online_success',
        component: () => import('@/views/user/pay_online_ok')
    },
    {
        path: "/my_orders",
        component: () => import('@/views/user/person/my_orders')
    },
    {
        path: "*",
        component: () => import('@/views/404')
    }
];

export const adminRoutes = [
    {
        path: '/',
        redirect: '/admin'
    },
    {
        path: '/admin',
        component: () => import('@/views/admin/index'),
        meta: {
            title: "管理员系统"
        }
    },
    {
        path: "/manage",
        component: () => import('@/views/admin/manage'),
        meta: {
            title: "管理后台"
        }
    },
    {
        path: "/members",
        component: () => import('@/views/admin/members'),
        meta: {
            title: "学员列表"
        }
    },
    {
        path: "/profit",
        component: () => import('@/views/admin/profit'),
        meta: {
            title: "收入列表"
        }
    },
    {
        path: "/orders",
        component: () => import('@/views/admin/orders'),
        meta: {
            title: "订单列表"
        }
    },
    {
        path: "/my",
        component: () => import('@/views/admin/my'),
        meta: {
            title: "我的"
        }
    },
    {
        path: "*",
        component: () => import('@/views/404')
    }
];

export const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: commonRoutes
})

const router = createRouter()

export default router
