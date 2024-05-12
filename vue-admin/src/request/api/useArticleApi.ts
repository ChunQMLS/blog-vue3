import instance from '@/request/index'
import { Article, BarData, BlogForm, Category, PageResult } from '@/types/article'

export function getTableArticle(data?:Object){
    return instance<any,PageResult<Article> | Article[]>({
        url: '/admin/getTableArticle',
        method: 'POST',
        params:data
    })
}

export function getTableArticleWithRecycle(data?:Object){
    return instance<any,PageResult<Article>>({
        url: '/admin/getTableArticleWithRecycle',
        method: 'POST',
        params:data
    })
}

export function getBlogFormById(data?:Object){
    return instance<any,BlogForm>({
        url: '/visitor/getBlogFormById',
        method: 'POST',
        data
    })
}

export function insertArticle(data?:Object){
    return instance<any,Article>({
        url: '/admin/insertArticle',
        method: 'POST',
        data
    })
}

export function updateArticle(data?:Object){
    return instance<any,Article>({
        url: '/admin/updateArticle',
        method: 'POST',
        data
    })
}

export function setArticleRecycle(data?:Object){
    return instance<any,string>({
        url: '/admin/setArticleRecycle',
        method: 'POST',
        data
    })
}

export function setArticleRecycleMore(data?:Object){
    return instance<any,string>({
        url: '/admin/setArticleRecycleMore',
        method: 'POST',
        data
    })
}

export function setArticleInHome(data?:Object){
    return instance<any,string>({
        url: '/admin/setArticleInHome',
        method: 'POST',
        data
    })
}

export function deleteArticleById(data?:Object){
    return instance<any,string>({
        url: '/admin/deleteArticleById',
        method: 'POST',
        data
    })
}

export function deleteArticleAll(){
    return instance<any,string>({
        url: '/admin/deleteArticleAll',
        method: 'POST'
    })
}

export function insertCategory(data?:Object){
    return instance<any,Category>({
        url: '/admin/insertCategory',
        method: 'POST',
        data
    })
}

export function insertLable(data?:Object){
    return instance<any,Category>({
        url: '/admin/insertLable',
        method: 'POST',
        data
    })
}

export function deleteCategory(data?:Object){
    return instance<any,string>({
        url: '/admin/deleteCategory',
        method: 'POST',
        data
    })
}

export function deleteLable(data?:Object){
    return instance<any,string>({
        url: '/admin/deleteLable',
        method: 'POST',
        data
    })
}

export function getCategoryAndLable(){
    return instance<any,Category[]>({
        url: '/visitor/getCategoryAndLable',
        method: 'GET'
    })
}

export function getVisitsByCategory(){
    return instance<any,BarData[]>({
        url: '/admin/getVisitsByCategory',
        method: 'GET'
    })
}