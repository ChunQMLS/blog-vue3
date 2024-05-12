import instance from '@/request/index'
import { Gallery } from '@/types/gallery'

export function getGalleryList(params?:Object) {
    return instance<any,Gallery[]>({
        url: '/visitor/getGalleryList',
        method: 'GET',
        params
    })
}

export function getGallery(data?:Object) {
    return instance<any,Gallery>({
        url: '/visitor/getGallery',
        method: 'POST',
        data
    })
}