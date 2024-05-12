import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
    baseURL: '/api',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.response.use((res:AxiosResponse) => {
    
    const { code, msg, data } = res.data
    if (code === 200) {
        return data
    }else if (code === 500) {
        ElMessage.error(msg)
        return Promise.reject(res)
    }
    
},(error:any)=>{
	//处理错误响应
	return Promise.reject(error)
})

export default instance