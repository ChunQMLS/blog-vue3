
import { defineStore } from 'pinia'
import { getMyInfo, setMyInfo } from '@/request/api/useUserApi'
import { deleteImage } from '@/utils/alioss'
import { MyInfo } from '@/types/user'

export const useUserStore = defineStore('user',{
    state: () => {
        return {
            myInfo: {} as MyInfo
        }
    },
    actions: {
        getMyInfoHandler(){
            getMyInfo().then( res => {
                this.myInfo = res
            })
        },
        setMyInfoHandler(myInfo:MyInfo,name:string){
            myInfo.avatar = myInfo.avatar?.split('/').reverse()[0]
            setMyInfo(myInfo).then( res => {
                deleteImage(name)
                this.myInfo = res
            })
        }
    }
})