<script setup lang="ts">
    import { getGallery, increaseGalleryRes, removeGalleryRes, updateGalleryRes } from '@/request/api/useGalleryApi'
    import { computed, nextTick, onBeforeMount, ref, toRaw, watch } from 'vue'
    import { useRoute,useRouter } from 'vue-router'
    import { UploadFilled } from '@element-plus/icons-vue'
    import { Picture as IconPicture,Delete } from '@element-plus/icons-vue'
    import Waterfall from '@/views/Gallery/Waterfall.vue'
    import { ElMessage, UploadInstance, UploadRequestOptions } from 'element-plus'
    import { client, deleteImage } from '@/utils/alioss'
    import { v4 } from 'uuid'
    import { Gallery, ImageInfo, UploadProgress, WaterfallData } from '@/types/gallery'
    import FileQueue from '@/utils/utils'
    import { ossBase } from '@/utils/alioss'

    const route = useRoute()
    const router = useRouter()
    const gallery = ref<Gallery>({
        id: '',
        title: '',
        total: 0,
        imageRes: []
    })

    const getGalleryFunc = () => {
        let id:string = route.query.id?.toString() || ''
        if (id != '') {
            getGallery({id}).then((res) => {
                gallery.value = res
            })
        }
    }

    const upload = ref<UploadInstance>()

    const uploadProgress = ref<UploadProgress[]>([])

    const isProgress = ref(false)

    watch(
        () => uploadProgress.value.length,
        () => {
            if (uploadProgress.value.length) {
                isProgress.value = true
            }else {
                isProgress.value = false
            }
        }
    )

    watch(
        uploadProgress,
        ()=>{
            if (uploadProgress.value.length && uploadProgress.value.every(item => item.percent === 100)) {
                uploadProgress.value = []
                ElMessage({
                    type: 'success',
                    message: '上传完成'
                })
            }
        }
    ,{deep: true})

    const uploadFunc =async (file:File) => {
        

        const localUrl = window.URL.createObjectURL(file)

        const suffix = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
        const UUID:string = v4()
        const fileName = `${UUID.split('-').join('')}` + suffix
        await client.multipartUpload('img/'+fileName, file,{
            progress:function (p:any) {
                const progressInfo = uploadProgress.value.find(item => item.filename === file.name)
                if (progressInfo) {
                    progressInfo.percent = Math.ceil(p*100)
                }
            },
            parallel: 4,
            partSize: 1024 * 1024,
        }).then((res:any) =>{
            console.log(res)
            if(res.res.statusCode == 200) {
                getImagePx(localUrl).then((info:any) => {
                    const imageInfo:ImageInfo = {
                        belong: gallery.value.id,
                        width: info.width,
                        height: info.height,
                        url: res.name
                    }
                    increaseGalleryRes(imageInfo).then(() => {
                        if (uploadProgress.value.length === 0) {
                            console.log('调用')
                            getGalleryFunc()
                        }
                    })
                })
            }
            upload.value!.clearFiles()
        })
    }

    const fileQueue = new FileQueue(uploadFunc)

    const handleUploadImage = async (options:UploadRequestOptions) => {
        const progressInfo = ref<UploadProgress>({filename:options.file.name,percent:0})
        uploadProgress.value.push(progressInfo.value)
        fileQueue.addFile(options.file)
    }

    const getImagePx = (url:string) => {
        const image = new Image()
        image.src = url
        return new Promise((resolve) => {
            image.onload = () => {
                const width = image.width
                const height = image.height
                resolve({width,height})
            }
        })
    }

    const deleteGalleryImage = (id:string,url:string) => {
        deleteImage(url).then((res:any) => {
            if (res.res.statusCode === 204) {
                removeGalleryRes({id}).then((res) => {
                    ElMessage({
                        type: 'success',
                        message: res
                    })
                    getGalleryFunc()
                })
            }
        })
    }

    const goBack = () => {
        router.push({name:'gallery'})
    }

    const waterfallData = computed<WaterfallData[]>(() => {
        return gallery.value.imageRes.map( (item,index) => {
            return {
                width: item.width,
                height: item.height,
                data: Object.assign({},{'id':item.id,'url':item.url,'index':index})
            }
        })
    })

    const srcList = computed<string[]>(() => {
        return gallery.value.imageRes.map( item => {
            return item.url
        })
    })

    // 元素拖拽
    let dragNode:DragEvent | null = null

    // 拖拽添加样式
    const  dragstart = (e:DragEvent) => {
        e.stopPropagation()
        setTimeout(() => {
            (<HTMLElement>e.target).classList.add('moving')
        },0)
        dragNode = e
        
        return false
    }    

    // 拖拽元素进入目标元素事件
    const dragenter = (e:DragEvent) => {
        e.stopPropagation()
        if (dragNode?.target === e.target) {
            return false
        }
        
        // 获取拖拽元素和目标元素在数组的位置
        const targetId = (<HTMLElement>e.target).attributes.getNamedItem('msg')?.value
        const dragNodeId = (<HTMLElement>dragNode?.target).attributes.getNamedItem('msg')?.value
        const targetIndex = gallery.value.imageRes.findIndex( item => item.id === targetId)
        const dragNodeIndex = gallery.value.imageRes.findIndex( item => item.id === dragNodeId)
        
        // 禁止元素向下排序
        if (dragNodeIndex < targetIndex ) {
            ElMessage.error('只能将图片向上排序.')
            return false
        }
        
        // 修改原始数据并重新渲染
        const dragTarget = gallery.value?.imageRes.splice(dragNodeIndex,1)
        gallery.value?.imageRes.splice(targetIndex,0,...dragTarget)
        dragNode = e
        nextTick(()=>{
            setTimeout(() => {
                (<HTMLElement>dragNode?.target).classList.add('moving')
            },0)
        })
    }

    // 元素默认阻止其他元素进入，需要元素进入目标元素时阻止事件默认行为
    const dragover = (e:DragEvent) => {
        e.preventDefault()
    }

    // 在拖拽结束时清除透明样式
    const dragend = () => {
        (<HTMLElement>dragNode?.target).classList.remove('moving')
    }

    const updateOrder = () => {
        const newGallery = toRaw(gallery.value)
        newGallery.imageRes.forEach((item,index) => {
            item.orders = index
        })
        updateGalleryRes(newGallery).then((res)=> {
            ElMessage({
                type: 'success',
                message: res
            })
            getGalleryFunc()
        })
    }

    onBeforeMount(() => {
        getGalleryFunc()
    })

</script>

<template>
    <div class="container-box">
        <div class="container box">
            <el-page-header @back="goBack">
                <template #content>
                    <span class="text-large font-600 mr-3"> 图册编辑 </span>
                </template>
            </el-page-header>
            <div class="box-margin">
                <el-upload
                    ref="upload"
                    drag
                    :show-file-list="false"
                    action=""
                    :http-request="handleUploadImage"
                    accept="image/*"
                    multiple
                >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件或 <em>点击此处上传</em>
                    </div>
                </el-upload>
                <el-divider />
                <div class="Waterfall">
                    <div class="Waterfall-header">
                        <div>图片预览</div>
                        <el-button type="success" @click="updateOrder">保存排序</el-button>
                    </div>
                    <Waterfall :data="waterfallData" :item-width="250">
                        <template #waterfill="scope">
                            <div class="image-item"
                                v-for="(item, index) in scope.data" :key="index"
                                :style="{margin: `${scope.gap}px`,'line-height': '0'}"
                                >
                                <el-image fit="fill" :src="ossBase + item.data.url" :msg="item.data.id" :style="{'width': item.width + 'px','height': item.height + 'px'}"
                                    :preview-src-list="srcList"
                                    :initial-index="item.data.index"
                                    draggable="true"
                                    @dragstart="dragstart($event)"
                                    @dragenter="dragenter($event)"
                                    @dragend="dragend"
                                    @dragover="dragover">
                                    <template #error>
                                        <div class="image-slot">
                                            <el-icon><icon-picture /></el-icon>
                                        </div>
                                    </template>
                                </el-image>
                                <div class="icon-bar" @click="deleteGalleryImage(item.data.id,item.data.url)">
                                    <el-icon><Delete /></el-icon>
                                </div>
                            </div>
                        </template>
                    </Waterfall>
                </div>
            </div>
        </div>
    </div>
    <el-drawer v-model="isProgress" title="上传队列" size="40%">
        <div class="progress-container" v-for="(item, index) in uploadProgress" :key="index">
            <el-text class="progress-name" truncated>
                {{ item.filename }}
            </el-text>
            <el-progress class="progress-line" :stroke-width="8" :percentage="item.percent" :status="item.percent === 100 ? 'success':'' " />
        </div>
    </el-drawer>
</template>

<style scoped>
.box {
    margin: 20px 0px;
    padding: 10px;
}
.box-margin {
    margin: 20px;
}
.box-margin >* {
    margin-bottom: 20px;
}
.Waterfall {
    min-height: 300px;
}
.Waterfall-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.image-item {
    position: relative;
}
.image-item.moving {
    opacity: 0;
    /* border: 1px dashed #ccc; */
}
.image-slot .el-icon {
  font-size: 30px;
}
.progress-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0px;
}
.progress-name {
    flex: 0.3 0 0;
}
.progress-line {
    flex: 0.7 0 0;
}
.icon-bar {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    color: #fff;
    background: #606266;
    cursor: pointer;
}
.image-item:hover .icon-bar{
    display: block;
}
</style>

<style>
.el-image__inner.moving {
    opacity: 0;
}
</style>