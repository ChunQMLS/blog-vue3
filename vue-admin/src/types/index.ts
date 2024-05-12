// 返回体
export interface Token {
    token: string,
    refreshToken: string
}


// 菜单目录
export type Menu = {
    title: string,
    path: string,
    children?: Menu[]
}

export type MenuConfig = {
    websiteName: string,
    menu: Menu[]
}


// 分页
export interface Page {
    currentPage: number,
    pageSize: number,
    search?: string
}









