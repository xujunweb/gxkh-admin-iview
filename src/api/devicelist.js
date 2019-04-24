import axios from '@/libs/api.request'
//获取设备列表
export const getDeviceList = ({pageNum, pageSize,lock_no,qr_code_no,device_no,lock_mac,state,user_id}) => {
  var new_user_id = app.$store.state.user.token
  if (app.$store.state.user.acc.indexOf(app.$store.state.user.token)>-1){
    new_user_id = user_id
  }
  return axios.request({
    url: 'mobile/lockInfo/pageByLockInfo',
    data: {
      pageNum,
      pageSize,
      lock_no,
      qr_code_no,
      device_no,
      lock_mac,
      state,
      user_id:new_user_id,
    },
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
//编辑锁信息
export const updateDevice = (data) => {
  return axios.request({
    url: 'mobile/lockInfo/update',
    data: {
      ...data
    },
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
//编辑锁价格
export const updateDevicePrice = (data) => {
  return axios.request({
    url: 'mobile/lockInfo/updateUnitPrice',
    data: {
      ...data
    },
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
