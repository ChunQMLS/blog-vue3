import instance from '@/request/index'
import { FriendLink } from '@/types/friendLink'

export function insertFriendLink(data?:Object){
    return instance<any,FriendLink>({
        url: '/admin/insertFriendLink',
        method: 'POST',
        data
    })
}

export function deleteFriendLink(data?:Object){
    return instance<any,string>({
        url: '/admin/deleteFriendLink',
        method: 'POST',
        data
    })
}

export function getFriendLink(){
    return instance<any,FriendLink[]>({
        url: '/visitor/getFriendLink',
        method: 'GET'
    })
}