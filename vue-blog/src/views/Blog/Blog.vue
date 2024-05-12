<script setup lang="ts" >
    import { onBeforeMount, ref } from 'vue'
    import { MdPreview,MdCatalog } from 'md-editor-v3'
    import 'md-editor-v3/lib/style.css'
    import MainSidebar from '../MainSidebar.vue'
    import Comment from '@/components/Comment/Comment.vue'
    import { useRoute } from 'vue-router'
    import { getArticleById } from '@/request/api/articleApi'
    import { Article } from '@/types/article'
    import TitleBar from '@/components/TitleBar/TitleBar.vue'
    import { articleVisit } from '@/request/api/articleApi'
    import CoryRight from './CoryRight.vue'

    defineOptions({
        name: 'Blog'
    })

    const route = useRoute()

    const article = ref<Article>()

    onBeforeMount(() => {
        articleVisit({id:route.params.id})
        getArticleById({id:route.params.id}).then( res => {
            article.value = res
        })
    })

    const scrollElement = document.documentElement
</script>

<template>
    <MainSidebar>
        <template #top>
            <TitleBar :article="article"/>
        </template>
        <template #left>
            <div class="container">
                <MdPreview 
                    editor-id="preview-only"
                    class="md-preview"
                    :model-value="article?.content" 
                    preview-theme="vuepress"
                    :show-code-row-number="true"/>
                <CoryRight :title="article?.title"/>
                <el-divider />
                <Comment/>
            </div>
        </template>
        <template #right>
            <div class="container catelog-box sticky-layout">
                <div class="catelog">
                    <i class="fa fa-align-justify"></i>
                    <span>目录</span>
                </div>
                <MdCatalog class="md-catalog" editor-id="preview-only" :scroll-element="scrollElement"/>
            </div>
        </template>
    </MainSidebar>
</template>

<style scoped lang="scss">
.container {
    padding: 20px 40px;
    margin-bottom: 0;

    @include respond-to {
        padding: 20px;
    }
}
.catelog-box {
    padding: 20px 30px;

    @include respond-to {
        display: none;
    }
}
.catelog {
    font-size: 1.2rem;
    padding-bottom: 10px;

    * {
        margin-right: 6px;
    }
}
.md-catalog {
    overflow-y: scroll;
    overflow-y: overlay;
    max-height: calc(100vh - 170px);
    width: calc(100% + 24px);
}
</style>