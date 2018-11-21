import axios from '@/libs/api.request'
//获取订单列表
export const getOrderList = (data) => {
  return axios.request({
    url: 'mobile/lockOrder/pageByLockOrder',
    data: {
      ...data,
      agency_user_id:app.$store.state.user.token==100000000?'':app.$store.state.user.token,
    },
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
