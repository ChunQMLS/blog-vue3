<script setup lang="ts">
import { reactive } from 'vue'
import { useCategoryStore } from '@/store/global'
import { useRouter } from 'vue-router'

defineOptions({
    name: 'CategoryBar'
})

const categoryStore = useCategoryStore()

const svgStyle = reactive({
    width: '1em',
    height: '1em',
    verticalAlign: 'middle',
    fill: 'currentColor',
    overflow: 'hidden'
})

const router = useRouter()

const handleJump = (category:string) => {
    router.push({name: 'Archives',query:{category}})
}

</script>

<template>
    <div class="category-bar container">
        <div class="category-item" v-for="(item, index) in categoryStore.category.slice(0,6)" :key="index" @click="handleJump(item.category)">
            <span class="category-text">{{ item.category + ` (${item.lables.length})`}}</span>
            <span>
                <svg :style="svgStyle" t="1709630571326" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1460" width="128" height="128"><path d="M881 562H81c-27.6 0-50-22.4-50-50s22.4-50 50-50h800c27.6 0 50 22.4 50 50s-22.4 50-50 50z" p-id="1461"></path><path d="M907.6 540.7L695.5 328.6c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0L978.4 470c19.5 19.5 19.5 51.2 0 70.7-19.6 19.6-51.2 19.6-70.8 0z" p-id="1462"></path><path d="M695.5 695.4l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7L766.2 766.1c-19.5 19.5-51.2 19.5-70.7 0s-19.5-51.2 0-70.7z" p-id="1463"></path></svg>
            </span>
        </div>
        <router-link v-if="categoryStore.category.length >= 6" class="more" to="/category">
            查看更多
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.category-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.container {
    padding: 10px;
}
.category-item {
    display: flex;
    flex-basis: calc(50% - 5px);
    margin: 10px 0px;
    padding: 10px;
    background-color: var(--fill-main-color);
    border-radius: 10px;
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    cursor: pointer;

    svg {
        width: 1em;
        height: 1em;
        vertical-align: middle;
        fill: currentColor;
        overflow: hidden;
    }
}
.category-text {
    flex: 1;
    font-weight: 500;
}
.more {
    flex: 1 0 0;
    text-align: center;
}
.more:hover {
    color: #f97a35;
}
</style>