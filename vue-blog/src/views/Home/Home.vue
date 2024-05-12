<script setup lang="ts">
    import MainSidebar from '../MainSidebar.vue'
    import Calendar from './Calendar.vue'
    import CarouselArticles from './CarouselArticles.vue'
    import CategoryBar from './CategoryBar.vue'
    import ArticleBar from '@/components/ArticleBar/ArticleBar.vue'
    import MyCard from '@/components/MyCard/MyCard.vue'
    import Notice from '@/components/Notice/Notice.vue'
    import LableBar from '@/components/LableBar/LableBar.vue'
    import WebsiteInfo from '@/components/WebsiteInfo/WebsiteInfo.vue'
    import BlogEvent from '@/components/BlogEvent/BlogEvent.vue'
    import { computed, onBeforeMount, ref } from 'vue'
    import { getRecommendArticle } from '@/request/api/homeApi'
    import { RecommendArticle } from '@/types/home'
    import { ArticleDir } from '@/types/article'

    defineOptions({
        name: 'Home'
    })

    const recommendArticle = ref<RecommendArticle>({
        hot: [],
        recommend: []
    })

    const recommend = computed<ArticleDir[]>(() => {
        const list = recommendArticle.value.recommend.filter( recommend => {
            console.log(recommendArticle.value.hot.includes(recommend))
            if (!recommendArticle.value.hot.includes(recommend)) {
                return recommend
            }
        })
        return list
    })

    onBeforeMount(() => {
        // 获取热点和推荐文章
        getRecommendArticle().then( res => {
            recommendArticle.value = res
            console.log(recommendArticle.value)
        })
    })
</script>

<template>
    <MainSidebar>
        <template #left>
            <Calendar/>
            <CarouselArticles :articles="recommendArticle.hot"/>
            <CategoryBar/>
            <ArticleBar :articles="recommend"/>
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