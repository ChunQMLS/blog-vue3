<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useCategoryStore, useMyInfoStore, useBlogInfoStore } from '@/store/global'
import { useThemeStore } from '@/store/global'
import { visit } from '@/request/api/homeApi' 

const themeStore = useThemeStore()

const { getMyInfoHandler } = useMyInfoStore()

const { getCategory } = useCategoryStore()

const { getBlogInfoHandler } = useBlogInfoStore()

onBeforeMount(() => {
  visit()
  themeStore.init()
  getBlogInfoHandler()
  getMyInfoHandler()
  getCategory()
})
</script>

<template>
  <router-view></router-view>
</template>
