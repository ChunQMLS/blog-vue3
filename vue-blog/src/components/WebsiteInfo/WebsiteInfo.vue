<script setup lang="ts">
    import { computed } from 'vue'
    import { useBlogInfoStore } from '@/store/global'

    defineOptions({
        name: 'WebsiteInfo'
    })

    const blogInfoStore = useBlogInfoStore()

    const elapsedTime = computed(()=>{
        let diffDate = Math.abs(Date.now() - Date.parse(blogInfoStore.blogInfo.createTime || ''))
        let totalDays = Math.floor(diffDate / (1000*3600*24))
        return totalDays
    })

    const _convertion = (num:number | undefined,digit:number = 1000,reserve:number = 1,char:string = 'k') => {
        if (num === undefined) {
            return
        }
        if (num<=digit) {
            return num
        }
        let result = num/digit
        if (result.toString().split('.')[0].length<1000) {
            return num
        }else {
            return result.toFixed(reserve) + char
        }
    }

</script>

<template>
    <div class="website-info-box container">
        <div>🎫 网站资讯</div>
        <div class="webinfo">
            <div class="webinfo-item">
                <div>文章数目:</div>
                <div>{{ blogInfoStore.blogInfo.articleNum }}</div>
            </div>
            <div class="webinfo-item">
                <div>已运行时间:</div>
                <div>{{ elapsedTime + '天' }}</div>
            </div>
            <div class="webinfo-item">
                <div>本站总字数:</div>
                <div>{{ _convertion(blogInfoStore.blogInfo.wordNum) }}</div>
            </div>
            <div class="webinfo-item">
                <div>本站访客数:</div>
                <div>{{ _convertion(blogInfoStore.blogInfo.pv) }}</div>
            </div>
            <div class="webinfo-item">
                <div>本站访问量:</div>
                <div>{{ _convertion(blogInfoStore.blogInfo.visits) }}</div>
            </div>
            <div class="webinfo-item">
                <div>本站评论数:</div>
                <div>{{ _convertion(blogInfoStore.blogInfo.commentNum) }}</div>
            </div>
            <div class="webinfo-item">
                <div>最后更新时间:</div>
                <div>{{ blogInfoStore.blogInfo.lastUpdateTime }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 10px;
}
.webinfo {
    padding: 0 10px;
}
.webinfo-item {
    display: flex;
    justify-content: space-between;
}
</style>