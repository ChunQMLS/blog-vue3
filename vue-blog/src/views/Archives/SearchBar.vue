<script setup lang="ts">
    import { ref,computed,watch } from 'vue'
    import { type Category } from '@/types/article'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const { categoryOptions } = defineProps({
        categoryOptions: {
            type: Array<Category>,
            default: []
        }
    })

    const checkCategory = ref<string>(route.query.category?.toString() || '')

    const checkLable = ref<string>(route.query.lable?.toString() || '')

    const categoryList = computed<Category[]>(()=>{
        if(!checkCategory.value) {
            return categoryOptions
        }
        return categoryOptions.filter( item => item.category === checkCategory.value)
    })

    function clearCategory(){
        checkLable.value = ''
    }

    const dateRange = ref<[string,string]>([route.query.date?.toString() || '',route.query.date?.toString() || ''])

    const emit = defineEmits<{
        search: [category: string,lable: string, dateRange: string[] | null]
    }>()

    watch(
        checkLable,
        () => {
            if(checkCategory.value) {
                return
            }
            const category = categoryOptions.find((category)=>{
                const isFind = category.lables.some( lable => lable.lable === checkLable.value)
                if(isFind) {
                    return  category
                }
            })
            checkCategory.value = category?.category || ''
        },
        {immediate:true}
    )

    watch(
        [checkCategory,checkLable,dateRange],
        ()=>{
            emit('search',checkCategory.value,checkLable.value,dateRange.value)
        },
        {immediate:true}
    )
</script>

<template>
    <div class="search-bar container">
        <el-select clearable v-model="checkCategory" @clear="clearCategory" placeholder="选择分类" :style="{flex: 0.2,minWidth: '100px'}">  
            <el-option
                v-for="item in categoryOptions"
                :key="item.category"
                :lable="item.category"
                :value="item.category"
            />
        </el-select>
        <el-select clearable v-model="checkLable" placeholder="选择标签" :style="{flex: 0.2,minWidth: '100px'}">
            <el-option-group
                v-for="category in categoryList"
                :key="category.category"
                :label="category.category"
            >
                <el-option
                    v-for="item in category.lables"
                    :key="item.lable"
                    :label="item.lable"
                    :value="item.lable"
                />
            </el-option-group>
        </el-select>
        <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            value-format="YYYY-MM-DD"
            start-placeholder="开始结束"
            end-placeholder="结束日期"
            size="default"
            :style="{flex: 0.4,minWidth: '200px',width: '100%'}"
        />
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 10px;
}
.search-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;

    @include respond-to {
        flex-direction: column;
        align-items: flex-start;
        >* {
            margin-bottom: 10px;
        }
    }
}
</style>