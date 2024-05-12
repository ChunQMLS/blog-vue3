<script setup lang="ts">
    import { onBeforeMount, ref } from 'vue'
    import { MenuConfig } from '@/types'
    import { useUserStore } from '@/stores/useUserStore'
    import { isExistToken, removeToken } from '@/utils/token'
    import { useRouter } from 'vue-router'
    

    defineOptions({
        name: 'Layout'
    })

    const config = ref<MenuConfig>({
        websiteName: 'Yukioo后台',
        menu: [
            {
                title: '仪表盘',
                path: '/admin',
                children: []
            },
            {
                title: '网站设置',
                path: '',
                children: [
                    {
                        title: '基本设置',
                        path: '/admin/basicSettings'
                    },
                    {
                        title: '我的信息',
                        path: '/admin/myInfoSettings/myinfo'
                    },
                    {
                        title: '主题设置',
                        path: '/admin/themeSettings'
                    }
                ]
            },
            {
                title: '文章管理',
                path: '/admin/articleManage'
            },
            {
                title: '评论管理',
                path: '/admin/comment',
                children: []
            },
            {
                title: '图库管理',
                path: '/admin/gallery',
                children: []
            },
            {
                title: '友链管理',
                path: '/admin/friendLink',
                children: []
            }
        ]
    })

    const store = useUserStore()
    const router = useRouter()

    const logOutHandler = () => {
        removeToken()
        router.push('/login')
    }

    onBeforeMount(()=>{
        if(!isExistToken()) {
            router.push('/login')
        }
        store.getMyInfoHandler()
    })

</script>

<template>
    <div class="page">
        <div class="menu">
            <div class="website-name">
                {{ config.websiteName }}
            </div>
            <div class="menu-container">
                <el-menu
                    class="menu-list"
                    :unique-opened="true"
                    :router="true"
                    :default-active="config.menu[0].path">
                    <template v-for="(item,index) in config.menu" :key="index" >
                        <el-menu-item v-if="item.path !== ''" :index="item.path">
                            <span>{{ item.title }}</span>
                        </el-menu-item>
                        <el-sub-menu v-else :index="index.toString()">
                            <template #title>
                                <span>{{ item.title }}</span>
                            </template>
                            <el-menu-item v-for="(child, index) in item.children" :key="index" :index="child.path">
                                <span>{{ child.title }}</span>
                            </el-menu-item>
                        </el-sub-menu>
                    </template>
                </el-menu>
            </div>
        </div>
        <div class="console">
            <div class="status-bar">
                <el-button>
                    <a href="https://www.yukioo.xyz" target="_blank">前台</a>
                </el-button>
                <el-button type="danger" @click="logOutHandler">登出</el-button>
                <div class="my-info">
                    <el-avatar :src="store.myInfo?.avatar" />
                    <span>{{ store.myInfo?.nickname }}</span>
                </div>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    min-height: 750px;
}
.menu {
    min-width: 250px !important;
    text-align: center;
    display: flex;
    flex-direction: column;
    box-shadow: 5px 0px 5px -5px var(--boxshadow-main-color);
    background: var(--theme-main-color);
}
.website-name {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    font-size: 1.4rem;
}
.menu-list {
    border: none;
    flex: 1;
}
.console {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
}
.status-bar {
    min-height: 60px;
    height: 8vh;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #ffffff;
    background-color: var(--theme-secondary-color);
}
.status-bar a {
    color: inherit;
    text-decoration: none;
}
.my-info {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
}
.status-bar>*,.my-info>* {
    margin-right: 10px;
}
.content {
    flex: 1;
    max-height: calc(92vh - 1px);
    overflow-y: auto;
}
</style>