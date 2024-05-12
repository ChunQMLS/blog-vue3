<template>
    <div class="timeline">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.timeline {
    margin: 0 0 20px 10px;
    padding: 14px 20px 5px;
    border-left: 2px solid var(--timeline-color, #49b1f5);
}
</style>