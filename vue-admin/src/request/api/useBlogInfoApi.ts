import instance from '@/request/index'
import { BlogInfo } from '@/types/blogInfo'

export function getBlogInfo(){
    return instance<any,BlogInfo>({
        url: '/visitor/getBlogInfo',
        method: 'GET'
    })
}