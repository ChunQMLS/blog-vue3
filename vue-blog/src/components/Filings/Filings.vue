<script setup lang="ts">
import { useBlogInfoStore } from '@/store/global'
import { computed, ref } from 'vue'

const blogInfoStore = useBlogInfoStore()

const startDate = computed(() => {
    const date = new Date(blogInfoStore.blogInfo.createTime)
    return date.getFullYear()
})

const currentDate = ref(new Date().getFullYear())

</script>

<template>
    <footer>
        <div class="footer-wrap">
            <div class="experience">
                <span>© {{ startDate === currentDate ? startDate : `${startDate} - ${currentDate}`}} By Yukioo</span>
            </div>
            <div class="ICP-filings">
                <a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备2024034064号-1</a>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.footer-wrap {
    flex-direction: column;
    margin: 40px 0;
    @include flex-center;

    >* {
        margin-bottom: 10px;
    }
}
</style>