<script setup lang="ts">
    import { insertBlackList,getBlackList,deleteBlackList } from '@/request/api/useCommentApi'
    import { useCommentStore } from '@/stores/useCommentStore'
    import { computed, onBeforeMount, ref } from 'vue'

    const dialogVisible = defineModel<boolean>('visible')

    const store = useCommentStore()

    const getData = () => {
        getBlackList().then( res => {
            blacklist.value = res
        })
    }

    const blacklist = ref<string[]>([])

    const data = computed(() => {
        return blacklist.value.map( email => {
            return {email}
        })
    })

    const inputVal = ref<string>('')

    const handleAdd = () => {
        insertBlackList({email:inputVal.value}).then(() => {
            inputVal.value = ''
            getData()
            store.getComment()
        })
    }

    const handleDelete = (row:Object) => {
        deleteBlackList(row).then(() => {
            getData()
            store.getComment()
        })
    }

    onBeforeMount(() => {
        getData()
    })
</script>

<template>
    <el-dialog
        v-model="dialogVisible"
        title="黑名单"
        width="400"
        destroy-on-close
    >
        <div class="input-box">
            <el-input v-model="inputVal" placeholder="添加邮箱" />
            <el-button
                size="small"
                type="primary"
                @click="handleAdd"
                >添加</el-button>
        </div>
        <el-table
            :data="data"
            height="400">
            <el-table-column label="邮箱" prop="email" show-overflow-tooltip/>
            <el-table-column align="right" width="150">
                    <!-- <template #header>
                        <el-input v-model="search" size="small" placeholder="搜索" @change="handleSearch"/>
                    </template> -->
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
    </el-dialog>
</template>

<style scoped>
.input-box {
    display: flex;
    align-items: center;
}
.input-box>* {
    margin-right: 10px;
}
</style>