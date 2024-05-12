<script setup lang="ts">
import { getUpdateRecords } from '@/request/api/aboutApi'
import { BlogEvent } from '@/types/about'
import { onBeforeMount, ref } from 'vue'
import Card from '@/components/Card/Card.vue'
import Timeline from '@/components/Timeline/Timeline.vue'
import TimelineItem from '@/components/Timeline/TimelineItem.vue'

const blogEvent = ref<BlogEvent[]>()

onBeforeMount(() => {
    getUpdateRecords().then( res => {
        blogEvent.value = res
    })
})

</script>

<template>
    <div id="blog-event">
        <div class="blog-event-title">博客事件</div>
        <Timeline>
            <TimelineItem 
                :timestamp="event.releasedate"
                v-for="(event, index) in blogEvent" :key="index" :id="event.id">
                <Card :card-style="{'padding':'20px'}">
                    {{ event.content }}
                </Card>
            </TimelineItem>
        </Timeline>
    </div>
</template>

<style scoped>
.blog-event-title {
    font-size: 1.4rem;
    font-weight: 700;
}
</style>