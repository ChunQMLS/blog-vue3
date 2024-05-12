import instance from '@/request/index'
import { Theme } from '@/types/theme'

export function getTheme(){
    return instance<any,Theme[]>({
        url: '/visitor/getTheme',
        method: 'GET'
    })
}

export function insertTheme(data?:Object){
    return instance<any,string>({
        url: '/admin/insertTheme',
        method: 'POST',
        data
    })
}

export function deleteTheme(data?:Object){
    return instance<any,string>({
        url: '/admin/deleteTheme',
        method: 'POST',
        data
    })
}

export function updateTheme(data?:Object){
    return instance<any,string>({
        url: '/admin/updateThemeStyle',
        method: 'POST',
        data
    })
}

export function updateThemeApply(data?:Object){
    return instance<any,string>({
        url: '/admin/updateThemeApply',
        method: 'POST',
        data
    })
}

export function cancelThemeApply(){
    return instance<any,string>({
        url: '/admin/cancelThemeApply',
        method: 'GET'
    })
}