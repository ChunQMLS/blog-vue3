<script setup lang="ts">
import { getUpdateRecords } from '@/request/api/aboutApi'
import { BlogEvent } from '@/types/about'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
    name: 'BlogEvent'
})

const blogEvent = ref<BlogEvent[]>()

onBeforeMount(() => {
    getUpdateRecords().then( res => {
        blogEvent.value = res
    })
})

const router = useRouter()

const handleJump = (event:string = 'blog-event') => {
    router.push({name: 'About',query:{event: `#${event}`}})
}

</script>

<template>
    <div class="event-box container">
        <div>📑 博客事件</div>
        <div class="event-list" v-for="(event, index) in blogEvent?.slice(0,5)" :key="index">
            <div class="event-content" @click="handleJump(event.id)">
                <span>{{ event.content }}</span>
            </div>
            <div class="event-date">
                <span>{{ event.releasedate }}</span>
            </div>
        </div>
        <div v-if="blogEvent && blogEvent?.length >= 5" class="more" @click="handleJump()">更多</div>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 10px;
}
.event-list {
    padding: 0 10px;
    font-size: 0.8rem;
}
.event-content>span {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    cursor: pointer;
    text-decoration: underline;
}
.event-content>span:hover,.more:hover {
    color: #f97a35;
}
.event-date {
    font-size: 0.7rem;
}
.more {
    text-align: center;
    font-size: 0.8rem;
}
</style>