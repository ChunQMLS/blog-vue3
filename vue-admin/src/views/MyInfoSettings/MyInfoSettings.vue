<script setup lang="ts">
    import { Menu } from '@/types'
    import { ref } from 'vue'

    defineOptions({
        name: 'MyInfoSettings'
    })

    const menu = ref<Menu[]>([
        {
            title: '我的信息',
            path: '/admin/myInfoSettings/myinfo'
        },
        {
            title: '密码修改',
            path: '/admin/myInfoSettings/resetPassword'
        }
    ])

</script>

<template>
    <div class="myinfo-page">
        <el-menu
            class="menu-list"
            :default-active="menu[0].path"
            :router="true"
            mode="horizontal">
            <el-menu-item v-for="(item, index) in menu" :key="index" :index="item.path">{{ item.title }}</el-menu-item>
        </el-menu>
        <RouterView></RouterView>
    </div>
</template>

<style scoped>
.myinfo-page {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.menu-list {
    height: 50px;
    box-shadow: 0px 5px 5px -5px var(--boxshadow-main-color);
}
</style>