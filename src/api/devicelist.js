import axios from '@/libs/api.request'
//获取设备列表
export const getDeviceList = ({pageNum, pageSize,lock_no,qr_code_no,device_no,lock_mac,state,user_id}) => {
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
      user_id:user_id||(app.$store.state.user.token==100000000?'':app.$store.state.user.token),
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

