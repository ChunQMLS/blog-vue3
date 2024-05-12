import instance from '@/request/index'
import { BlogEvent } from '@/types/about'

export function getUpdateRecords() {
    return instance<any,BlogEvent[]>({
        url: '/visitor/getUpdateRecords',
        method: 'GET'
    })
}

export function getAbout() {
    return instance<any,string>({
        url: '/visitor/getAbout',
        method: 'GET'
    })
}