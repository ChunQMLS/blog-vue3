<script setup lang="ts">
import { useMyInfoStore } from '@/store/global'
import { ref } from 'vue'

defineProps<{title:string | undefined}>()

const myInfoStore = useMyInfoStore()

const url = ref(window.location.href)

</script>

<template>
    <div class="container coryright">
        <div class="coryright-author">
            <span class="coryright-meta">
                <i class="fa fa-fw  fa-sticky-note"></i>
                <span>文章作者:</span>
            </span>
            <span class="coryright-info"><a :href="url" >{{ myInfoStore.myInfo.nickname }}</a></span>
        </div>
        <div class="coryright-title">
            <span class="coryright-meta">
                <i class="fa fa-fw  fa-sticky-note"></i>
                <span>文章标题:</span>
            </span>
            <span class="coryright-info">{{ title }}</span>
        </div>
        <div class="coryright-link">
            <span class="coryright-meta">
                <i class="fa fa-fw  fa-sticky-note"></i>
                <span>文章链接:</span>
            </span>
            <span class="coryright-info"><a :href="url" >{{ url }}</a></span>
        </div>
        <div class="coryright-notice">
            <span class="coryright-meta">
                <i class="fa fa-fw  fa-sticky-note"></i>
                <span>版权声明</span>
            </span>
            <span class="coryright-info">
                本站所有文章除特别声明外,均采用<a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1">CC BY-SA 4.0</a>许可协议。转载请注明来自<a :href="url">Yukioo的小破站</a>!
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 10px;
    border-radius: 0;
    border: 1px solid var(--border-main-color);
    background-color: var(--theme-second-color);
}
.coryright {

    a {
        color: #99a9bf;
        text-decoration: underline;
        word-break: break-word;
    }

    .coryright-meta {
        font-weight: 700;
        color: var(--word-third-color);
        margin-right: 10px;
        white-space: nowrap;
    }

    .coryright-info {
        font-size: 0.9rem;
    }
}
</style>