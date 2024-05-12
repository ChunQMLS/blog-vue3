import instance from '@/request/index'
import { Category } from '@/types/article'
import type { BlogDetail, CalendarTrends, MyInfo, RecommendArticle } from '@/types/home'

export function getCalendarTrends() {
    return instance<any,CalendarTrends[]>({
        url: '/visitor/getCalendarTrends',
        method: 'GET'
    })
}

export function getCategoryAndLable() {
    return instance<any,Category[]>({
        url: '/visitor/getCategoryAndLable',
        method: 'GET'
    })
}

export function getRecommendArticle() {
    return instance<any,RecommendArticle>({
        url: '/visitor/getRecommendArticle',
        method: 'GET'
    })
}

export function getMyInfo() {
    return instance<any,MyInfo>({
        url: '/visitor/getMyInfo',
        method: 'GET'
    })
}

export function getBlogInfo() {
    return instance<any,BlogDetail>({
        url: '/visitor/getBlogInfo',
        method: 'GET'
    })
}

export function visit() {
    return instance<any,BlogDetail>({
        url: '/visitor/visit',
        method: 'GET'
    })
}

export function getNotice() {
    return instance<any,string>({
        url: '/visitor/getNotice',
        method: 'GET'
    })
}