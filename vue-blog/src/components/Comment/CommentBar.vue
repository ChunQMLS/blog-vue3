<script setup lang="ts">
    import { computed,  onBeforeMount,  ref } from 'vue'
    import { type UpLoadComment } from '@/types'
    import { MdPreview } from 'md-editor-v3'
    import 'md-editor-v3/lib/style.css'
    import { useCriticStore } from '@/store/global'
    import { getCommentTip, uploadComment } from '@/request/api/commentApi'
    import { ElMessage } from 'element-plus'
    import { useRoute } from 'vue-router'

    defineOptions({
        name: 'CommentBar'
    })

    const hint = ref<string>('')

    const isPreview = ref<boolean>(false)

    const { reply,belong } = defineProps<{reply?:string,belong?:string}>()

    const route = useRoute()
    

    const data = ref({
        content: '',
        reply: reply || '',
        belong: belong || '',
        local: route.fullPath
    })

    const criticStore = useCriticStore()

    const upLoadComment = computed<UpLoadComment>(() => {
        return Object.assign({},criticStore.critic,data.value)
    })



    const getAvatarUrl = () => {
        const qqNumber = criticStore.Qnumber
        if (qqNumber !== '') {
            criticStore.critic.avatar = `https://q4.qlogo.cn/g?b=qq&nk=${qqNumber}&s=100`
        }else {
            criticStore.critic.avatar = ''
        }
    } 

    const upload = ()=>{
        uploadComment(upLoadComment.value).then(()=>{
            ElMessage({
                type: 'success',
                offset: 60 ,
                message: '上传成功'
            })
        })
    }

    onBeforeMount(() => {
        criticStore.localSave()
        getCommentTip().then( res => {
            hint.value = res
        })
    })

    
</script>

<template>
    <div class="comment-submit">
        <div class="comment-submit-input">
            <div class="comment-submit-profile-photo">
                <el-avatar :src="criticStore.critic.avatar">
                    User
                </el-avatar>
            </div>
            <div class="comment-submit-main">
                <div class="meta-input">
                    <div class="meta-input-el">
                        <div class="meta-tip">昵称</div>
                        <el-input v-model="criticStore.critic.nickname" style="border-radius: 0 4px 4px 0;" placeholder="必填" />
                    </div>
                    <div class="meta-input-el meta-input-el-margin">
                        <div class="meta-tip">邮箱</div>
                        <el-input v-model="criticStore.critic.email" style="border-radius: 0 4px 4px 0;" placeholder="必填" @change="getAvatarUrl"/>
                    </div>
                    <div class="meta-input-el meta-input-el-margin">
                        <div class="meta-tip">网址</div>
                        <el-input v-model="criticStore.critic.website" style="border-radius: 0 4px 4px 0;" placeholder="选填" />
                    </div>
                </div>
                <div class="meta-content">
                    <el-input v-model="data.content" :autosize="{ minRows: 6}" type="textarea" maxlength="500" :placeholder="hint" />
                    <span class="textarea-count">{{data.content.length}}/500</span>
                </div>
            </div>
        </div>
        <div class="comment-submit-options">
            <div class="comment-submit-options-start">
                <!-- <div class="comment-submit-options-icon">
                    <svg t="1660465344800" class="icon icon-special" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9607" width="200" height="200"><path d="M512 986.88c-241.493333 0-438.186667-196.693333-438.186667-438.186667S270.506667 110.506667 512 110.506667 950.186667 307.2 950.186667 548.693333 753.493333 986.88 512 986.88z m0-791.04c-194.56 0-352.853333 158.293333-352.853333 352.853333s158.293333 352.853333 352.853333 352.853334 352.853333-158.293333 352.853333-352.853334S706.56 195.84 512 195.84z" p-id="9608"></path><path d="M512 769.706667a221.866667 221.866667 0 0 1-177.493333-89.173334 42.496 42.496 0 0 1 8.96-59.733333 42.496 42.496 0 0 1 59.733333 8.96 134.826667 134.826667 0 0 0 109.226667 55.04c43.093333 0 82.773333-20.053333 108.8-54.613333 14.08-18.773333 40.96-22.613333 59.733333-8.533334 18.773333 14.08 22.613333 40.96 8.533333 59.733334A224.128 224.128 0 0 1 512 769.706667zM376.32 556.8c-23.466667 0-42.666667-19.2-42.666667-42.666667v-56.746666c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666667 42.666667v56.746666c0 23.466667-18.773333 42.666667-42.666667 42.666667zM622.08 556.8c-23.466667 0-42.666667-19.2-42.666667-42.666667v-56.746666c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666667 42.666667v56.746666c0 23.466667-19.2 42.666667-42.666667 42.666667z" p-id="9609" fill="#515151"></path></svg>
                </div> -->
            </div>
            <button type="button" class="button-preview comment-button" @click="isPreview = !isPreview">预览</button>
            <button type="button" class="button-publish comment-button" @click="upload">发表</button>
        </div>
    </div>
    <MdPreview v-if="isPreview" editor-id="preview-comment" :model-value="data?.content"/>
</template>

<style scoped lang="scss">
    svg.icon-genenal {
        width: 1em;
        height: 1em;
        vertical-align: -0.18em;
        overflow: hidden;
    }
    svg.icon-special {
        width: 100%;
        height: 100%;
    }   
    .comment-submit {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
    }
    .comment-submit-input {
        display: flex;
        flex: 1;
        justify-content: space-between;
    }
    .meta-input {
        display: flex;

        @include respond-to {
            flex-direction: column;
            align-items: flex-start;
        }
    }
    .comment-submit-profile-photo {
        flex-shrink: 0;
        height: 2.5rem;
        width: 2.5rem;
        overflow: hidden;
        margin-right: 1rem;
        border-radius: 5px;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .comment-submit-profile-photo svg,.comment-submit-options-icon svg {
        fill: currentColor;
        color: var(--Comment-icon-color);
    }
    .comment-submit-main {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .meta-input {
        display: flex;
        margin-bottom: 0.5rem;
    }
    .meta-input-el {
        flex: 1;
        display: inline-table;
        border-collapse: separate;
        border-spacing: 0;
        font-size: 13px;
    }
    .meta-input-el-margin {
        margin-left: 0.5rem;

        @include respond-to {
            margin: 10px 0 0 0;
        }
    }
    .meta-tip {
        background-color: var(--fill-second-color);
        vertical-align: middle;
        display: table-cell;
        border-radius: 4px 0 0 4px;
        padding: 0 20px;
        width: 1px;
        white-space: nowrap;
        cursor: default;
    }
    .meta-content {
        position: relative;
        line-height: 0;
    }
    .textarea-count {
        position: absolute;
        font-size: 12px;
        bottom: 10px;
        right: 10px;
    }
    .comment-submit-options {
        display: flex;
        position: relative;
        margin: 1rem 0 1rem 3.5rem;
    }
    .comment-submit-options-start {
        flex: 1;
        display: flex;
        align-items: center;
    }
    .comment-submit-options-icon {
        width: 1.5em;
        line-height: 0;
        cursor: pointer;
    }
    button,textarea,input {
        font-family: inherit;
    }
    .comment-button {
        padding: 9px 15px;
        font-size: 12px;
        line-height: 1;
        border: 1px solid #DCDFE6;
        border-radius: 3px;
        color: inherit;
        outline: 0;
        font-weight: 500;
    }
    .button-publish {
        margin-left: 10px;
        background: var(--button-main-color);
        cursor: pointer;
    }
    .button-preview {
        margin-left: 10px;
        background: var(--button-second-color);
        cursor: pointer;
    }
</style>

<style>
.el-input__wrapper {
    background-color: var(--theme-second-color);
}
.el-textarea__inner {
    background-color: var(--theme-second-color);
}
</style>