<script setup lang="ts">
    import { deleteUpdateRecordById, getSiteConfig, getUpdateRecords, insertUpdateRecord, setAbout, setCommentTip, setNotice } from '@/request/api/useSiteConfigApi'
    import { SiteConfig, UpdateRecord } from '@/types/siteConfig'
    import Editor from '@/components/Editor/Editor.vue'
    import { onBeforeMount, ref } from 'vue'
    import { ElMessage } from 'element-plus'

    defineOptions({
        name: 'BasicSettings'
    })

    const updateRecords = ref<UpdateRecord[]>([])

    const updateRecord = ref<UpdateRecord>({})

    const dialogVisible = ref(false)

    const siteConfig = ref<SiteConfig>({})

    const handleSiteConfigGet = () => {
        getSiteConfig().then( res => {
            siteConfig.value = res
        })
    }

    const handleUpdateRecords = () => {
        getUpdateRecords().then( res => {
            updateRecords.value = res
        })
    }

    const handleCommentTipSave = () => {
        setCommentTip(siteConfig.value).then(res => {
            siteConfig.value.commentTip = res.commentTip
            ElMessage({
                type: 'success',
                message: '保存成功'
            })
        })
    }

    const handleNoticeSave = () => {
        setNotice(siteConfig.value).then(res => {
            siteConfig.value.notice = res.notice
            ElMessage({
                type: 'success',
                message: '保存成功'
            })
        })
    }

    const handleAboutSave = () => {
        setAbout(siteConfig.value).then( res => {
            siteConfig.value.about = res.about
            ElMessage({
                type: 'success',
                message: '保存成功'
            })
        })
    }

    const handleAdd = () => {
        insertUpdateRecord(updateRecord.value).then( res => {
            updateRecords.value.unshift(res)
            dialogVisible.value = false
            updateRecord.value.content = '' 
        })
    }

    const handleDelete = (index:number,row:UpdateRecord) => {
        deleteUpdateRecordById(row).then( () => {
            updateRecords.value.splice(index,1)
        })
    }

    onBeforeMount(()=>{
        handleSiteConfigGet()
        handleUpdateRecords()
    })

</script>

<template>
    <div class="container-box">
        <div class="flex-box">
            <div class="comment-tip container inline-box" :style="{marginRight: '20px'}">
                <div class="container-header container-title">
                    <div>评论提示</div>
                    <el-button type="primary" @click="handleCommentTipSave">保存</el-button>
                </div>
                <div class="editor">
                    <el-input
                        v-model="siteConfig.commentTip"
                        style="width: 100%"
                        :rows="10"
                        :autosize="{ minRows: 10 , maxRows: 10 }"
                        type="textarea"
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="update-records container inline-box" :style="{marginLeft: '20px'}">
                <div class="container-header container-title">
                    <div>更新记录</div>
                    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
                </div>
                <div class="records">
                    <el-table :data="updateRecords" style="width: 100%" :height="200" :max-height="200" >
                        <el-table-column prop="releasedate" label="Date" width="130" />
                        <el-table-column prop="content" label="Content" width="250" :show-overflow-tooltip="true" />
                        <el-table-column label="Operations" width="110">
                            <template #default="scope">
                                <el-button
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.$index,scope.row)"
                                >删除</el-button
                                >
                            </template>
                            </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="message container box">
            <div class="container-header container-title">
                <div>公告</div>
                <el-button type="primary" @click="handleNoticeSave">保存</el-button>
            </div>
            <div class="editor">
                <el-input
                    v-model="siteConfig.notice"
                    style="width: 100%"
                    :rows="10"
                    :autosize="{ minRows: 10 , maxRows: 10 }"
                    type="textarea"
                    placeholder="请输入"
                />
            </div>
        </div>
        <div class="message container box">
            <div class="container-title">
                <span>关于</span>
            </div>
            <div class="editor">
                <Editor v-model="siteConfig.about" @onSave="handleAboutSave" />
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="添加更新记录" width="800">
        <el-input
            v-model="updateRecord.content"
            style="width: 100%"
            :rows="10"
            :autosize="{ minRows: 10 , maxRows: 10 }"
            type="textarea"
            placeholder="请输入"
        />
        <el-button type="primary" @click="handleAdd" >添加</el-button>
    </el-dialog>
</template>

<style scoped>
.box {
    margin: 30px 0px;
    padding: 30px;
}
.inline-box {
    padding: 30px;
    flex: 1 0 0;
}
.flex-box {
    display: flex;
    margin: 30px 0px;
}
.container-header {
    display: flex;
    justify-content: space-between;
}
.container-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
}
</style>