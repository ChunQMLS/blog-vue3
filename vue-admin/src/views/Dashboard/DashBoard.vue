<script setup lang="ts">
    import { use } from 'echarts/core'
    import { CanvasRenderer } from 'echarts/renderers'
    import { PieChart,BarChart } from 'echarts/charts'
    import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    DatasetComponent
    } from 'echarts/components'
    import VChart, { THEME_KEY } from 'vue-echarts'
    import { ref, provide, onBeforeMount, computed } from 'vue'
    import { getDiffDay } from '@/utils/utils'
    import { getBlogInfo } from '@/request/api/useBlogInfoApi'
    import { useBlogStore } from '@/stores/useBlogStore'
    import { BlogInfo } from '@/types/blogInfo'
    import { getVisitsByCategory } from '@/request/api/useArticleApi'
    import { BarData } from '@/types/article'

    const store = useBlogStore()

    const blogInfo = ref<BlogInfo>({
        createTime: '',
        visits: 0,
        pv: 0,
        wordNum: 0,
        articleNum: 0,
        commentNum: 0,
        lastUpdateTime: ''
    })

    const pieData = computed(() => {
        return store.categoryLables.map(item => {
            return {
                name: item.category,
                value: item.articleNum,
                lables: item.lables
            }
        })
    })

    const categoryVisits = ref<BarData[]>([])

    const barData = computed(() => {
        return categoryVisits.value.map(item => {
            return [item.visits,item.category]
        })
    })
    
    onBeforeMount(() => {
        getBlogInfoHandler()
        getCategoryHandler()
        getVisitsByCategoryHandler()
    })

    const getBlogInfoHandler = () => {
        getBlogInfo().then( res => {
            blogInfo.value = res
        })
    }

    const getCategoryHandler = () => {
        if (store.categoryLables.length === 0) {
            store.getCategoryLables()
        }
    }

    const getVisitsByCategoryHandler = () => {
        getVisitsByCategory().then( res => {
            categoryVisits.value = res
        })
    }

    // 配置 echarts
    use([
        CanvasRenderer,
        PieChart,
        BarChart,
        TitleComponent,
        TooltipComponent,
        GridComponent,
        VisualMapComponent,
        DatasetComponent
    ])

    provide(THEME_KEY, 'shine')

    const pieOption = computed(() => {
        return {
            title: {
                text: '各分类文章数占比',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    startAngle: 0,
                    endAngle: 360,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    data: pieData.value,
                    tooltip:{
                        formatter: function(param:any) {
                            const tips = []
                            tips.push(`${param.marker} ${param.name} : ${param.value} (${param.percent}%) <br/>`)
                            for (let i = 0; i < param.data.lables.length; i++) {
                                const lable = param.data.lables[i]
                                tips.push(`${lable.lable} : ${lable.articleNum}<br/>`)
                            }
                            return tips.join('')
                        }
                    }
                }
            ]
        }
    })

    const barOption = computed(() => {
        return {
            title: {
                text: '各分类访问量',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            dataset: {
                source: [
                    ['访问量', '分类'],
                    ...barData.value
                ]
            },
            grid: { containLabel: true },
            xAxis: { name: '访问量' },
            yAxis: { type: 'category' },
            series: [
                {
                    type: 'bar',
                    encode: {
                        x: '访问量',
                        y: '分类'
                    }
                }
            ]
        }
    })

</script>

<template>
    <div class="container-box">
        <el-row class="statistic box">
            <el-col class="container statistic-item" :span="5">
                <el-statistic title="已运行时间" :value="getDiffDay(blogInfo.createTime,new Date().toISOString().slice(0,10)) || 0">
                    <template #suffix>天</template>
                </el-statistic>
            </el-col>
            <el-col class="container statistic-item" :span="5">
                <el-statistic title="本站访客数" :value="blogInfo.pv" />
            </el-col>
            <el-col class="container statistic-item" :span="5">
                <el-statistic title="本站总访问量" :value="blogInfo.visits" />
            </el-col>
            <el-col class="container statistic-item" :span="5">
                <el-statistic title="文章数/评论数" :value="blogInfo.articleNum">
                    <template #suffix>{{'/'+blogInfo.commentNum }}</template>
                </el-statistic>
            </el-col>
        </el-row>
    </div>
    <div class="container-box">
        <el-row class="statistic box">
            <el-col class="container statistic-item pie" :span="11">
                <v-chart class="chart" :option="pieOption" autoresize />
            </el-col>
            <el-col class="container statistic-item bar" :span="12">
                <v-chart class="chart" :option="barOption" autoresize />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.box {
    margin: 20px 0px;
    padding: 10px;
}
.statistic {
    display: flex;
    justify-content: space-between;
}
.el-col {
  text-align: center;
}
.statistic-item {
    padding: 20px 0px;
}
.pie,.bar {
    height: 450px;
}
</style>