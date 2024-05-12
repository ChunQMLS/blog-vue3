<script setup lang="ts">
    import { useCategoryStore } from '@/store/global'
    import { useRouter } from 'vue-router'

    defineOptions({
        name: 'LableBar'
    })

    const categoryStore = useCategoryStore()

    const rgb = () => {
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let rgb = 'rgba('+r+','+g+','+b+')';
        return rgb
    }

    const router = useRouter()

    const handleJump = (lable:string) => {
        router.push({name:'Archives',query:{lable}})
    }

</script>

<template>
    <div class="lable-box container">
        <div>📑 标签</div>
        <div class="lable-list">
            <span class="lable" v-for="(lable,index) in categoryStore.lables" :key="index" @click="handleJump(lable.lable)" :style="{color: `${rgb()}`}">
                {{ lable.lable + ` (${lable.articleNum})` }}
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 10px;
}
.lable-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
}
.lable {
    padding-right: 10px;
    cursor: pointer;
}
</style>