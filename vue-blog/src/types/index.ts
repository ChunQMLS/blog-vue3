// 用户
export interface User {
    avatar: string,
    nickname: string,
    email: string,
}

export interface Critic extends User {
    website: string
}

// 评论
export interface UpLoadComment extends Critic {
    content: string,
    reply: string,
    belong: string,
    local: string
}

export interface Comment extends UpLoadComment{
    id: string,
    rnick: string,
    releasedate: string,
    master: boolean,
    children: Comment[]
}

// export interface Theme {
//     '--body-background-image': string,
// }