<script setup lang="ts">
import { StyleValue } from 'vue'

withDefaults(
    defineProps<{
        cardStyle?: StyleValue,
        cardClass?: any
    }>(),
    {
        cardClass: 'card'
    }
)
</script>

<template>
    <div :class="cardClass" :style="cardStyle">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.card {
    border-radius: 8px;
    box-shadow: 0 3px 8px 6px rgba(7,17,27,0.05);
    background-color: var(--fill-main-color);
    padding: 50px 40px;
    overflow: hidden;
}
</style>