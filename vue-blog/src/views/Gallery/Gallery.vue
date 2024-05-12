<script setup lang="ts">
import { getGalleryList } from '@/request/api/galleryApi'
import { Gallery } from '@/types/gallery'
import Main from '../Main.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import ImageBase from '@/config/config'

const imageFormat = '?x-oss-process=image/resize,m_fill,h_420,w_250/format,webp'

const galleryList = ref<Gallery[]>()

onBeforeMount(() => {
    getGalleryList().then(res => {
        galleryList.value = res
    })
})

const router = useRouter()

const handleJump = (id:string) => {
    router.push({name:'GalleryRes',params:{id}})
}

</script>

<template>
    <Main>
        <div class="container">
            <h1 class="page-title">图库</h1>
            <div class="gallery-list">
                <div class="gallery-list-item" v-for="(gallery, index) in galleryList" :key="index" @click="handleJump(gallery.id)">
                    <img class="gallery-image" v-lazy="ImageBase + gallery.preview + imageFormat" alt="">
                    <div class="gallery-title">
                        {{ gallery.title }}
                    </div>
                </div>
            </div>
        </div>
    </Main>
</template>

<style scoped lang="scss">
.container {
    @include respond-to {
        padding: 20px 10px;
    }
}
.page-title {
    font-weight: 700;
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 20px;
}
.gallery-list-item {
    position: relative;
    float: left;
    width: calc( 100%/2 - 20px);
    margin: 10px;
    height: 250px;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;

    @include respond-to {
        width: 100%;
        margin: 10px 0px;
    }
}
.gallery-image {
    width: 100%;
    height: 100%;
    filter: brightness(50%);
}
.gallery-title {
    position: absolute;
    padding: 30px;
    top: 0;
    left: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
}
</style>