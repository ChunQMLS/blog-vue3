<template>
    <main>
        <div class="main-top">
            <slot name="top"></slot>
        </div>
        <div class="main-center">
            <div class="main-left">
                <slot name="left"></slot>
            </div>
            <div class="main-right">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="main-bottom">
            <slot name="bottom"></slot>
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    max-width: 1200px;

    .main-left {
        flex: 0.75;
    }
    
    .main-right {
        flex: 0.25;
        padding-left: 10px;
        @include respond-to {
            padding-left: 0px;
        }
    }

    .main-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
        @include respond-to {
            flex-direction: column;
        }
    }

}
</style>