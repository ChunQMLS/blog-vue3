<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRef, watch } from 'vue'
import { WaterfallList,WaterfallData } from '@/types/gallery'


const props = defineProps<{
    data: WaterfallData[],
    itemWidth: number
}>()

const data = toRef(props, 'data')

// 只有两种情况下会重新渲染
// 1.元素宽度发生变化
// 2.原始数据发生变化

const imgWall = ref<HTMLDivElement | null>(null)

let observer:ResizeObserver | null = null

const gap = ref<number>(10)

const containerWidth = ref(0)

const width = computed(() => {
    return column.value === 1 ? containerWidth.value - gap.value*2 : props.itemWidth
})

const column = computed(() => {
    return Math.floor(containerWidth.value/(props.itemWidth+gap.value*2))
})

const newData = computed(() => {
    return data.value.map( item => {
        item.height = Math.ceil(width.value/item.width*item.height)
        item.width =  width.value
        return item
    })
})

const list = ref<WaterfallList[]>([])

// 计算列高度
const getMinHeightIndex = (arr:WaterfallList[]) => {
    let index = 0
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[index].height > arr[i+1].height) {
            index = i + 1
        }
    }
    return index
}

const render = () => {
    const arr:WaterfallList[] = new Array(column.value).fill({}).map( () => ({height: 0,waterfallDatas: []}))
    let minIndex = 0
    newData.value.forEach( item => {
        if (arr[minIndex]) {
            arr[minIndex]['waterfallDatas'].push(item)
            arr[minIndex]['height'] = arr[minIndex].height + item.height
            minIndex = getMinHeightIndex(arr)
        }
    })
    list.value = arr
}

let timer:number | undefined = undefined

const handleResize = (entries: any) => {
    if (timer) {
            clearTimeout(timer)
    }
    timer = setTimeout(() => {
        for (const entry of entries) {
            const { width } = entry.contentRect
            containerWidth.value = width
        }
    },200)
}

watch([containerWidth,newData],() => {
    if (data.value) {
        render()
    }
})

onMounted(() => {
    if (imgWall.value) {
        observer = new ResizeObserver(handleResize)
        observer.observe(imgWall.value)
    }
})

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect
    }
})

</script>

<template>
    <div class="img-wall" ref="imgWall">
        <div class="img-list" v-for="(item, index) in list" 
            :key="index"
            :style="{'width': `${width}px`,'margin': `0 ${gap}px`}">
            <slot name="waterfill" :data="item.waterfallDatas"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.img-wall {
    display: flex;
    justify-content: center;
    overflow: hidden;
}
</style>