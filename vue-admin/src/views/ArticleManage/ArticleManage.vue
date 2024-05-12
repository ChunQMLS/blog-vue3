<script setup lang="ts">
    import { onBeforeMount, ref } from 'vue'
    import Recommend from '@/views/ArticleManage/Recommend.vue'
    import Category from '@/views/ArticleManage/Category.vue'
    import BlogEditor from '@/views/ArticleManage/BlogEditor.vue'
    import { deleteArticleAll, deleteArticleById, setArticleRecycle, setArticleRecycleMore } from '@/request/api/useArticleApi'
    import { ElMessage } from 'element-plus'
    import { useBlog } from '@/hooks/blog'
    import { useBlogStore } from '@/stores/useBlogStore'
    import { Article, ArticleType } from '@/types/article'

    const { articleData,getArticles,getArticlesWithRecycle } = useBlog()

    const store = useBlogStore()

    const type = ref<ArticleType>('all')
    
    const handleRadioChange = (val:string | number | boolean | undefined) => {
        if (val === 'all') {
            getArticles()
        }else if (val=== 'recycle') {
            getArticlesWithRecycle()
        }
    }

    const search = ref('')

    const handleSearch = (search:string) =>{
        if (type.value === 'all') {
            getArticles(1,search)
        }else if (type.value === 'recycle') {
            getArticlesWithRecycle(1,search)
        }
    }

    const handleCurrentChange = (page:number) => {
        articleData.value.currentPage = page
    }

    const isGlobalDelete = ref(false)

    const handleDelete = (row:Article)=>{
        if(type.value === 'all'){
            setArticleRecycle({id:row.id,recycle:row.recycle}).then( () => {
                getArticlesWithRecycle(articleData.value.currentPage)
            })
        }else if(type.value === 'recycle') {
            deleteArticleById({id:row.id}).then(() => {
                getArticles(articleData.value.currentPage)
            })
        }
    }

    const handleRestore = (row:Article) => {
        setArticleRecycle({id:row.id,recycle:row.recycle}).then( () => {
            getArticlesWithRecycle(articleData.value.currentPage)
        })
    }

    const selectionArticles = ref<Article[]>([])

    const handleSelectionChange = (val:Article[]) => {
        selectionArticles.value = val
        if (val.length) {
            isGlobalDelete.value = true
        }else {
            isGlobalDelete.value = false
        }
    }

    const handleDeleteAll = () => {
        if(type.value === 'all') {
            setArticleRecycleMore(selectionArticles.value).then(()=>{
                getArticles(articleData.value.currentPage)
            })
        }else if(type.value === 'recycle'){
            deleteArticleAll().then(()=>{
                getArticles(articleData.value.currentPage)
            })
        }
    }

    const isRecommend = ref(false)

    const isCategory = ref(false)

    const isEditor = ref(false)

    const editorId = ref('')

    const handleEdit = (row:Article)=>{
        if (row.id){
            editorId.value = row.id
            isEditor.value = true
        }else {
            ElMessage.error('未知错误')
        }
        
    }

    onBeforeMount(() => {
        getArticles()
        if (store.categoryLables.length === 0) {
            store.getCategoryLables()
        }
    })
</script>

<template>
    <div class="article-page container-box">
        <div class="article-option container box">
            <el-radio-group v-model="type" @change="handleRadioChange">
                <el-radio-button value="all">全部</el-radio-button>
                <el-radio-button value="recycle">回收站</el-radio-button>
            </el-radio-group>
            <div>
                <el-button v-show="isGlobalDelete" type="danger" @click="handleDeleteAll">删除</el-button>
                <el-button @click="isRecommend = true">推荐</el-button>
                <el-button @click="isCategory = true">分类/标签</el-button>
                <el-button @click="isEditor = true" type="success">写文章</el-button>
            </div>
        </div>
        <div class="article-table container box">
            <el-table :data="articleData.list" @selection-change="handleSelectionChange" style="width: calc(100% -10px);margin-bottom: 20px;" :height="500" :max-height="500">
                <el-table-column type="selection" width="55" />
                <el-table-column label="日期" prop="releasedate" width="150" sortable/>
                <el-table-column label="标题" prop="title" width="300" show-overflow-tooltip />
                <el-table-column label="分类" prop="category" width="200" />
                <el-table-column label="标签" prop="lable" width="200" />
                <el-table-column align="right" width="250">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="搜索" @change="handleSearch"/>
                    </template>
                    <template #default="scope">
                        <el-button v-show="type === 'all'" size="small" @click="handleEdit(scope.row)"
                        >编辑</el-button
                        >
                        <el-button v-show="type === 'recycle'" size="small" @click="handleRestore(scope.row)"
                        >还原</el-button
                        >
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)"
                        >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" 
                :pager-count="5" 
                :page-size="articleData.pageSize"
                :total="articleData.size" 
                @current-change="handleCurrentChange"
                style="display: flex;justify-content: center;" />
        </div>
    </div>
    <Recommend v-model:visible="isRecommend"/>
    <Category v-model:visible="isCategory" />
    <BlogEditor v-model:visible="isEditor" v-model:id="editorId" />
</template>

<style scoped>
.box {
    margin: 20px 0px;
    padding: 10px;
}
.article-option {
    display: flex;
    justify-content: space-between;
}
</style>