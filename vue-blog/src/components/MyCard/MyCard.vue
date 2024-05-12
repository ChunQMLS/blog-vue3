<script setup lang="ts">
import { useCategoryStore, useMyInfoStore } from '@/store/global'
import { ref,onMounted,onBeforeUnmount } from 'vue'
import ImageBase from '@/config/config'

defineOptions({
    name: 'MyCard'
})

const imageFormat = '?x-oss-process=image/resize,m_fill,h_110,w_110/format,webp'

const myInfostore = useMyInfoStore()

const categoryStore = useCategoryStore()

const dictum = ref({
    reversal: false,
    text: ''
})

let typewriter = ref(0)

onMounted(()=>{
    typewriter.value = setInterval(()=>{
        if(!dictum.value.reversal){
            const myDictum = myInfostore.myInfo.dictum
            if(dictum.value.text.length < myDictum.length) {
                dictum.value.text = myDictum.slice(0,dictum.value.text.length+1)
            }else {
                dictum.value.reversal = !dictum.value.reversal
            }
        }else {
            if(dictum.value.text.length > 0) {
                dictum.value.text = dictum.value.text.slice(0,dictum.value.text.length-1)
            }else {
                dictum.value.reversal = !dictum.value.reversal
            }
        }
    },300)
})

onBeforeUnmount(()=>{
    clearInterval(typewriter.value)
})

</script>

<template>
    <div class="my-card container">
        <div class="my-info">
            <div class="avatar-img">
                <img v-lazy="ImageBase + myInfostore.myInfo.avatar" alt="">
            </div>
            <div class="my-name">
                {{ myInfostore.myInfo.nickname }}
            </div>
            <div class="typewriter">
                {{ dictum.text + '|' }}
            </div>
        </div>
        <div class="blog-info">
            <div class="blog-info-item">
                <div class="headline">文章</div>
                <div class="count">{{ categoryStore.articleTotal }}</div>
            </div>
            <div class="blog-info-item">
                <div class="headline">分类</div>
                <div class="count">{{ categoryStore.category.length }}</div>
            </div>
            <div class="blog-info-item">
                <div class="headline">标签</div>
                <div class="count">{{ categoryStore.lables.length }}</div>
            </div>
        </div>
        <div class="collect-blog">
            
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 10px;
}
.my-card {
    padding: 1rem 1.2rem;
    text-align: center;
}
.avatar-img {
    overflow: hidden;
    margin: 0 auto;
    width: 110px;
    height: 110px;
    border-radius: 70px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.blog-info {
    display: table;
    margin: .7rem 0 .2rem;
    width: 100%;
    table-layout: fixed;
}
.blog-info-item {
    display: table-cell;
}
</style>