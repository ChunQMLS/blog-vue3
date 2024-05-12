import instance from '@/request/index'
import { Article, FullSearch, Page } from '@/types/article'

export function getDirArticle(params?:Object) {
    return instance<any,Page>({
        url: '/visitor/getDirArticle',
        method: 'GET',
        params
    })
}

export function getArticleById(data?:Object) {
    return instance<any,Article>({
        url: '/visitor/getArticleById',
        method: 'POST',
        data
    })
}

export function articleVisit(data?:Object) {
    return instance<any,Article>({
        url: '/visitor/articleVisit',
        method: 'POST',
        data
    })
}

export function fullSearch(data?:Object) {
    return instance<any,FullSearch[]>({
        url: '/visitor/fullSearch',
        method: 'POST',
        data
    })
}
