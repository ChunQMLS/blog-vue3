// 评论
export interface UpdateComment {
    reply: string,
    belong: string,
    avatar: string,
    nickname: string,
    email: string,
    website: string,
    content: string,
    local:string
}

export interface Comment extends UpdateComment {
    id: string,
    releasedate: string,
    isreply: number,
    rnick?: string
}

export type CommentType  = 'all' | 'noreply'