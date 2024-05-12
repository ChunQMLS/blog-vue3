<script setup lang="ts">
import Main from '../Main.vue'
import Comment from '@/components/Comment/Comment.vue'
</script>

<template>
    <Main>
        <div class="container">
            <div class="mb-top">
                <div class="mb-title">
                    留言板
                </div>
                <div class="mb-tip">
                    留下你的足迹吧~~~
                </div>
            </div>
            <el-divider />
            <Comment />
        </div>
    </Main>
</template>

<style scoped lang="scss">
.mb-top>* {
    margin-bottom: 10px;
}
.mb-title {
    font-size: 1.4rem;
    font-weight: 700;
}
</style>