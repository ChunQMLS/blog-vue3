import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: ()=> import('@/views/Login/Login.vue')
    },
    {
        name: 'NoPage404',
        path: '/404',
        component: ()=> import('@/views/404/index.vue')
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
        hidden: true
    },
    {
        path: '/admin',
        component: ()=> import('@/views/Layout.vue'),
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/views/Dashboard/DashBoard.vue')
            },
            {
                path: 'myInfoSettings',
                component: ()=> import('@/views/MyInfoSettings/MyInfoSettings.vue'),
                children: [
                    
                    {
                        path:'myinfo',
                        component: ()=> import('@/views/MyInfoSettings/MyInfo.vue'),
                    },
                    {
                        path:'reSetPassword',
                        component: ()=> import('@/views/MyInfoSettings/ResetPassword.vue'),
                    }
                ]
            },
            {
                path: 'basicSettings',
                name: 'basicSettings',
                component: ()=> import('@/views/BasicSettings/BasicSettings.vue')
            },
            {
                path:'themeSettings',
                name: 'themeSettings',
                component: ()=> import('@/views/ThemeSettings/ThemeSettings.vue'),
            },
            {
                path: 'articleManage',
                name: 'articleManage',
                component: ()=> import('@/views/ArticleManage/ArticleManage.vue')
            },
            {
                path: 'comment',
                name: 'comment',
                component: () => import('@/views/Comment/Comment.vue')
            },
            {
                path: 'gallery',
                name: 'gallery',
                component: () => import('@/views/Gallery/Gallery.vue')
            },
            {
                path: 'galleryEditor',
                name: 'galleryEditor',
                component: () => import('@/views/Gallery/GalleryEditor.vue')
            },
            {
                path: 'friendLink',
                name: 'FriendLink',
                component: () => import('@/views/FriendLink/FriendLink.vue')
            }
        ]
    }
]

const router = createRouter({
    
    history: createWebHistory('/root/'),
    routes: routes,
})

export default router