<script setup lang="ts">
import { getGallery } from '@/request/api/galleryApi'
import { Gallery, WaterfallData } from '@/types/gallery'
import Main from '../Main.vue'
import Waterfall from '@/components/Waterfall/Waterfall.vue'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import ImageBase from '@/config/config'

const route = useRoute()

const gallery = ref<Gallery>()

const galleryRes = computed<WaterfallData[]>(() => {
    if (gallery.value?.imageRes) {
        return gallery.value.imageRes.map( item => {
            return {
                width: item.width,
                height: item.height,
                data: {
                    url: item.url,
                    orders: item.orders
                }
            }
        })
    }
    return []
})

onBeforeMount(() => {
    getGallery({id:route.params.id}).then( res => {
        gallery.value = res
    })
})

const srcList = computed<string[]>(() => {
    if (gallery.value?.imageRes) {
        return gallery.value.imageRes.map( item => {
            return item.url
        })
    }
    return []
})

const showImageViewer = ref(false)

const initialIndex = ref(0)

const handleImageViewer = (order?:number) => {
    if (!showImageViewer.value && order != undefined && order>= 0) {
        initialIndex.value = order
        showImageViewer.value = true
    }else {
        showImageViewer.value = false
    }
}

</script>

<template>
    <Main>
        <div class="container">
            <Waterfall :data="galleryRes" :item-width="200">
                <template #waterfill="scope" >
                    <div 
                        class="waterfall-image" 
                        v-for="(item, index) in scope.data" :key="index"
                        @click="handleImageViewer(item.data.orders)"
                        :style="{'width': `${item.width}px`,'height':`${item.height}px`,'margin-bottom':'10px'}">
                        <img v-lazy="ImageBase + item.data.url" alt="">
                    </div>
                </template>
            </Waterfall>
            <el-image-viewer @close="handleImageViewer" :initial-index="initialIndex" :url-list="srcList" v-if="showImageViewer" />
        </div>
    </Main>
</template>

<style scoped lang="scss">
.container {
    @include respond-to {
        padding: 20px 10px;
    }

    img {
        object-fit: cover;
    }
}
.waterfall-image {
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        vertical-align: bottom;
    }
}
</style>