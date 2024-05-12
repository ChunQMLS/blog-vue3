<script setup lang="ts">
import { useThemeStore } from '@/store/global'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const { changeTheme } = useThemeStore()

const goTop = () => {
    scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

const sideShow = ref(false)

const handleScroll = () =>{
    if (document.documentElement.scrollTop > 100 && !sideShow.value) {
        sideShow.value = true
    }else if (document.documentElement.scrollTop <= 100 && sideShow.value) {
        sideShow.value = false
    }
}

onMounted(() => {
    window.addEventListener('scroll',handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll',handleScroll)
})

</script>

<template>
    <div id="func-side" :class="{'side-show': sideShow}">
        <div class="darkmode button" @click="changeTheme" title="亮暗模式切换">
            <i class="fa fa-fw fa-lg fa-adjust"></i>
        </div>
        <div class="go-up button" title="置顶" @click="goTop">
            <i class="fa fa-fw fa-arrow-up"></i>
        </div>
    </div>
</template>

<style scoped lang="scss">
#func-side {
    position: fixed;
    right: -50px;
    bottom: 50px;

    .button {
        display: flex;
        width: 35px;
        height: 35px;
        border-radius: 5px;
        background-color: var(--fill-main-color);
        color: var(--word-title-color);
        margin-bottom: 5px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .button:hover {
        background-color: #f97a35;
    }
}
.side-show {
    transform: translate(-60px,0);
}
</style>