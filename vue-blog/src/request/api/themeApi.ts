import instance from '@/request/index'

export function getTheme() {
    return instance<any,string>({
        url: '/visitor/getThemeApply',
        method: 'GET'
    })
}