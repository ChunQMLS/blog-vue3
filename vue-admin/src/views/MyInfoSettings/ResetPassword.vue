<script setup lang="ts">
    import { ref } from 'vue'
    import { useUserStore } from '@/stores/useUserStore'
    import { ElMessage } from 'element-plus'
    import { resetPassword } from '@/request/api/useUserApi'
    import { useRouter } from 'vue-router'
    import { MyInfo } from '@/types/user'

    const store = useUserStore()
    const router = useRouter()

    let oldPwd = ref('')

    let isEqualOld = ref(false)

    let firstPwd = ref('')

    let secondPwd = ref('')

    let isEqual = ref(false)

    const isEqualHandler = () => {
        if (!(firstPwd.value.length && secondPwd.value.length)) {
            return
        } else if (firstPwd.value == secondPwd.value) {
            isEqual.value = true
        } else {
            ElMessage.error('两次输入的新密码不同！')
            isEqual.value = false
        }
    }

    const equalOldHandler = () => {
        if(oldPwd.value != store.myInfo.password) {
            ElMessage.error('原密码错误，请重新输入！')
            isEqualOld.value = false
        }else {
            isEqualOld.value = true
        }
    }

    const resetPwdHandler = () => {
        
        if (isEqualOld.value && isEqual.value) {
            const account:MyInfo = {
                username: store.myInfo.username,
                password: secondPwd.value
            }
            resetPassword(account).then( res => {
                store.myInfo.password = res.password
                ElMessage({
                    message: '密码修改成功!请重新登录',
                    type: 'success'
                })
                setTimeout(()=>{
                    router.push('/login')
                },1000)
            })
        }else {
            ElMessage.error('请将信息填写完整！')
        }
    }

</script>

<template>
    <div class="box">
        <div class="container reset-pwd">
            <div class="reset-pwd-item">
                <span>原密码: </span>
                <el-input v-model="oldPwd" @change="equalOldHandler" style="width: 300px" placeholder="输入原密码" />
            </div>
            <div class="reset-pwd-item">
                <span>新密码: </span>
                <el-input v-model="firstPwd" @change="isEqualHandler" style="width: 300px" placeholder="Please input" />
            </div>
            <div class="reset-pwd-item">
                <span>再输一次: </span>
                <el-input v-model="secondPwd" @change="isEqualHandler" style="width: 300px" placeholder="Please input" />
            </div>
            <div class="button">
                <el-button type="primary" @click="resetPwdHandler">提交</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
.reset-pwd {
    min-width: 400px;
    padding: 30px;
}
.reset-pwd>* {
    margin-bottom: 20px;
}
.reset-pwd-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.button {
    display: flex;
    justify-content: center;
}
</style>