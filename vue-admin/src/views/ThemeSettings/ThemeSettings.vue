<script setup lang="ts">
import { cancelThemeApply, deleteTheme, getTheme, updateThemeApply } from '@/request/api/useThemeApi'
import { Theme } from '@/types/theme'
import { onBeforeMount, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import ThemeEditor from './ThemeEditor.vue'

const themes = ref<Theme[]>()

const getThemeDate = () => {
    getTheme().then( res => {
        themes.value = res
    })
}

const cancelApplyRow = () => {
    cancelThemeApply().then( () => {
        getThemeDate()
    })
}

const applyRow = (row:Theme) => {
    updateThemeApply({id:row.id}).then(()=>{
        getThemeDate()
    })
}

const deleteRow = (row:Theme) => {
    deleteTheme({id:row.id}).then(() => {
        getThemeDate()
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
    })
}

const isEditor = ref(false)

const theme = ref<Theme>({
    id: '',
    name: '',
    style: '',
    apply: 0
})

watch(
    isEditor,
    () => {
        console.log(isEditor.value)
        if (!isEditor.value) {
            getThemeDate()
            theme.value = {
                id: '',
                name: '',
                style: '',
                apply: 0
            }
        }
    }
)

const onAddItem = () => {
    isEditor.value = true
}

const editorRow = (row:Theme) => {
    theme.value = row
    console.log(theme.value)
    isEditor.value = true
}

onBeforeMount(() => {
    getThemeDate()
})

</script>

<template>
    <div class="container-box">
        <div class="container box">
            <el-table :data="themes" style="width: 100%" max-height="250">
                <el-table-column prop="name" label="主题" fixed="left" show-overflow-tooltip />
                <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button
                        v-if="scope.row.apply"
                        link
                        type="primary"
                        size="small"
                        @click.prevent="cancelApplyRow"
                        >
                    已应用
                    </el-button>
                    <el-button
                        v-else
                        link
                        type="primary"
                        size="small"
                        @click.prevent="applyRow(scope.row)"
                        >
                    应用
                    </el-button>
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="editorRow(scope.row)"
                        >
                        编辑
                    </el-button>
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="deleteRow(scope.row)"
                        >
                        删除
                    </el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-button class="mt-4" style="width: 100%" @click="onAddItem"
                >添加</el-button
            >
            <ThemeEditor v-if="isEditor" v-model="isEditor" :theme="theme"/>
        </div>
    </div>
</template>

<style scoped>
.box {
    margin: 20px 0px;
    padding: 20px;
    min-height: 600px;
}
</style>