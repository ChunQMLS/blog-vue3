// 文章
export type ArticleType = 'all' | 'recycle'

export interface Lable {
    category?: string,
    lable?: string,
    articleNum?: number
}

export interface Category extends Lable{
    lables?: Lable[]
}

export interface BarData {
    category: string,
    visits: number
}

export interface Article extends Category {
    id?: string,
    title?: string,
    intro?: string,
    image?: string,
    content?: string,
    releasedate?: string,
    updatedate?: string,
    recycle?: number,
    inhome?: number,
    visits?: number
}

export interface PageResult<T> {
    size: number,
    total: number,
    currentPage: number,
    pageSize: number,
    list: T[]
}

export interface RecommendOption {
    key?: string,
    label?: string
}

export interface BlogForm {
    id: string,
    title: string,
    category: string,
    lable: string,
    image: string,
    intro: string,
    content: string
}