import axios from '@/libs/api.request'
//获取订单列表
export const getOrderList = (data) => {
  return axios.request({
    url: 'mobile/lockOrder/pageByLockOrder',
    data: {
      ...data,
    },
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
