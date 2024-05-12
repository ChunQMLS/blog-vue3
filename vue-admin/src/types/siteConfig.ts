// 网站基本配置
export interface SiteConfig {
    commentTip?: string,
    friendLink?: string,
    about?: string,
    notice?: string
}

export interface UpdateRecord {
    id?: string,
    releasedate?: string,
    content?: string
}