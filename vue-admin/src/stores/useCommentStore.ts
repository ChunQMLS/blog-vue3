import { getCommentsWithTable, getNoReplyCommentsWithTable } from '@/request/api/useCommentApi'
import { PageResult } from '@/types/article'
import { Comment } from '@/types/comment'
import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comment',{
    state: () => {
        return {
            config: {
                pageSize: 10
            },
            commentData: {
                size: 0,
                total: 0,
                currentPage: 1,
                pageSize: 7,
                list: []
            } as PageResult<Comment>
        }
    },
    actions: {
        getComment(currentPage:number = 1) {
            getCommentsWithTable({currentPage,pageSize: this.config.pageSize}).then(res => {
                this.commentData = res
            })
        },
        getNoReplyComment(currentPage:number = 1) {
            getNoReplyCommentsWithTable({currentPage,pageSize: this.config.pageSize}).then( res => {
                this.commentData= res
            })
        }
    }
})