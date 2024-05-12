<script setup lang="ts">
    import { getNotice } from '@/request/api/homeApi';
import { onBeforeMount, ref } from 'vue'

    defineOptions({
        name: 'Notice'
    })

    const notice = ref<string>('')

    onBeforeMount(() => {
        getNotice().then( res => {
            notice.value = res
        })
    })


</script>

<template>
    <div class="notice-box container">
        <div>📢 公告</div>
        <div class="notice-content">
            {{ notice }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 10px;

    .notice-content {
        padding: 0 10px;
    }
}
</style>