// 日历动态

import { ArticleDir } from "./article"

export interface CalendarTrends {
    date: string,
    count: number
}

export interface CalendarMonth {
    month:number,
    days:number
}

export interface CalendarDay {
    date: string,
    week: number,
    count?: number
}

export interface CalendarWeek {
    week: string,
    weekCode: number,
    days: Array<CalendarDay>
}

// 首页推荐和热门
export interface RecommendArticle {
    hot: ArticleDir[],
    recommend: ArticleDir[]
}

// 我的信息
export interface MyInfo {
    id: string,
    nickname: string,
    avatar: string,
    dictum: string,
    email: string,
    github: string,
    bilbil: string
}

// 博客详细信息
export interface BlogDetail {
    createTime: string,
    visits: number,
    pv: number
    wordNum: number,
    articleNum: number,
    commentNum: number,
    lastUpdateTime: string
}