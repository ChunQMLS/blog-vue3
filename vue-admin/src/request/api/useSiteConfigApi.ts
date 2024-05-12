import instance from '@/request/index'
import { SiteConfig, UpdateRecord } from '@/types/siteConfig'

export function getSiteConfig(){
    return instance<any,SiteConfig>({
        url: '/visitor/getSiteConfig',
        method: 'GET'
    })
}

export function setCommentTip(data?:Object){
    return instance<any,SiteConfig>({
        url: '/admin/setCommentTip',
        method: 'POST',
        data
    })
}

export function setFriendLink(data?:Object){
    return instance<any,SiteConfig>({
        url: '/admin/setFriendLink',
        method: 'POST',
        data
    })
}

export function setAbout(data?:Object){
    return instance<any,SiteConfig>({
        url: '/admin/setAbout',
        method: 'POST',
        data
    })
}

export function setNotice(data?:Object){
    return instance<any,SiteConfig>({
        url: '/admin/setNotice',
        method: 'POST',
        data
    })
}

export function getUpdateRecords(){
    return instance<any,UpdateRecord[]>({
        url: '/visitor/getUpdateRecords',
        method: 'GET'
    })
}

export function insertUpdateRecord(data?:Object){
    return instance<any,UpdateRecord>({
        url: '/admin/insertUpdateRecord',
        method: 'POST',
        data
    })
}

export function deleteUpdateRecordById(data?:Object){
    return instance<any,string>({
        url: '/admin/deleteUpdateRecordById',
        method: 'POST',
        data
    })
}