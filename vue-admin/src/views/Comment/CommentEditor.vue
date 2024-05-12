<script setup lang="ts">
    import { PropType, ref } from 'vue'
    import { useUserStore } from '@/stores/useUserStore'
    import { insertComment } from '@/request/api/useCommentApi'
    import { UpdateComment,Comment } from '@/types/comment'

    const dialogVisible = defineModel<boolean>('visible')

    const props = defineProps({
        comment:Object as PropType<Comment>
    })

    const store = useUserStore()

    const updateComment = ref<UpdateComment>({
        reply: props.comment?.reply || '',
        belong: props.comment?.belong || '',
        avatar: store.myInfo.avatar || '',
        nickname: store.myInfo.nickname || '',
        email: store.myInfo.email || '',
        website: '',
        content: '',
        local: props.comment?.local || '',
    })

    const handleSubmit = () => {
        console.log(store.myInfo,updateComment);
        
        insertComment(updateComment.value).then(() => {
            dialogVisible.value = false
        })
    }

</script>

<template>
    <el-dialog
        v-model="dialogVisible"
        title="回复评论"
        width="500"
    >
        <div class="reply-target">{{ '@'+props.comment?.nickname+':' }}</div>
        <el-input  
            v-model="updateComment.content"
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8 }" />
        <template #footer>
            <el-button
                type="primary"
                @click="handleSubmit">提交</el-button>
        </template>
    </el-dialog>
</template>

<style scoped>
.reply-target {
    font-size: 16px;
    color: rgba(214, 203, 0, 0.796);
    margin-bottom: 10px
}
</style>