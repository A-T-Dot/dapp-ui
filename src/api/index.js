import axios from 'axios'
// import qs from "qs"
// axios.qs = qs

// webpack replace
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://production/api' : 'http://localhost:7000/'

axios.interceptors.request.use(function (config) {
  // const token = window.AdminToken
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  if (config.method === 'post') {
    config.headers['Content-Type'] = `application/x-www-form-urlencoded`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  const data = response.data
  return data
}, (err) => {
  const e = new Error(err)
  const code = parseInt(String(e).split('code ')[1]) || 500
  let message = 'please try again later'
  return {
    code,
    message
  }
})

export default axios