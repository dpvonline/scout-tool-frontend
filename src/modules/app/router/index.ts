export default [
    {
        path: '/',
        name: 'app',
        meta: { requiresAuth: true },
        redirect: { name: 'dashboard' },
        component: () => import(/* webpackChunkName: "AppMain" */ '@/modules/app/AppMain.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                meta: { requiresAuth: true },
                component: () => import(/* webpackChunkName: "dashboardMain" */ '@/modules/app/views/dashboard/Main.vue')
            },
        ]
    }
] 