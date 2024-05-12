<script setup lang="ts">
    import { ref,onBeforeMount } from 'vue'
    import { User,Lock } from '@element-plus/icons-vue'
    import { ElMessage,CheckboxValueType } from 'element-plus'
    import { login } from '@/request/api/useUserApi'
    import { useRouter } from 'vue-router'
    import { LoginInfo } from '@/types/user'

    const router = useRouter()

    const account = ref<LoginInfo>({
        username: localStorage.getItem('loginUsername') || '',
        password: localStorage.getItem('loginUsername') || ''
    })

    const isCheckd = ref(Boolean(localStorage.getItem('pwdIsCheckd')) || false)

    const checkdHandler = (value: CheckboxValueType) => {
        isCheckd.value = Boolean(value)
        localStorage.setItem('pwdIsCheckd',`${value}`) 
        localStorage.setItem('loginUsername', Boolean(value) ? account.value.username : '')
        localStorage.setItem('loginPassword', Boolean(value) ? account.value.password : '')
    }

    const LoginHandler = () => {
        if (account.value.username != '' && account.value.password != '') {
            login(account.value).then( (res) => {
                localStorage.setItem('token',res.token)
                localStorage.setItem('refreshToken',res.refreshToken)
                router.push('/admin')
            })
        }else {
            ElMessage({
                message: '账号或密码不能为空',
                type: 'error'
            })
        }
    }

    onBeforeMount(()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    })

</script>

<template>
    <div class="page">
        <div class="login-box container">
            <div class="manage-title">Yukioo的后台</div>
            <el-input 
                v-model="account.username" 
                style="width: 240px" 
                placeholder="账号">
                <template #prefix>
                    <el-icon><User /></el-icon>
                </template>
            </el-input>
            <el-input
                v-model="account.password"
                style="width: 240px"
                type="password"
                placeholder="密码"
                show-password>
                <template #prefix>
                    <el-icon><Lock /></el-icon>
                </template>
            </el-input>
            <el-checkbox v-model="isCheckd" @change="checkdHandler">记住密码</el-checkbox>
            <el-button type="primary" round @click="LoginHandler">登录</el-button>
        </div>
    </div>
</template>

<style scoped>
.page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #5BAB80, #F2F8F2 );
}
.login-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 350px;
    padding: 0px 40px;
}
.manage-title {
    text-align: center;
    font-size: 1.4rem;
}
.login-box>* {
    margin: 10px 0px;
}
</style>