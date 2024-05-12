<script setup lang="ts">
import { FriendLink } from '@/types/friendLink'

defineOptions({
    name: 'FriendshipLinkItem'
})

withDefaults(
    defineProps<{
        title: string,
        readMe: string,
        data: FriendLink[]
    }>(),
    {
        title: '',
        readMe: ''
    }
)

</script>

<template>
    <div class="flink">
        <div class="flink-title">{{ title }}</div>
        <div class="flink-readme">{{ readMe }}</div>
        <div class="flink-list">
            <div class="flink-list-item" v-for="(item, index) in data" :key="index">
                <a :href="item.link">
                    <div class="flink-item-icon">
                        <img v-lazy="item.avatar" alt="">
                    </div>
                    <div class="flink-item-name">{{ item.name }}</div>
                    <div class="flink-item-desc" :title="item.descr">{{ item.descr }}</div>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.flink {
    margin: 20px 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .flink-title {
        font-weight: 700;
        font-size: 1.4rem;
    }

    .flink-list {
        overflow: auto;
        padding: 10px 10px 0;
        text-align: center;

        .flink-list-item {
            position: relative;
            float: left;
            overflow: hidden;
            margin: 15px 10px;
            width: calc(100% / 3 - 20px);
            height: 90px;
            border-radius: 8px;
            line-height: 17px;
            -webkit-transform: translateZ(0);
            transition: 0.5s;

            @media screen and (max-width: 1200px) {
                width: calc(100% / 2 - 20px);
            }

            @include respond-to {
                $count: 2;
            }

            @media screen and (max-width: 600px) {
                width: calc(100% - 20px);
            }

            .flink-item-icon {
                float: left;
                overflow: hidden;
                margin: 15px 10px;
                width: 60px;
                height: 60px;
                border-radius: 35px;
            }
            .flink-item-name {
                padding: 16px 10px 0 0;
                height: 40px;
                font-weight: 700;
                font-size: 1.43em;
            }
            .flink-item-desc {
                padding: 16px 10px 16px 0;
                height: 50px;
                font-size: .93em;
            }
            .flink-item-name,.flink-item-desc {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .flink-list-item:hover {
            background-color: rgba(73,177,245,0.7);
        }
    }
}
</style>