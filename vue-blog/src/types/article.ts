// 分类标签
export interface Lable {
    category: string,
    lable: string,
    articleNum: number
}

export interface Category extends Lable {
    lables: Lable[]
}

export interface ArticleDir {
    id: string,
    title: string,
    intro: string,
    image: string,
    category: string,
    lable: string,
    releasedate: string,
    updatedate: string,
    visits: number
}

export interface Article extends ArticleDir {
    content: string
}

// 文章分页
export interface Page {
    category: string,
    lable: string,
    currentPage: number,
    list: ArticleDir[],
    pageSize: number,
    size: number,
    total: number,
    start: string,
    end: string
}

export interface FullSearch {
    id: string,
    title: string,
    sentence: string
}