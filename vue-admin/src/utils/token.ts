import { Token } from '@/types'

export function setToken(data:Token){
    localStorage.setItem('token',data.token)
    localStorage.setItem('refreshToken',data.token)
}

export function getToken():Token {
    return {
        token: localStorage.getItem('token') || '',
        refreshToken: localStorage.getItem('refreshToken') || ''
    }
}

export function removeToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
}

export function isExistToken():boolean {
    if (localStorage.getItem('token') && localStorage.getItem('refreshToken')) {
        return true
    } else {
        return false
    }
}