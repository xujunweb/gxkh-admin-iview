import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: 'mobile/user/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'mobile/user/getUserByUserId',
    data: {
      user_id:token
    },
    headers:{
      "ticket":token
    },
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
// 获取用户列表
export const getUserList = (data) => {
  data.money_lt_zero = data.money_lt_zero == '0'?null:'1'
  return axios.request({
    url: 'mobile/user/pageByUser',
    data: data,
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
// 修改指定配置信息
export const updateAppointInfo = (key,value) => {
  return axios.request({
    url: 'mobile/dictionary/updateByKey',
    data: {key:key,value:value},
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
// 获取指定的配置信息
export const getAppointInfo = (key) => {
  return axios.request({
    url: 'mobile/dictionary/getByKey',
    data: {key:key},
    method: 'post',
    headers:{
      "ticket":app.$store.state.user.token
    }
  })
}
// 获取所有的配置信息
export const getAllinfo = () => {
  return axios.request({
    url: 'mobile/dictionary/listByDictionary',
    data: {},
    method: 'post',
    headers:{
      "ticket":app.$store.state.user.token
    }
  })
}
// 修改用户信息
export const updateUser = (data) => {
  return axios.request({
    url: 'mobile/user/updateByUserId',
    data: data,
    method: 'post',
    headers:{
      "ticket":app.$store.state.user.token
    }
  })
}
