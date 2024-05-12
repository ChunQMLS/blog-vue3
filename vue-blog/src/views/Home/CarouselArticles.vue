<script setup lang="ts">
    import { ArticleDir } from '@/types/article'
    import { useRouter } from 'vue-router'
    import ImageBase from '@/config/config'
    
    defineOptions({
        name:'CarouselArticles'
    })

    const imageFormat = '?x-oss-process=image/resize,m_fill,h_200,w_200/format,webp'

    const { articles } = defineProps<{articles:ArticleDir[]}>()

    const router = useRouter()

    const handleJump = (id:string) => {
        router.push({name: 'Blog',params:{id}})
    }

</script>

<template>
    <div class="block container">
        <el-carousel direction="vertical" :autoplay="true">
            <el-carousel-item v-for="(item,index) in articles" :key="index">
                <div class="lantern-slide-album">
                    <div class="lantern-slide-item" @click="handleJump(item.id)">
                        <div class="lantern-slide-image">
                            <img :src="ImageBase + item.image + imageFormat" alt="">
                        </div>
                        <div class="lantern-slide-info">
                            <div class="lantern-slide-date">{{item.releasedate}}</div>
                            <div class="lantern-slide-theme">{{item.title}}</div>
                            <div class="lantern-slide-intro" :title="item.intro">{{item.intro}}</div>
                        </div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped lang="scss">
.block {
    width: 100%;
    padding-left: 0;
}
.container {
    padding: 10px;
}
.lantern-slide-album {
    display: flex;
    position: relative;
}
.lantern-slide-item {
    display: flex;
    align-items: center;
    width: 100%;
    position: absolute;
    cursor: pointer;
}
.lantern-slide-image {
    width: 240px;
    height: 200px;
    padding: 0px 20px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @include respond-to {
        width: 160px;
        height: 120px;
    }
}
.lantern-slide-info {
    flex: 1 0 0;
    padding-right: 50px;
    padding-left: 50px;
    overflow: hidden;
    @include respond-to {
        padding-left: 0px;
    }
}
.lantern-slide-date {
    font-size: 1.1rem;
}
.lantern-slide-theme {
    font-size: 1.3rem;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 10px 0;
    @include respond-to {
        font-size: 1.1rem;
        margin: 2px 0;
        white-space: nowrap;
    }
}
.lantern-slide-intro {
    font-size: 0.9rem;
    text-overflow: ellipsis;
    line-clamp: 2;
    overflow: hidden;
    @include respond-to {
        font-size: 1rem;
        white-space: nowrap;
    }
}
</style>

<style lang="scss">
.el-carousel__container {
    height: 200px;

    @include respond-to {
        height: 120px;
    }
}
</style>