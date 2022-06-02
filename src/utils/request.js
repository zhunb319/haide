import axios from 'axios'
import store from '@/store'
import router from '../router'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent

    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = 'Bearer ' + getToken()
      config.headers['X-Auth-Token'] = '018E42A3D1CDA84117E080D4B7E2778D'
      // config.headers['token'] = getToken()
    }
    // if (config['content-type']) {
    //   config.headers[config.method]['Content-Type'] = config['content-type'] // application/json; charset=utf-8'
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response.data,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    return res
    /*
    if (res.state !== 'success') {
      // Message({
      //   message: res.message || 'error',
      //   type: 'error',
      //   duration: 3 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (response.status === 401) {
      //   // 请自行在引入 MessageBox
      //   // import { Message, MessageBox } from 'element-ui'
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      return res.
      // return Promise.reject('error')
    } else {
      return response.data
    }
    */
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response && error.response.status === 401) {
      // token过期，跳转至登录页面
      // removeToken()
       
    } else if (error.response && error.response.status == 400) {
      // Message({
      //   message: '400错误',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    } else {
      // Message({
      //   message: error.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    }
    return Promise.reject(error)
  }
)

export default service
