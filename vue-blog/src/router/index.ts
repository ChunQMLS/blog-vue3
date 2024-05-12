import { createRouter,createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: ()=> import('@/views/Layout.vue'),
        children:[
            {
                name: 'Home',
                path:'',
                component: ()=> import('@/views/Home/Home.vue'),
            },
            {
                name: 'Category',
                path:'category',
                component: ()=> import('@/views/Category/Category.vue'),
            },
            {
                name: 'Lable',
                path:'lable',
                component: ()=> import('@/views/Lable/Lable.vue'),
            },
            {
                name: 'Archives',
                path: 'archives/:page?',
                component: ()=> import('@/views/Archives/Archives.vue')
            },
            {
                name: 'Blog',
                path: 'blog/:id',
                component: ()=> import('@/views/Blog/Blog.vue')
            },
            {
                name: 'Gallery',
                path: 'gallery',
                component: ()=> import('@/views/Gallery/Gallery.vue')
            },
            {
                name: 'GalleryRes',
                path: 'galleryRes/:id',
                component: ()=> import('@/views/Gallery/GalleryRes.vue')
            },
            {
                name: 'FriendshipLink',
                path: 'friendshipLink',
                component: ()=> import('@/views/FriendshipLink/FriendshipLink.vue')
            },
            {
                name: 'MessageBoard',
                path: 'messageBoard',
                component: ()=> import('@/views/MessageBoard/MessageBoard.vue')
            },
            {
                name: 'About',
                path: 'about',
                component: ()=> import('@/views/About/About.vue')
            }
        ],
        
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPositon) {
        if (savedPositon) {
            return savedPositon
        }else if(to.path === '/about' && 'event' in to.query) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        el: to.query.event?.toString(),
                        behavior: 'smooth',
                        top: 60
                    })
                }, 500)
            })
        }else {
            return { top: 0 }
        }
    }
})

export default router