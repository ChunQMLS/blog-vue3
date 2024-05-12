<script setup lang="ts">
    import MainSidebar from '../MainSidebar.vue'
    import ArticleBar from '@/components/ArticleBar/ArticleBar.vue'
    import SearchBar from './SearchBar.vue'
    import MyCard from '@/components/MyCard/MyCard.vue'
    import Notice from '@/components/Notice/Notice.vue'
    import WebsiteInfo from '@/components/WebsiteInfo/WebsiteInfo.vue'
    import BlogEvent from '@/components/BlogEvent/BlogEvent.vue'
    import { computed, onBeforeMount, ref } from 'vue'
    import { useCategoryStore } from '@/store/global'
    import { getDirArticle } from '@/request/api/articleApi'
    import { Page } from '@/types/article'
    import { useRoute } from 'vue-router'

    defineOptions({
        name: 'Archives'
    })

    const route = useRoute()

    const page = ref<Page>({
        currentPage: 1,
        list: [],
        pageSize: 10,
        size: 0,
        total: 1,
        category: '',
        lable: '',
        start: '',
        end: ''
    })

    const params = computed(() => {
        return {
            currentPage: page.value.currentPage,
            category: page.value.category,
            lable: page.value.lable,
            start: page.value.start,
            end: page.value.end
        }
    })

    onBeforeMount(() => {
        getDirArticle({currentPage:route.params.page || 1}).then( res => {
            page.value = res
        })
    })

    const categoryStore = useCategoryStore()

    const handleSearch = (category:string,label:string,dateRange:string[] | null)=>{
        page.value.category = category
        page.value.lable = label
        dateRange ? page.value.start = dateRange[0] : page.value.start = ''
        dateRange ? page.value.end = dateRange[1] : page.value.end = ''
        getDirArticle(params.value).then( res => {
            page.value = res
        })
    }

    const currentChange = (currentPage:number) => {
        page.value.currentPage = currentPage
        getDirArticle(page.value).then( res => {
            page.value = res
        })
    }

</script>

<template>
    <MainSidebar>
        <template #left>
            <SearchBar 
                :category-options="categoryStore.category"
                @search="handleSearch"
                 />
            <ArticleBar :articles="page?.list"/>
            <el-pagination class="pagination" layout="prev, pager, next" :current-page="page.currentPage" :total="page.total" :pager-count="5" @current-change="currentChange"/>
        </template>
        <template #right>
            <MyCard/>
            <Notice/>
            <div class="sticky-layout">
                <BlogEvent/>
                <WebsiteInfo/>
            </div>
        </template>
    </MainSidebar>
</template>