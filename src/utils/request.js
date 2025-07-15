import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建 axios 实例对象
const request = axios.create({
    baseURL: '/api',
    timeout: 600000
})

// axios 的响应 response 拦截器
request.interceptors.response.use(
    (response) => { // 成功回调
        return response.data
    },
    (error) => {    // 失败回调
        if (error.response.status === 401) {
            // 提示信息
            ElMessage.error('登陆超时，请重新登陆');

            // 跳转到登录页面
            router.push('/login');
        } else {
            ElMessage.error('接口访问异常');
        }
        return Promise.reject(error)
    }
)

// axios 的请求 request 拦截器 - 获取 localStorage 中的 token，在请求头中增加 token 请求头
request.interceptors.request.use(
    (config) => {   // 成功回调
        const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        if (loginInfo && loginInfo.token) {
            config.headers.token = loginInfo.token;
        }
        return config
    },
    (error) => {    // 失败回调
        return Promise.reject(error)
    }
)

export default request