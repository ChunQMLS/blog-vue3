import { getToken, isExistToken, removeToken, setToken } from '@/utils/token'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const instance = axios.create({
    baseURL: '/api',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})


const router = useRouter()

// 请求拦截器  添加token refreshToken
instance.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    config.headers = config.headers || {}
    if (isExistToken()) {
        const { token, refreshToken} = getToken()
        config.headers.token = token
        config.headers.refreshToken = refreshToken
    }
    return config
},(error:any) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((res:AxiosResponse)=>{
    const { code, msg, data } = res.data
    if (code == 200) {
        return data
    }else if(code == 401) {
        // 登录过期
        removeToken()
        router.push('/admin/login')
        return Promise.reject(res)
    }else if(code == 402) {
        setToken(data)
        return Promise.reject(res)
    }else if (code === 500) {
        ElMessage.error(msg)
        return Promise.reject(res)
    }else {
        return Promise.reject(res)
    }
},(error:any)=>{
	//处理错误响应
	return Promise.reject(error)
})

export default instance