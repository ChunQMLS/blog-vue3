<script setup lang="ts">
defineProps<{
    titles: string[] | undefined
}>()

const emit = defineEmits(['click'])

const handleClick = (title:string) => {
    emit('click',title)
}
</script>

<template>
    <div class="title-list">
        <div class="title-list-item" v-for="(title, index) in titles" :key="index" @click="handleClick(title)">
            <div class="item-circle">
                {{ title }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.title-list {
    margin-left: 30px;
}
.title-list-item {
    position: relative;
}
.item-circle::before {
    position: absolute;
    top: 30%;
    left: -27px;
    width: 6px;
    height: 6px;
    border: 3px solid #ff7242;
    border-radius: 50%;
    background: #fff;
    content: '';
}
</style>