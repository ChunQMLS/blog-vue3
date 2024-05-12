<script setup lang="ts">
    import { deleteComment, ignoreReply, ignoreReplyAll } from '@/request/api/useCommentApi'
    import { CommentType,Comment } from '@/types/comment'
    import { onBeforeMount, ref } from 'vue'
    import { getIdsFromList } from '@/utils/utils'
    import BlackList from '@/views/Comment/BlackList.vue'
    import { useCommentStore } from '@/stores/useCommentStore.ts'
    import CommentEditor from '@/views/Comment/CommentEditor.vue'

    const store = useCommentStore()

    const type = ref<CommentType>('all')

    const handleRadio = (val:string | number | boolean | undefined) => {
        if (val === 'all') {
            store.getComment()
        }else if(val === 'noreply') {
            store.getNoReplyComment()
        }
    }

    const selectionComments = ref<Comment[]>([])

    const handleSelectionChange = (val:Comment[]) => {
        if (val.length === 0) {
            isIgnoreMore.value = false
            isDeleteMore.value = false
        }else {
            if (type.value === 'all') {
                isIgnoreMore.value = false
                isDeleteMore.value = true
            }else if (type.value === 'noreply') {
                isIgnoreMore.value = true
                isDeleteMore.value = false
            }
        }
        selectionComments.value = val
    }

    const isIgnoreMore = ref(false)

    const handleIgnore = (row:Comment) => {
        ignoreReply({ids: [row.id || '']}).then(() => {
            if (store.commentData.list.length === 1 &&
                store.commentData.currentPage === store.commentData.total && 
                store.commentData.size > store.commentData.pageSize) {
                store.commentData.currentPage--
            }
            store.getNoReplyComment(store.commentData.currentPage)
        })
    }

    const handleIgnoreAll = () => {
        ignoreReplyAll().then(() => {
            store.getNoReplyComment()
        })
    }

    const isDeleteMore = ref(false)

    const handleDelete = (row:Comment) => {
        deleteComment({ids: [row.id || '']}).then(() => {
            if (store.commentData.list.length === 1 &&
                store.commentData.currentPage === store.commentData.total && 
                store.commentData.size > store.commentData.pageSize) {
                store.commentData.currentPage--
            }
            store.getComment(store.commentData.currentPage)
        })
    }

    const handleDeleteMore = () => {
        const ids = getIdsFromList(selectionComments.value)
        deleteComment({ids}).then(() => {
            if (store.commentData.list.length === 1 &&
                store.commentData.currentPage === store.commentData.total && 
                store.commentData.size > store.commentData.pageSize) {
                store.commentData.currentPage--
            }
            store.getComment(store.commentData.currentPage)
        })
    }

    const isBlackList = ref(false)

    const isCommentEditor = ref(false)

    const replyComment = ref<Comment>()

    const handleReply = (row:Comment) => {
        replyComment.value = row
        isCommentEditor.value = true
    }

    onBeforeMount(() => {
        store.getComment()
    })

</script>

<template>
    <div class="container-box">
        <div class="comment-option container box">
            <el-radio-group v-model="type" @change="handleRadio">
                <el-radio-button value="all" >全部</el-radio-button>
                <el-radio-button value="noreply">待评论</el-radio-button>
            </el-radio-group>
            <div>
                <el-button v-show="isIgnoreMore" type="danger" @click="handleIgnoreAll">全部忽略</el-button>
                <el-button v-show="isDeleteMore" type="danger" @click="handleDeleteMore">删除</el-button>
                <el-button @click="isBlackList = !isBlackList" type="info">黑名单</el-button>
            </div>
        </div>
        <div class="article-table container box">
            <el-table :data="store.commentData.list" @selection-change="handleSelectionChange" style="width: calc(100% -10px);margin-bottom: 20px;" :height="500" :max-height="500">
                <el-table-column v-show="type === 'all'" type="selection" width="55" />
                <el-table-column label="日期" prop="releasedate" width="150" sortable/>
                <el-table-column label="昵称" prop="nickname" width="150" show-overflow-tooltip />
                <el-table-column label="邮箱" prop="email" width="200" show-overflow-tooltip/>
                <el-table-column label="内容" prop="content" width="150" show-overflow-tooltip/>
                <el-table-column label="所属" prop="local" width="150" show-overflow-tooltip/>
                <el-table-column label="回复" prop="rnick" width="150" show-overflow-tooltip/>
                <el-table-column label="操作" align="right" width="150">
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="success"
                            @click="handleReply(scope.row)"
                        >回复</el-button>
                        <el-button
                            v-show="type === 'noreply'"
                            size="small"
                            type="warning"
                            @click="handleIgnore(scope.row)"
                        >忽略</el-button>
                        <el-button
                            v-show="type === 'all'"
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" 
                v-model:current-page="store.commentData.currentPage"
                :pager-count="5" 
                :page-size="store.commentData.pageSize"
                :total="store.commentData.total"
                style="display: flex;justify-content: center;" />
        </div>
    </div>
    <BlackList v-model:visible="isBlackList" />
    <CommentEditor v-model:visible="isCommentEditor" v-if="isCommentEditor" :comment="replyComment" />
</template>

<style scoped>
.box {
    margin: 20px 0px;
    padding: 10px;
}
.comment-option {
    display: flex;
    justify-content: space-between;
}
</style>