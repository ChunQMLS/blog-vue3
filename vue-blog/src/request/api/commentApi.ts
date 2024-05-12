import instance from '@/request/index'
import { Comment } from '@/types'

export function uploadComment(data?:Object) {
    return instance<any,string>({
        url: '/visitor/insertComment',
        method: 'POST',
        data
    })
}

export function getCommentsWithBlog(params?:Object) {
    return instance<any,Comment[]>({
        url: '/visitor/getCommentsWithBlog',
        method: 'GET',
        params
    })
}

export function getCommentTip() {
    return instance<any,string>({
        url: '/visitor/getCommentTip',
        method: 'GET'
    })
}