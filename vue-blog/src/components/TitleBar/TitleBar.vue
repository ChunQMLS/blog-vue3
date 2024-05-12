<script setup lang="ts">
import { Article } from '@/types/article'
import { useRouter } from 'vue-router'

const { article } = defineProps<{article: Article | undefined}>()

const router = useRouter()

const handleJumpCategory = (category:string | undefined) => {
    router.push({name: 'Archives',query:{category}})
}

const handleJumpLable = (category:string | undefined) => {
    router.push({name: 'Archives',query:{category}})
}

</script>

<template>
    <div class="post-info">
        <h1 class="post-title">{{ article?.title }}</h1>
        <div class="post-meta">
            <div class="meta-fristline">
                <i class="fa fa-calendar"></i>
                <span>发表日期</span>
                <time :datetime="article?.releasedate">{{ article?.releasedate }}</time>
                <span class="separator">|</span>
                <i class="fa fa-history"></i>
                <span>更新日期</span>
                <time :datetime="article?.updatedate">{{ article?.updatedate }}</time>
                <span class="separator">|</span>
                <i class="fa fa-clone"></i>
                <span>分类</span>
                <span class="tag-click" @click="handleJumpCategory(article?.category)">{{ article?.category }}</span>
                <span class="separator">|</span>
                <i class="fa fa-tag"></i>
                <span>标签</span>
                <span class="tag-click" @click="handleJumpLable(article?.lable)">{{ article?.lable }}</span>
            </div>
            <div class="meta-secondline">
                <i class="fa fa-edit"></i>
                <span>字数总计:</span>
                <span>{{ article?.content.length }}</span>
                <span class="separator">|</span>
                <i class="fa fa-eye"></i>
                <span>浏览量:</span>
                <span>{{ article?.visits }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.post-info {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #eee;
}
.post-title {
    font-size: 3rem;
}
.post-meta {
    margin: 20px 0;
}
.meta-fristline,.meta-secondline {
    text-align: center;
}
.meta-fristline>*,.meta-secondline>* {
    margin: 0 2px;
}
.tag-click {
    cursor: pointer;
}
.tag-click:hover {
    color: #fb883c;
}
</style>