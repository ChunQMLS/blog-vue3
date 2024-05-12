<script setup lang="ts">
    import { onBeforeMount, ref } from 'vue'
    import { createGallery, deleteGallery, getGallery, getGalleryList } from '@/request/api/useGalleryApi'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { useRouter } from 'vue-router'
    import { deleteImage } from '@/utils/alioss'
    import { Gallery } from '@/types/gallery'

    const router = useRouter()

    const galleryList = ref<Gallery[]>()

    const getGallerys = () => {
        getGalleryList().then((res) => {
            galleryList.value = res
        })
    }

    const editorRow = (row:Gallery) => {
        router.push({name: 'galleryEditor', query: { id: row.id }})
    }

    const deleteRow = (row:Gallery) => {
        getGallery({id:row.id}).then( res => {
            if (res.imageRes.length) {
                res.imageRes.forEach( item => {
                    deleteImage(item.url)
                })
            }
        }).finally(() => {
            deleteGallery(row).then(() => {
                getGallerys()
                ElMessage({
                    type: 'success',
                    message: '删除成功'
                })
            })
        })
    }

    const onAddGallery = () => {
        ElMessageBox.prompt(
            '图库标题',
            '创建图库',
            {
                confirmButtonText: '创建',
                cancelButtonText: '取消'
            }
        ).then(({value}) => {
            createGallery({title:value}).then((res) => {
                console.log(res)
                router.push({name: 'galleryEditor', query: { id: res.id }})
            })
        })
    }

    onBeforeMount(() => {
        getGallerys()
    })

</script>

<template>
    <div class="container-box">
        <div class="container box">
            <el-table :data="galleryList" style="width: calc(100% -10px);margin-bottom: 20px;" height="550" max-height="550">
                <el-table-column fixed  prop="title" label="图库名" width="300" />
                <el-table-column align="center" prop="total" label="图片数" width="300"/>
                <el-table-column align="right" fixed="right" label="操作">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="small"
                            @click.prevent="editorRow(scope.row)"
                            >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            @click.prevent="deleteRow(scope.row)"
                            >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="mt-4" type="primary" style="width: 100%" @click="onAddGallery"
                >创建</el-button
            >
        </div>
    </div>
</template>

<style scoped>
.box {
    margin: 20px 0px;
    padding: 10px;
}
</style>