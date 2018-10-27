import axios from '@/libs/api.request'
//获取设备列表
export const getDeviceList = ({pageNum, pageSize,lock_no,qr_code_no,device_no,lock_mac,state}) => {
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
    },
    headers:{
      "ticket":app.$store.state.user.userId
    },
    method: 'post'
  })
}

