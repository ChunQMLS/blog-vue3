<script setup lang="ts">
import CommentBar from './CommentBar.vue'
import CommentSection from './CommentSection.vue'

</script>

<template>
    <div class="comment-title">
        <i class="fa fa-comments"></i>
        <span>评论</span>
    </div>
    <CommentBar/>
    <CommentSection/>
</template>

<style scoped lang="scss">
.comment-title>* {
    margin-right: 4px;
    font-size: 1.4rem;
    font-weight: bold;
}
</style>