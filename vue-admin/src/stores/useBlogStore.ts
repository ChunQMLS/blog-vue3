import { defineStore } from 'pinia'
import { getCategoryAndLable } from '@/request/api/useArticleApi'
import { Category } from '@/types/article'

export const useBlogStore = defineStore('blog',{
    state: () => {
        return {
            categoryLables: [] as Category[]
        }
    },
    actions: {
        getCategoryLables() {
            getCategoryAndLable().then( res => {
                this.categoryLables = res
            })
        }
    }
})