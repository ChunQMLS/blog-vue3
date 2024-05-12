<script setup lang="ts">
import MainSidebar from '../MainSidebar.vue'
import MyCard from '@/components/MyCard/MyCard.vue'
import Notice from '@/components/Notice/Notice.vue'
import LableBar from '@/components/LableBar/LableBar.vue'
import WebsiteInfo from '@/components/WebsiteInfo/WebsiteInfo.vue'
import Event from './Event.vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { onBeforeMount, ref } from 'vue'
import { getAbout } from '@/request/api/aboutApi'

const about = ref('')

onBeforeMount(() => {
    getAbout().then( res => {
        about.value = res
    })
})

</script>

<template>
    <MainSidebar>
        <template #left>
            <div class="container">
                <MdPreview editor-id="preview-only" :model-value="about" preview-theme="vuepress"/>
                <Event />
            </div>
        </template>
        <template #right>
            <MyCard/>
            <Notice/>
            <div class="sticky-layout">
                <LableBar/>
                <WebsiteInfo/>
            </div>
        </template>
    </MainSidebar>
</template>

<style scoped lang="scss">
.container {
    @include respond-to {
        padding: 20px;
    }
}
</style>