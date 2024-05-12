<script setup lang="ts">
import Editor from '@/components/Editor/Editor.vue'
import { deleteFriendLink, getFriendLink, insertFriendLink } from '@/request/api/useFriendLinkApi'
import { getSiteConfig, setFriendLink } from '@/request/api/useSiteConfigApi'
import { FriendLink } from '@/types/friendLink'
import { SiteConfig } from '@/types/siteConfig'
import { ElMessage } from 'element-plus'
import { onBeforeMount, ref, watchEffect } from 'vue'


const activeName = ref('first')

const friendLinks = ref<FriendLink[]>()

const initFriendLink = () => {
    getFriendLink().then( res => {
        friendLinks.value = res
    })
}

const deleteRow = (row:FriendLink) => {
    deleteFriendLink(row).then(() => {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        initFriendLink()
    })
}

const dialogFormVisible = ref(false)

const onAddItem = () => {
    dialogFormVisible.value = true
}

const newFriendLink = ref({
    name: '',
    link: '',
    avatar: '',
    descr: ''
})

const onFriendLinkSubmit = () => {
    insertFriendLink(newFriendLink.value).then((res) => {
        ElMessage({
            type: 'success',
            message: '添加成功'
        })
        friendLinks.value?.push(res)
        dialogFormVisible.value = false
    })
}

watchEffect(() => {
    if (!dialogFormVisible.value) {
        newFriendLink.value = {
            name: '',
            link: '',
            avatar: '',
            descr: ''
        }
    }
})

const siteConfig = ref<SiteConfig>({
    friendLink: ''
})

const onSiteConfigSubmit = () => {
    setFriendLink(siteConfig.value).then( (res) => {
        siteConfig.value = res
        ElMessage({
            type: 'success',
            message: '保存成功'
        })
    })
}

onBeforeMount(() => {
    initFriendLink()
    getSiteConfig().then( res => {
        siteConfig.value.friendLink = res.friendLink
    })
})

</script>

<template>
    <div class="container-box">
        <div class="container box">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="友链列表" name="first">
                    <el-table :data="friendLinks" style="width: 100%" max-height="250">
                        <el-table-column prop="name" label="昵称" width="200" show-overflow-tooltip />
                        <el-table-column prop="link" label="链接" width="250" show-overflow-tooltip />
                        <el-table-column prop="avatar" label="头像" width="200" show-overflow-tooltip />
                        <el-table-column prop="descr" label="自述" width="400" show-overflow-tooltip />
                        <el-table-column fixed="right" label="操作" width="120">
                        <template #default="scope">
                            <el-button
                            link
                            type="primary"
                            size="small"
                            @click.prevent="deleteRow(scope.row)"
                            >
                            删除
                            </el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-button class="mt-4" style="width: 100%" @click="onAddItem"
                        >添加</el-button
                    >
                    <el-dialog v-model="dialogFormVisible" title="添加友链" width="600">
                        <el-form
                            label-width="auto"
                            :model="newFriendLink"
                            style="max-width: 600px"
                        >
                            <el-form-item label="昵称">
                                <el-input v-model="newFriendLink.name" />
                            </el-form-item>
                            <el-form-item label="链接">
                                <el-input v-model="newFriendLink.link" />
                            </el-form-item>
                            <el-form-item label="头像">
                                <el-input v-model="newFriendLink.avatar" />
                            </el-form-item>
                            <el-form-item label="自述">
                                <el-input v-model="newFriendLink.descr" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onFriendLinkSubmit">添加</el-button>
                                <el-button @click="dialogFormVisible = false">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="页面编辑" name="second">
                    <Editor v-model="siteConfig.friendLink" :on-save="onSiteConfigSubmit"/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style scoped>
.box {
    margin: 20px 0px;
    padding: 20px;
    min-height: 600px;
}
</style>