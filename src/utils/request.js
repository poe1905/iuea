/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
// import jsonBig from 'json-bigint'// 引入大数字处理模块
// import { gettoken } from '@/utils/gettoken.js'
// import store from '@/store'

// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL : 'http://ttapi.research.itcast.cn/mp/v1_0/'
})
export const http = axios.create({
  baseURL: '/api' // 基础路径
  // baseURL: 'http://127.0.0.1:3000' // 基础路径
})
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
// request.defaults.transformResponse = [function (data) {
  // try {
  //   return jsonBig.parse(data)
  // } catch (data) {
  //   return {}
  // }
// }]
// request.headers = {
//   Authorization: `Bearer ${gettoken('token')}`
// }
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // const user = store.state.token
    // if (user) {
    //   // config.headers.Authorization = `Bearer ${user.token}`
    // }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default request
