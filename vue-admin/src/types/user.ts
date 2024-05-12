// 我的信息
export interface MyInfo {
    id?: string,
    username?:string,
    password?:string,
    avatar?: string,
    nickname?: string,
    dictum?: string,
    github?: string,
    email?: string,
    bilbil?: string
}

export interface LoginInfo {
    username: string,
    password: string
}