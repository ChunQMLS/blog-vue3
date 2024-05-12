import instance from '@/request/index'
import { FriendLink } from '@/types/friendLink'

export function getFriendLink() {
    return instance<any,FriendLink[]>({
        url: '/visitor/getFriendLink',
        method: 'GET'
    })
}

export function getFriendLinkTip() {
    return instance<any,string>({
        url: '/visitor/getFriendLinkTip',
        method: 'GET'
    })
}