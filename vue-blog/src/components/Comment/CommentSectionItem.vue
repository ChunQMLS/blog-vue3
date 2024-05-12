<script setup lang="ts">
    import { ref } from 'vue'
    import CommentBar from './CommentBar.vue'
    import { MdPreview } from 'md-editor-v3'
    import 'md-editor-v3/lib/style.css'
    import { Comment } from '@/types'

    defineOptions({
        name: 'CommentSectionItem'
    })

    const { comment } = defineProps<{comment:Comment}>()

    const isShowCommentBar = ref(false)
</script>

<template>
    <div class="comment">
        <el-avatar class="avatar" shape="square" :src="comment.avatar">
            User
        </el-avatar>
        <div class="comment-main">
            <div class="comment-main-meta">
                <strong class="comment-main-nick">{{comment.nickname}}</strong>
                <span class="comment-master-sign" v-if="comment.master">博主</span>
                <small class="comment-main-time">
                    <time>{{comment.releasedate}}</time>
                </small>
                <i class="fa fa-comment-o" style="color: #00a6ff;margin-left: auto;" @click="isShowCommentBar = !isShowCommentBar"></i>
            </div>
            <div class="reply-target" v-if="comment.rnick">
                @{{ comment.rnick }}:
            </div>
            <MdPreview editor-id="preview-comment" style="margin: 10px 0;" :model-value="comment?.content" preview-theme="vuepress"/>
            <CommentBar v-if="isShowCommentBar" :reply="comment.id" :belong="comment.belong || comment.id"/>
            <div class="comment-main-replies-expand">
                <CommentSectionItem v-for="children in comment.children" :key="children.id" :comment="children" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    svg {
        .icon-genenal {
            width: 1em;
            height: 1em;
            vertical-align: -0.18em;
            overflow: hidden;
        }

        .icon-special {
            width: 100%;
            height: 100%;
        }
    }
    .comment {
        margin-top: 1rem;
        display: flex;
    }
    .avatar {
        margin-right: 20px;
    }
    .comment-main {
        flex: 1;
        width: 0;
    }
    .comment-main-meta {
        display: flex;
        align-items: center;

        >* {
            margin-right: 5px;
        }
    }
    strong {
        font-weight: bold;
    }
    .comment-master-sign {
        display: inline-block;
        background-color: var(--CommentFrame-mastersign-bg);
        border: 1px solid var(--CommentFrame-mastersign-border);
        border-radius: 2px;
        color: var(--CommentFrame-mastersign-word);
        padding: 0 0.5em;
        font-size: 0.75em;
    }
    .comment-main-time {
        font-size: 80%;
    }
    .comment-main-content-swap {
        position: relative;
        background: var(--CommentFrame-content-bg);
        padding: 10px;
        color: var(--CommentFrame-content-word);
        border-radius: 10px;
        font-size: 16px!important;
        width: fit-content;
        margin-top: 0.5rem;
        white-space: pre-wrap;

        ::before {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            top: 20px;
            left: -13px;
            border-top: 2px solid transparent;
            border-bottom: 20px solid transparent;
            border-right: 15px solid var(--CommentFrame-content-bg);
            border-left: 0 solid transparent;
        }
    }
    .reply-target {
        color: rgb(206, 185, 0);
        font-size: inherit;
        cursor: default;
    }
    .clear {
        clear: both;
    }
    .comment-main-options {
        display: flex;
        align-items: center;
        font-size: 20px;
    }
    .comment-button-replies {
        margin-left: 0.5rem;
        cursor: pointer;
    }
    .comment-master {
        flex-direction: row-reverse;

        .comment-main-content-swap {
            float: right;
            background: var(--CommentFrame-mastercontent--bg);
        }

        .comment-main-content-swap::before {
            left: 100%;
            border-left: 15px solid var(--CommentFrame-mastercontent--bg);
            border-right: 0 solid transparent;
        }

        .comment-avatar {
            margin: 10px 0 0 1rem;
        }

        .comment-main-meta {
            text-align: right;
        }

        .comment-main-options {
            justify-content: flex-end;
        }
    }
</style>