import { getTableArticle, getTableArticleWithRecycle } from "@/request/api/useArticleApi"
import { Page } from "@/types"
import { Article, PageResult } from "@/types/article"
import { ref } from "vue"

export function useBlog() {

    const config = ref({
        pageSize: 10
    })

    const articles = ref<Article[]>([])

    const articleData = ref<PageResult<Article>>({
        size: 0,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        list: []
    })

    function getArticles(currentPage:number = 1,search:string = '') {
        const page:Page = {
            currentPage,
            pageSize: config.value.pageSize,
            search
        }
        getTableArticle(page).then( res => {
            articleData.value = res as PageResult<Article>
        })
    }

    function getArticleAll() {
        getTableArticle({currentPage: 0,pageSize: 0}).then( res => {
            articles.value = res as Article[]
        })
    }

    function getArticlesWithRecycle(currentPage:number = 1,search:string = '') {
        const page:Page = {
            currentPage,
            pageSize: config.value.pageSize,
            search
        }
        getTableArticleWithRecycle(page).then( res => {
            articleData.value = res
        })
    }

    return { articles,articleData,getArticles,getArticleAll,getArticlesWithRecycle }

}