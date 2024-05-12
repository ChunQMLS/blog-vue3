<script setup lang="ts">
    import { computed, watch, ref } from 'vue'
    import { useBlogStore } from '@/stores/useBlogStore'
    import { deleteImage, uploadImage } from '@/utils/alioss'
    import { ElMessage, UploadRequestOptions } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import Editor from '@/components/Editor/Editor.vue'
    import { insertArticle,getBlogFormById, updateArticle } from '@/request/api/useArticleApi'
    import { useBlog } from '@/hooks/blog'
    import { BlogForm, Lable } from '@/types/article'
    import { ossBase } from '@/utils/alioss'

    const dialogVisible = defineModel<boolean>('visible')

    const blogId = defineModel<string>('id',{default:''})

    const form = ref<BlogForm>({
        id: '',
        title: '',
        category: '',
        lable: '',
        image: '',
        intro: '',
        content: ''
    })

    const init = () => {
        form.value = {
            id: '',
            title: '',
            category: '',
            lable: '',
            image: '',
            intro: '',
            content: ''
        }
    }

    const store = useBlogStore()

    const { getArticles } = useBlog()

    const lables = computed<Lable[]>(() => {
        if(store.categoryLables.length === 0){
            return []
        }else {
            return store.categoryLables.find( item => item.category == form.value.category)?.lables || []
        }
    })

    const isUploadImage = ref(false)

    const uploadImageHandler = async (options:UploadRequestOptions)=>{

        if (form.value.image) {
            deleteImage(form.value.image)
        }
        uploadImage(options).then( (res:any) =>{
            if(res.res.status === 200) {
                form.value.image = res.name
                isUploadImage.value = true
            }else {
                ElMessage.error('图片上传失败')
            }
        })
    }

    const onSubmit = () => {
        if (form.value.id) {
            updateArticle(form.value).then(() => {
                isUploadImage.value = false
                getArticles()
                ElMessage({
                    message: '保存成功',
                    type: 'success'
                })
            })
        }else {
            insertArticle(form.value).then(() => {
                isUploadImage.value = false
                getArticles()
                ElMessage({
                    message: '保存成功',
                    type: 'success'
                })
            })
        }
    }

    const onClose = (done: () => void) => {
        if (isUploadImage.value) {
            deleteImage(form.value.image)
            isUploadImage.value = false
        }
        init()
        blogId.value = ''
        done()
    }

    watch(
        blogId,
        (newVal) => {
            if (newVal !== '') {
                getBlogFormById({id: newVal}).then(res => {
                    console.log(res)
                    form.value = res
                })
            }
        },
        {immediate: true}
    )
    
</script>

<template>
    <el-dialog
        v-model="dialogVisible"
        title="分类/标签"
        width="1200"
        destroy-on-close
        :before-close="onClose"
    >
        <el-form :model="form" label-width="auto">
            <el-form-item label="标题">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="form.category" placeholder="选择分类">
                    <el-option v-for="(item, index) in store.categoryLables" :key="index" :label="item.category" :value="item.category || ''" />
                </el-select>
            </el-form-item>
            <el-form-item label="标签">
                <el-select :disabled="form.category === ''" v-model="form.lable" placeholder="选择标签">
                    <el-option v-for="(item, index) in lables" :key="index" :label="item.lable" :value="item.lable || ''" />
                </el-select>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :http-request="uploadImageHandler"
                    :show-file-list="false"
                >
                    <el-image v-if="form.image" :src="ossBase + form.image" class="avatar" style="width: 400px;" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="简介">
                <el-input
                    v-model="form.intro"
                    :rows="4"
                    type="textarea"
                    placeholder="简介"
                />
            </el-form-item>
            <el-form-item label="内容">
                <Editor v-model="form.content"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped>
</style>