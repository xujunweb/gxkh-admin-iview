import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
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
  return axios.request({
    url: 'getUserList',
    data: data,
    method: 'post'
  })
}
// 修改指定配置信息
export const updateAppointInfo = (key,value) => {
  return axios.request({
    url: 'mobile/dictionary/updateByKey',
    data: {key:key,value:value},
    method: 'post'
  })
}
// 获取指定的配置信息
export const getAppointInfo = (key) => {
  return axios.request({
    url: 'mobile/dictionary/getByKey',
    data: {key:key},
    method: 'post'
  })
}
// 获取所有的配置信息
export const getAllinfo = () => {
  return axios.request({
    url: 'mobile/dictionary/listByDictionary',
    data: {},
    method: 'post'
  })
}
