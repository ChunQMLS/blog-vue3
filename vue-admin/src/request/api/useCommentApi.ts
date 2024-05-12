import instance from '@/request/index'
import { PageResult } from '@/types/article'
import { Comment } from '@/types/comment'

export function getCommentsWithTable(data?:Object){
    return instance<any,PageResult<Comment>>({
        url: '/admin/getCommentsWithTable',
        method: 'POST',
        params:data
    })
}

export function getNoReplyCommentsWithTable(data?:Object){
    return instance<any,PageResult<Comment>>({
        url: '/admin/getNoReplyCommentsWithTable',
        method: 'POST',
        params:data
    })
}

export function insertComment(data?:Object){
    return instance<any,string>({
        url: '/visitor/insertComment',
        method: 'POST',
        data
    })
}

export function deleteComment(data?:Object){
    return instance<any,string>({
        url: '/admin/deleteComment',
        method: 'POST',
        data
    })
}

export function ignoreReplyAll(){
    return instance<any,string>({
        url: '/admin/replyIsTrueAll',
        method: 'GET'
    })
}

export function ignoreReply(data?:Object){
    return instance<any,string>({
        url: '/admin/replyIsTrue',
        method: 'POST',
        data
    })
}

export function insertBlackList(data?:Object){
    return instance<any,string>({
        url: '/admin/insertBlackList',
        method: 'POST',
        data
    })
}

export function deleteBlackList(data?:Object){
    return instance<any,string>({
        url: '/admin/deleteBlackList',
        method: 'POST',
        data
    })
}

export function getBlackList(){
    return instance<any,string[]>({
        url: '/admin/getBlackList',
        method: 'GET'
    })
}