<script setup lang="ts">
    import { insertCategory, insertLable } from '@/request/api/useArticleApi'
    import { useBlogStore } from '@/stores/useBlogStore'
    import { Category } from '@/types/article'
    import { ElMessage } from 'element-plus'
    import { ref} from 'vue'

    const dialogVisible = defineModel<boolean>('visible')

    const store = useBlogStore()

    const category = ref<Category>({
        category: ''
    })

    const lable = ref<Category>({
        category: '',
        lable: ''
    })

    const categorySubmit = () => {
        insertCategory(category.value).then( res => {
            store.getCategoryLables()
        })
        init()
        ElMessage({
            message: '分类添加成功',
            type: 'success',
        })
    }

    const lableSubmit = () => {
        insertLable(lable.value).then( res => {
            store.getCategoryLables()
            init()
            ElMessage({
                message: '标签添加成功',
                type: 'success',
            })
        })
    }

    const init = () => {
        category.value.category = ''
        lable.value.category = ''
        lable.value.lable = ''
    }

</script>

<template>
    <el-dialog
        v-model="dialogVisible"
        title="分类/标签"
        width="600"
        destroy-on-close
        @before-close="init"
    >
        <el-row>
            <el-col :span="6"><div>分类</div></el-col>
            <el-col :span="12"><el-input v-model="category.category" placeholder="添加类别" /></el-col>
            <el-col :span="6"><div class="button"><el-button type="primary" @click="categorySubmit">添加</el-button></div></el-col>
        </el-row>
        <el-divider />
        <el-row>
            <el-col :span="6"><div>标签</div></el-col>
            <el-col :span="12">
                <el-select
                    v-model="lable.category"
                    clearable
                    placeholder="选择类别"
                >
                    <el-option
                        v-for="label in store.categoryLables"
                        :label="label.category"
                        :value="label.category || ''"
                    />
                </el-select>
            </el-col>
            <el-col :span="6"></el-col>
        </el-row>
        <el-row>
            <el-col :span="6"></el-col>
            <el-col :span="12"><el-input v-model="lable.lable" placeholder="添加标签" /></el-col>
            <el-col :span="6"><div class="button"><el-button type="primary" @click="lableSubmit">添加</el-button></div></el-col>
        </el-row>
    </el-dialog>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.button {
    display: flex;
    justify-content: center;
}
</style>
