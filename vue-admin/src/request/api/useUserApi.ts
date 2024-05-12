import instance from '@/request/index'
import { Token } from '@/types'
import { MyInfo } from '@/types/user'

export function login(data?:Object){
    return instance<any,Token>({
        url: '/visitor/login',
        method: 'POST',
        data
    })
}

export function getMyInfoInHome(){
    return instance({
        url: '/visitor/getMyInfo',
        method: 'GET'
    })
}

export function getMyInfo(){
    return instance<any,MyInfo>({
        url: '/admin/getMyInfo',
        method: 'POST'
    })
}

export function verifyAccount(data?:Object){
    return instance({
        url: '/admin/verifyAccount',
        method: 'POST',
        data
    })
}

export function setMyInfo(data?:Object){
    return instance<any,MyInfo>({
        url: '/admin/setMyInfo',
        method: 'POST',
        data
    })
}

export function resetPassword(data?:Object){
    return instance<any,MyInfo>({
        url: '/admin/resetPassword',
        method: 'POST',
        data
    })
}