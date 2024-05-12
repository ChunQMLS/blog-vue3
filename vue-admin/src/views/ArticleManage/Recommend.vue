<script setup lang="ts">
    import { useBlog } from '@/hooks/blog'
    import { setArticleInHome } from '@/request/api/useArticleApi'
    import { RecommendOption } from '@/types/article'
    import { ElMessage, TransferDataItem, TransferKey } from 'element-plus'
    import { computed, onBeforeMount, ref, watch } from 'vue'

    const dialogVisible = defineModel<boolean>('visible')

    const { articles,getArticleAll } = useBlog()

    const data = computed<TransferDataItem[]>(()=>{
        const list:RecommendOption[] = []
        articles.value?.forEach((item)=>{
            list.push({
                key: item.id,
                label: item.title
            })
        })
        return list
    })

    watch(articles,
        () => {
            const inHome = articles.value.filter(item => item.inhome === 1)
            const ids = inHome.map( item => {
                return item.id || ''
            })
            value.value = ids
        }
    )

    const value = ref<string[]>([])

    const filterMethod = (query:string,item: Record<string, any>) => {
        if(item.label.indexOf(query) !== -1) {
            return true
        }
        return false
    }

    const handleSubmit = () => {
        setArticleInHome({ids:value.value}).then((res)=>{
            ElMessage({
                message: '提交成功',
                type: 'success'
            })
            getArticleAll()
        })
    }

    onBeforeMount(() => {
        getArticleAll()
    })

</script>

<template>
    <el-dialog
        v-model="dialogVisible"
        title="首页推荐"
        width="600"
        destroy-on-close
    >
        <el-transfer
            v-model="value"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="State Abbreviations"
            :data="data"
            :titles="['文章列表','推荐列表']"
        />
        <template #footer>
        <div class="dialog-footer">
            <el-button type="primary" @click="handleSubmit">
            提交
            </el-button>
        </div>
        </template>
    </el-dialog>
</template>