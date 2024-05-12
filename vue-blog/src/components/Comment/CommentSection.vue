<script setup lang="ts">
    import { computed, onBeforeMount, ref } from 'vue'
    import { Comment } from '@/types'
    import CommentSectionItem from './CommentSectionItem.vue'
    import { getCommentsWithBlog } from '@/request/api/commentApi'
    import { useRoute } from 'vue-router'

    defineOptions({
        name: 'CommentSection'
    })

    const loading = ref(true)

    const comments = ref<Comment[]>([])

    const handleLoading = () => {
        comments.value = []
        loading.value = true
        getComment()
    }

    const route = useRoute()

    const getComment = () => {
        getCommentsWithBlog({local:route.fullPath}).then( res => {
            comments.value = res
            loading.value = false
        })
    }

    const count = computed(() => {
        let count = 0
        comments.value?.forEach( item => {
            count += item.children.length
        })
        return count + comments.value?.length
    })

    onBeforeMount(() => {
        getComment()
    })

</script>

<template>
    <div class="comment-box" v-loading="loading"  element-loading-background="#fff">
        <div class="comment-top">
            <span v-if="count">{{ count }}条评论</span>
            <i class="fa fa-refresh" @click="handleLoading" style="color: #00a6ff;margin-left: auto; cursor: pointer;"></i>
        </div>
        <div class="nocomment-tip"><span>没有评论</span></div>
        <CommentSectionItem v-for="comment in comments" :key="comment.id" :comment="comment"/>
    </div>
</template>

<style scoped lang="scss">
.comment-box {
    min-height: 200px;
}
.comment-top {
    display: flex;
    align-items: center;
}
.comment-top>span {
    font-size: 1.4rem;
    font-weight: bold;
}
.nocomment-tip {
    height: 150px;
    @include flex-center
}
</style>