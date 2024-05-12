import instance from '@/request/index'
import { Gallery } from '@/types/gallery'

export function createGallery(data?:Object){
    return instance<any,Gallery>({
        url: '/admin/createGallery',
        method: 'POST',
        data
    })
}

export function deleteGallery(data?:Object){
    return instance<any,string>({
        url: '/admin/deleteGallery',
        method: 'POST',
        data
    })
}

export function getGalleryList(){
    return instance<any,Gallery[]>({
        url: '/visitor/getGalleryList',
        method: 'GET'
    })
}

export function increaseGalleryRes(data?:Object){
    return instance<any,string>({
        url: '/admin/increaseGalleryRes',
        method: 'POST',
        data
    })
}

export function updateGalleryRes(data?:Object){
    return instance<any,string>({
        url: '/admin/updateGalleryRes',
        method: 'POST',
        data
    })
}

export function removeGalleryRes(data?:Object){
    return instance<any,string>({
        url: '/admin/removeGalleryRes',
        method: 'POST',
        data
    })
}

export function getGallery(data?:Object){
    return instance<any,Gallery>({
        url: '/visitor/getGallery',
        method: 'POST',
        data
    })
}