<script setup lang="ts">
import { insertTheme, updateTheme } from '@/request/api/useThemeApi'
import { Field, Theme } from '@/types/theme'
import { deleteImage, uploadImage } from '@/utils/alioss'
import { ElMessage, UploadRequestOptions } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { computed, onBeforeUnmount, ref } from 'vue'

const isEditor = defineModel<Boolean>()

const props = defineProps<{theme:Theme}>()

const dialog = ref(true)

const theme = ref<Theme>(JSON.parse(JSON.stringify(props.theme)))

const style = computed<Field>(() => {
    return JSON.parse(theme.value.style)
})
const onSubmit = () => {
    theme.value.style = JSON.stringify(style.value)
    if (theme.value.id.length) {
        updateTheme(theme.value).then(() => {
            ElMessage({
                type: 'success',
                message: '提交成功'
            })
        })
    }else {
        insertTheme(theme.value).then(() => {
            ElMessage({
                type: 'success',
                message: '提交成功'
            })
        })
    }
}

const isUploadImage = ref(false)

const uploadImageHandler = async (options:UploadRequestOptions)=>{

    uploadImage(options).then( (res:any) =>{
        if(res.res.status === 200) {
            style.value['--body-background-image'] = res.url
            isUploadImage.value = true
        }else {
            ElMessage.error('图片上传失败')
        }
    })
}

const onClose = (done: () => void) => {
    done()
    isEditor.value = false
}

onBeforeUnmount(() => {
    if (isUploadImage.value) {
        deleteImage(style.value['--body-background-image'])
    }
})

</script>

<template>
    <el-dialog title="主题编辑" width="600"
        v-model="dialog"
        destroy-on-close
        :before-close="onClose">
        <el-form
            label-width="auto"
            :model="theme"
            style="max-width: 600px"
        >
            <el-form-item label="主题名">
                <el-input
                    v-model="theme.name"
                    style="width: 240px"
                    clearable
                />
            </el-form-item>
            <el-form-item label="背景图">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :http-request="uploadImageHandler"
                    :show-file-list="false"
                >
                    <el-image v-if="style['--body-background-image']" :src="style['--body-background-image']" class="avatar" style="width: 200px;" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="主题色">
                <el-color-picker v-model="style['--theme-main-color']" show-alpha />
            </el-form-item>
            <el-form-item label="副主题色">
                <el-color-picker v-model="style['--theme-second-color']" show-alpha />
            </el-form-item>
            <el-form-item label="主字体色">
                <el-color-picker v-model="style['--word-main-color']" show-alpha />
            </el-form-item>
            <el-form-item label="副字体色">
                <el-color-picker v-model="style['--word-second-color']" show-alpha />
            </el-form-item>
            <el-form-item label="第三字体色">
                <el-color-picker v-model="style['--word-third-color']" show-alpha />
            </el-form-item>
            <el-form-item label="标题字体色">
                <el-color-picker v-model="style['--word-title-color']" show-alpha />
            </el-form-item>
            <el-form-item label="边框色">
                <el-color-picker v-model="style['--border-main-color']" show-alpha />
            </el-form-item>
            <el-form-item label="主按钮色">
                <el-color-picker v-model="style['--button-main-color']" show-alpha />
            </el-form-item>
            <el-form-item label="副按钮色">
                <el-color-picker v-model="style['--button-second-color']" show-alpha />
            </el-form-item>
            <el-form-item label="主填充色">
                <el-color-picker v-model="style['--fill-main-color']" show-alpha />
            </el-form-item>
            <el-form-item label="副填充色">
                <el-color-picker v-model="style['--fill-second-color']" show-alpha />
            </el-form-item>
            <el-form-item label="滚动条色">
                <el-color-picker v-model="style['--scroll-main-color']" show-alpha />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped>
</style>