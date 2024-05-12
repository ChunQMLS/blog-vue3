<script setup lang="ts">
    import { reactive,ref,toRaw,watch,onUnmounted } from 'vue'
    import { uploadImage,deleteImage } from '@/utils/alioss'
    import { UploadRequestOptions,ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import { useUserStore } from '@/stores/useUserStore'
    import { MyInfo } from '@/types/user'
    import { ossBase } from '@/utils/alioss'

    const store = useUserStore()

    let oldAvatar = ref('')

    const myInfoPreview = reactive<MyInfo>({})

    let isEditor = ref(false)

    const uploadImageHandler = async (options:UploadRequestOptions)=>{

        uploadImage(options).then( (res:any) =>{
            
            if(res.res.status == 200) {
                oldAvatar.value = myInfoPreview.avatar || ''
                myInfoPreview.avatar = res.name
            }
        }).catch(() => {
            ElMessage.error('图片上传失败')
        })
    }

    const uploadMyInfoHandler = () => {
        store.setMyInfoHandler(myInfoPreview,oldAvatar.value)
        isEditor.value = !isEditor.value
    }

    const cancelHandler = () => {
        deleteImage(myInfoPreview.avatar || '')
        Object.assign(myInfoPreview,toRaw(store.myInfo))
        isEditor.value = !isEditor.value
    }

    watch(
        () => store.myInfo,
        () => {
            Object.assign(myInfoPreview,toRaw(store.myInfo))
        },
        {immediate: true}
    )

    onUnmounted(()=>{
        if (oldAvatar.value.length && myInfoPreview.avatar?.length) {
            deleteImage(myInfoPreview.avatar)
        }
    })

</script>

<template>
    <div class="box">
        <div class="container myinfo">
            <div class="myinfo-item myinfo-avatar">
                <el-upload
                    class="upload-box"
                    :disabled="!isEditor"
                    action=""
                    :http-request="uploadImageHandler"
                    :show-file-list="false"
                    accept="image/*"
                >
                    <div class="res-container">
                        <el-avatar v-if="myInfoPreview.avatar" :size="100" :src="ossBase + myInfoPreview.avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </div>
                </el-upload>
                
            </div>
            <div class="myinfo-item">
                <span>昵称: </span>
                <span>{{ myInfoPreview.nickname }}</span>
            </div>
            <div class="myinfo-item">
                <span>格言: </span>
                <el-input v-model="myInfoPreview.dictum" :disabled="!isEditor" style="width: 300px" placeholder="Please input" />
            </div>
            <div class="myinfo-item">
                <span>email: </span>
                <el-input v-model="myInfoPreview.email" :disabled="!isEditor" style="width: 300px" placeholder="Please input" />
            </div>
            <div class="myinfo-item">
                <span>github: </span>
                <el-input v-model="myInfoPreview.github" :disabled="!isEditor" style="width: 300px" placeholder="Please input" />
            </div>
            <div class="myinfo-item">
                <span>bilbil: </span>
                <el-input v-model="myInfoPreview.bilbil" :disabled="!isEditor" style="width: 300px" placeholder="Please input" />
            </div>
            <div class="myinfo-button">
                <el-button type="primary" v-show="!isEditor" @click="isEditor = !isEditor">编辑</el-button>
                <el-button type="danger" v-show="isEditor" @click="cancelHandler">取消</el-button>
                <el-button type="success" v-show="isEditor" @click="uploadMyInfoHandler()">保存</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
.myinfo {
    min-width: 400px;
    padding: 30px;
}
.myinfo>* {
    margin-bottom: 20px;
}
.myinfo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.myinfo-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
}
.upload-box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: var(--boxshadow-secondary-color);
}
.res-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
}
.myinfo-button {
    display: flex;
    justify-content: center;
}
.myinfo-button>button {
    margin: 0 10px;
}
</style>