<script setup lang="ts">
defineProps<{
    timestamp: string | undefined,
    fontSize?: number | undefined
}>()
</script>

<template>
    <div class="timeline-item">
        <div class="timeline-item-time">
            <div class="item-circle" :style="{'font-size': `${fontSize}px`}">
                <p>{{ timestamp }}</p>
            </div>
        </div>
        <div class="timeline-item-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.timeline-item {
    margin: 0 0 15px;
}
.timeline-item-time {
    position: relative;
}
.item-circle {
    font-size: 0.85rem;

    >p {
        margin: 0 0 8px;
    }

    ::before {
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
}
</style>