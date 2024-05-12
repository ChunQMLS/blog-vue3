import { getBlogInfo, getCategoryAndLable, getMyInfo } from '@/request/api/homeApi'
import { getTheme } from '@/request/api/themeApi'
import { Critic } from '@/types'
import { Category, Lable } from '@/types/article'
import { BlogDetail, MyInfo } from '@/types/home'
import { defineStore } from 'pinia'

export const useBlogInfoStore = defineStore('blogInfo', {
    state: () => ({
        blogInfo: {} as BlogDetail
    }),
    actions: {
        getBlogInfoHandler() {
            getBlogInfo().then( res => {
                this.blogInfo = res
            })
        }
    }
})

export const useMyInfoStore = defineStore('myInfo', {
    state: () => ({
        myInfo: {} as MyInfo
    }),
    actions: {
        getMyInfoHandler() {
            getMyInfo().then( res => {
                this.myInfo = res
            })
        }
    }
})

export const useCriticStore = defineStore('critic', {
    state: () => ({
        critic: {
            avatar: localStorage.getItem('criticAvatar') || '',
            nickname: localStorage.getItem('criticNickname') || '',
            email: localStorage.getItem('criticEmail') || '',
            website: localStorage.getItem('criticWebsite') || '',
        } as Critic
    }),
    getters:{
        Qnumber(state) {
            if (state.critic.email.includes('@qq.com')) {
                console.log(state.critic.email.split('@qq.com'))
                return state.critic.email.split('@')[0]
            }else {
                return ''
            }
        },
        emailCheck(state) {
            const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            return reg.test(state.critic.email)
        }
    },
    actions: {
        localSave() {
            localStorage.setItem('criticAvatar',this.critic.avatar)
            localStorage.setItem('criticNickname',this.critic.nickname)
            localStorage.setItem('criticEmail',this.critic.email)
            localStorage.setItem('criticWebsite',this.critic.website)
        }
    }
})

export const useCategoryStore = defineStore('category', {
    state: () => ({
        category: [] as Category[]
    }),
    getters: {
        lables(state) {
            const list = state.category.reduce( (pre:Lable[],cur) => {
                return pre.concat(cur.lables)
            },[])
            return list
        },
        articleTotal(state) {
            let total = 0
            state.category.forEach( item => total += item.articleNum)
            return total
        }
    },
    actions: {
        getCategory() {
            if (this.category.length === 0) {
                getCategoryAndLable().then( res => {
                    this.category = res
                })
            }
        }
    }
})

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: localStorage.getItem('theme') || 'light',
        style: JSON.parse('{}')
    }),
    actions: {
        init(){
            getTheme().then( res => {
                if (res && res.length > 0) {
                    this.style = JSON.parse(res)
                    this.render()
                }
            })
            document.querySelector('html')?.setAttribute('data-theme',this.theme)
            document.querySelector('html')?.setAttribute('class',this.theme)
        },
        render() {
            const root = document.querySelector<HTMLElement>(':root')
            for(const key in this.style) {
                if (key == '--body-background-image') {
                    root?.style.setProperty(key,`url(${this.style[key]})`)
                    continue
                }
                root?.style.setProperty(key,this.style[key])
            }
        },
        changeTheme() {
            if (this.theme === 'light') {
                this.theme = 'dark'
            }else {
                this.theme = 'light'
            }
            document.querySelector('html')?.setAttribute('data-theme',this.theme)
            document.querySelector('html')?.setAttribute('class',this.theme)
            this.persist()
        },
        persist() {
            localStorage.setItem('theme',this.theme)
        }
    }
})