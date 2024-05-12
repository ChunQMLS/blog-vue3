<script setup lang="ts">
    import {ref,reactive,computed,onMounted} from 'vue'
    import type { CalendarTrends,CalendarMonth,CalendarDay,CalendarWeek } from '@/types/home'
    import { getCalendarTrends } from '@/request/api/homeApi'
    import { useRouter } from 'vue-router'

    defineOptions({
        name: 'Calendar'
    })

    // 公共方法
    // 获取月份的天数
    const getDays = (year:number,month:number):number=> new Date(year,month,0).getDate()
    // 判断当日是周几
    const getWeek = (year:number,month:number,day:number):number=> new Date(year,month-1,day).getDay()
    // 根据文章数量选择类名
    let bgColor = ['bg-none','bg-blue','bg-gray','bg-green','bg-yellow','bg-red']

    const getDayBgClass = (date:string,count:number | undefined) => {
        if (count === undefined) {
            return
        }
        if (count === -1) {
            return bgColor[0]
        }else if (count === 0) {
            const targetDate = Date.parse(date)
            const currentDate = Date.now()
            return targetDate !== currentDate && targetDate < currentDate ? bgColor[1] : bgColor[2]
        }else if(count <= 5) {
            return bgColor[3]
        }else if(count <= 10) {
            return bgColor[4]
        }else {
            return bgColor[5]
        }
    }

    // 获取年
    let year = ref(new Date().getFullYear())
    // 定义日历数据
    const calendarTrends = ref<CalendarTrends[]>([])

    const calendarData = computed(() => {
        return calendarTrends.value.filter( item => item.date.split('-')[0] === year.value.toString())
    })

    // 获取月数组
    const getCalendarMonths = ()=>{
        let monthList:Array<CalendarMonth> = []
        for (let month = 1; month <=12; month++) {
            let days = getDays(year.value,month)
            monthList.push({
                month:month,
                days:days
            })
        }
        return monthList
    }

    const calendarMonths:Array<CalendarMonth> = reactive<Array<CalendarMonth>>(getCalendarMonths())

    

    // 获取日期数组
    const calendarDays = computed<Array<CalendarDay>>(()=>{
        let dateList:Array<CalendarDay> = []
        let i = 0
        for (let month = 1; month <=12; month++) {
            let days = getDays(year.value,month)
            for (let day = 1; day <=days; day++){
                const date = `${year.value}-${month.toString().length === 1 ? '0'+month : month}-${day.toString().length === 1 ? '0'+day : day}`
                const tempData = calendarData.value[i]
                if (tempData && tempData.date === date) {
                    dateList.push({
                        date: tempData.date,
                        week: getWeek(year.value,month,day),
                        count: tempData.count
                    })
                    i++
                }else {
                    dateList.push({
                        date: date,
                        week: getWeek(year.value,month,day),
                        count: 0
                    })
                }
            }
        }
        return dateList
    })

    // 对日期数组按周分类
    const weekString = ['日','一','二','三','四','五','六']

    const handleWeekList = (weekList:Array<CalendarWeek>,daysLength:number)=>{
        let firstDayWeek = getWeek(new Date().getFullYear(),1,1)
        const nullDateObj = {
            date: '',
            week: -1,
            count: -1
        }
        for (let i = 0; i < firstDayWeek; i++) {
            weekList[i].days.unshift(nullDateObj)
        }
        let lastDays = (daysLength + firstDayWeek)%7
        if (lastDays>0) {
            for (let i = 6; i > lastDays-1; i--) {
                weekList[i].days.push(nullDateObj)
            }
        }
    }

    const weekList = computed(()=>{
        let weekList:Array<CalendarWeek> = []
        for (let week = 0; week <= 6; week++) {
            let weekObj:CalendarWeek = {
                week: weekString[week],
                weekCode: week,
                days: calendarDays.value.filter(item => item.week == week)
            }
            weekList.push(weekObj)
        }
        handleWeekList(weekList,calendarDays.value.length)
        return weekList
    })

    onMounted(()=>{
        getCalendarTrends().then( res => {
            console.log(res)
            calendarTrends.value = res
        })
    })

    const router = useRouter()

    const handleJump = (date:string) => {
        router.push({name: 'Archives',query:{date}})
    }
    
</script>

<template>
    <div class="calendar-box container" 
        v-loading="calendarTrends.length > 0 ? false : true"
        element-loading-background="rgba(122, 122, 122, 0.8)">
        <div class="calendar-table">
            <table>
                <thead>
                    <tr>
                        <td :style="{'width': '20px'}"></td>
                        <td 
                        :colspan="month.month === 1 ? Math.ceil((getWeek(year,month.month,1)+month.days)/7) : Math.ceil((getWeek(year,month.month,1)+month.days)/7) - 1" 
                        v-for="month in calendarMonths" :key="month.month">{{ month.month + '月' }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="calendar-week" v-for="item in weekList" :key="item.weekCode">
                        <td class="calendar-week-box">
                            <span class="calendar-week-text" 
                            :style="item.weekCode%2 === 0 ? {'clip-path': 'Circle(0)'} : {'clip-path': 'None'}"
                            >{{ item.week }}</span>
                        </td>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            :show-after="50"
                            :hide-after="50"
                            :disabled="day.count === -1 ? true : false"
                            :content="`${day.date}更新文章${day.count}篇`"
                            placement="top"
                            v-for="(day, index) in item.days" :key="index">
                            <td class="calendar-day" :class="getDayBgClass(day.date,day.count)" @click="handleJump(day.date)"></td>
                        </el-tooltip>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="calendar-tip">
            <div>
                <span>{{ year + '年博客更新动态' }}</span>
            </div>
            <div class="color-bar">
                <div class="color-bar-tip">
                    <div class="color-box bg-blue"></div><span> ~0</span>
                </div>
                <div class="color-bar-tip">
                <div class="color-box bg-green"></div><span> 1~5</span>
                </div>
                <div class="color-bar-tip">
                    <div class="color-box bg-yellow"></div><span> 5~10</span>
                </div>
                <div class="color-bar-tip">
                    <div class="color-box bg-red"></div><span> >10</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 10px;
}
.calendar-box {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    @include respond-to() {
        display: none;
    }
}
.calendar-table {
    max-width: 100%;
    overflow-y: hidden;
    overflow-x: auto;

    table {
        width: max-content;
        overflow-y: hidden;
        overflow-x: auto;
        border-spacing: 4px;

        th,td {
            padding: 0px;
            border-collapse: separate;
        }
    }
}

.calendar-week {
    height: 11px;
}
.calendar-week-box {
    position: relative;
}
.calendar-week-text {
    position: absolute;
    bottom: -4px;
}
.calendar-day {
    fill: #ebedf0;
    width: 11px;
    border-radius: 2px;
    outline: 1px solid rgba(27, 31, 35, 0.06);
    outline-offset: -1px;
    cursor: pointer;
}
.calendar-tip {
    display: flex;
    justify-content: space-between;
}
.color-bar {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.color-bar-tip {
    display: flex;
    align-items: center;
    margin-right: 10px;
}
.color-box {
    width: 11px;
    height: 11px;
    border-radius: 2px;
    outline: 1px solid rgba(27, 31, 35, 0.06);
    outline-offset: -1px;
    margin-right: 2px;
}
.bg-none {
    outline: none;
    outline-offset: 0;
}
.bg-blue {
    background-color: #99CCCC;
}
.bg-gray {
    background-color: #cdcdcd;
}
.bg-red {
    background-color: #FF6666;
}
.bg-yellow {
    background-color: #FF9900;
}
.bg-green {
    background-color: #99CC33;
}
</style>