<script setup lang="ts">
import Main from '../Main.vue'
import TitleList from '@/components/TitleList/TitleList.vue'
import { useCategoryStore } from '@/store/global'
import { computed } from 'vue';

const categoryStore = useCategoryStore()

const categorys = computed(() => {
    return categoryStore.category.map( item => {
        return item.category
    })
})

</script>

<template>
    <Main>
        <div class="container">
            <div class="card-title">
                分类
            </div>
            <TitleList :titles="categorys" />
        </div>
    </Main>
</template>

<style scoped lang="scss">
.container {
    min-height: 400px;
}
.card-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 10px;
}
</style>