<script setup lang="ts">
import MainSidebar from '../MainSidebar.vue'
import MyCard from '@/components/MyCard/MyCard.vue'
import Notice from '@/components/Notice/Notice.vue'
import LableBar from '@/components/LableBar/LableBar.vue'
import WebsiteInfo from '@/components/WebsiteInfo/WebsiteInfo.vue'
import BlogEvent from '@/components/BlogEvent/BlogEvent.vue'
import FriendshipLinkItem from './FriendshipLinkItem.vue'
import Comment from '@/components/Comment/Comment.vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { onBeforeMount, ref } from 'vue'
import { FriendLink } from '@/types/friendLink'
import { getFriendLink, getFriendLinkTip } from '@/request/api/frirendLinkAip'

defineOptions({
    name:'FriendshipLink'
})

const friendLinks = ref<FriendLink[]>([])

const friendLinkTip = ref('')

onBeforeMount(() => {
    getFriendLink().then( res => {
        friendLinks.value = res
    })
    getFriendLinkTip().then( res => {
        friendLinkTip.value = res
    })
})


</script>

<template>
    <MainSidebar>
        <template #left>
            <div class="container">
                <h1 class="page-title">友情链接</h1>
                <FriendshipLinkItem title="友情链接" read-me="相逢何必曾相识" :data="friendLinks" />
                <el-divider />
                <MdPreview editor-id="preview-only" :model-value="friendLinkTip" preview-theme="vuepress" />
                <el-divider />
                <Comment/>
            </div>
        </template>
        <template #right>
            <MyCard/>
            <Notice/>
            <LableBar/>
            <div class="sticky-layout">
                <BlogEvent/>
                <WebsiteInfo/>
            </div>
        </template>
    </MainSidebar>
</template>

<style scoped lang="scss">
.page-title {
    font-weight: 700;
    font-size: 1.6rem;
    text-align: center;
}
</style>