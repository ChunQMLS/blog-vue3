<script setup lang="ts">
    import { fullSearch } from '@/request/api/articleApi'
    import { FullSearch } from '@/types/article'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const nav = [
        {
            path: '/',
        },
        {
            path: '/category',
        },
        {
            path: '/lable',
        },
        {
            path: '/archives/1'
        },
        {
            path: '/gallery'
        },
        {
            path: '/friendshipLink'
        },
        {
            path: '/messageBoard'
        },
        {
            path: '/about'
        }
    ]

    const router = useRouter()

    const handleJump = (path:Object) => {
        router.push(path)
        drawer.value = false
    }

    const drawer = ref(false)

    const search = ref(false)

    const searchInput = ref('')

    const searchResults = ref<FullSearch[]>([])

    const handleSearch = () => {
        fullSearch({keyword:searchInput.value}).then( res => {
            searchResults.value = res
        })
    }

    const handleJumpBlog = (id:string) => {
        router.push({name: 'Blog',params:{id}})
        search.value = false
    }
</script>

<template>
    <header>
        <nav>
            <div class="station-name" @click="handleJump(nav[0])">Yukioo的小破站</div>
            <div class="nav-menu">
                <div class="nav-search">
                    <div class="tag-item" @click="search = true"><i class="fa fa-fw fa-search"></i></div>
                </div>
                <div class="nav-tags">
                    <div class="tag-item" @click="handleJump(nav[0])"><i class="fa fa-fw fa-home"></i><span>主页</span></div>
                    <div class="tag-item" @click="handleJump(nav[1])"><i class="fa fa-fw  fa-folder-open"></i><span>分类</span></div>
                    <div class="tag-item" @click="handleJump(nav[2])"><i class="fa fa-fw  fa-tag"></i><span>标签</span></div>
                    <div class="tag-item" @click="handleJump(nav[3])"><i class="fa fa-fw  fa-sticky-note"></i><span>文章</span></div>
                    <div class="tag-item" @click="handleJump(nav[4])"><i class="fa fa-fw  fa-image"></i><span>图库</span></div>
                    <div class="tag-item" @click="handleJump(nav[5])"><i class="fa fa-fw  fa-link"></i><span>友链</span></div>
                    <div class="tag-item" @click="handleJump(nav[6])"><i class="fa fa-fw fa-envelope"></i><span>留言板</span></div>
                    <div class="tag-item" @click="handleJump(nav[7])"><i class="fa fa-fw fa-heart"></i><span>关于</span></div>
                </div>
                <div class="nav-hidden-tags">
                    <div class="tag-item" @click="drawer = true"><i class="fa fa-fw fa-lg fa-bars"></i></div>
                </div>
            </div>
            <el-drawer v-model="drawer" :with-header="false" size="50%">
                <div class="tag-item" @click="handleJump(nav[0])"><i class="fa fa-fw fa-home"></i><span>主页</span></div>
                <div class="tag-item" @click="handleJump(nav[1])"><i class="fa fa-fw  fa-folder-open"></i><span>分类</span></div>
                <div class="tag-item" @click="handleJump(nav[2])"><i class="fa fa-fw  fa-tag"></i><span>标签</span></div>
                <div class="tag-item" @click="handleJump(nav[3])"><i class="fa fa-fw  fa-sticky-note"></i><span>文章</span></div>
                <div class="tag-item" @click="handleJump(nav[4])"><i class="fa fa-fw  fa-image"></i><span>图库</span></div>
                <div class="tag-item" @click="handleJump(nav[5])"><i class="fa fa-fw  fa-link"></i><span>友链</span></div>
                <div class="tag-item" @click="handleJump(nav[6])"><i class="fa fa-fw fa-envelope"></i><span>留言板</span></div>
                <div class="tag-item" @click="handleJump(nav[7])"><i class="fa fa-fw fa-heart"></i><span>关于</span></div>
            </el-drawer>
        </nav>
    </header>
    <div v-show="search" class="search">
        <div class="container search-result">
            <div class="search-header">
                <span>搜索</span>
                <i class="fa fa-fw fa-lg fa-close" @click="search = false"></i>
            </div>
            <el-input v-model="searchInput"  @change="handleSearch"/>
            <el-divider />
            <div class="search-result-list">
                <div class="result-item" v-for="(result, index) in searchResults" :key="index" @click="handleJumpBlog(result.id)">
                    <div class="result-item-title">
                        <span>{{ result.title }}</span>
                    </div>
                    <div class="result-item-content">
                        <span>{{ result.sentence }}...</span>
                    </div>
                </div>
            </div>
            <el-divider />
            <div class="search-tip" v-show="searchInput !== ''">
                {{ searchResults.length === 0 ? `未查找到相关文章` : `共找到 ${searchResults.length} 篇文章` }}
            </div>
        </div>
        <div class="mask" @click="search = false"></div>
    </div>
</template>

<style scoped lang="scss">
header {
    margin-bottom: 10px;
    height: 60px;

    nav {
        width: 100%;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        text-align: center;
        font-size: 16px;
        overflow: hidden;
        background: var(--theme-main-color);
        border-radius: 0 0 10px 10px;
        opacity: 0.9;
        z-index: 1000;
        padding: 0 30px;

        @include respond-to {
            padding: 0 20px;
        }

        .station-name {
            font-weight: 1000;
            font-size: 1.3rem;
            cursor: pointer;
        }

        .nav-menu {
            display: flex;

            .nav-tags {

                display: flex;

                @include respond-to {
                    display: none;
                }
            }

            .nav-hidden-tags {
                display: none;

                @include respond-to {
                    display: block;
                }
            }
        }

    }
}
.tag-item {
    cursor: pointer;
    padding-left: 10px;
    font-size: 1rem;
}
.container {
    padding: 10px 20px;
}
.search-result {
    position: fixed;
    top: 10%;
    left: 50%;
    margin-left: -300px;
    background-color: var(--theme-main-color);
    width: 600px;
    z-index: 2024;

    @include respond-to {
        top: 0;
        left: 0;
        margin-left: 0;
        width: 100%;
        height: 100%;
    }

    .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.3rem;
        font-weight: 700;

        span {
            color: var(--word-third-color);
        }

        i {
            cursor: pointer;
        }
    }

    .search-result-list {
        overflow-y: overlay;
        max-height: calc(80vh - 200px);

        .result-item {
            position: relative;
            margin-left: 30px;
            cursor: pointer;

            .result-item-title {
                font-weight: 700;
                font-size: 0.95rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .result-item-content {
                font-size: 0.9rem;
                line-height: 1.5;
            }

        }

        .result-item:hover {
            color: #f97a35;
        }

        .result-item::before {
            position: absolute;
            top: 15%;
            left: -27px;
            width: 8px;
            height: 8px;
            border: 3px solid var(--fill-main-color);
            border-radius: 50%;
            background: #fff;
            content: '';
        }

        
    }

    .search-tip {
        font-size: 0.9rem;
    }
}
.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
</style>

<style lang="scss">
.el-drawer {
    background-color: var(--theme-second-color);
    
    .tag-item {
        font-size: 1.1rem;
        margin-bottom: 10px;
    }
}
.search {
    .el-input__wrapper {
        border-radius: 20px;
        border: 1px solid var(--fill-main-color);
    }
}
</style>