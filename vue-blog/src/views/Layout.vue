<script setup lang="ts">
    import Nav from '@/components/Nav/Nav.vue'
    import Filings from '@/components/Filings/Filings.vue'
    import SideBar from './SideBar.vue'

    defineOptions({
        name: 'Layout'
    })
</script>

<template>
    <Nav></Nav>
    <RouterView/>
    <Filings />
    <SideBar />
    <div class="mask"></div>
</template>