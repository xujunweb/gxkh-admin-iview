import axios from '@/libs/api.request'
//获取订单列表
export const getOrderList = (data) => {
  var agency_user_id = app.$store.state.user.token
  if (app.$store.state.user.acc.indexOf(+agency_user_id)>-1){
    agency_user_id = data.agency_user_id
  }
  return axios.request({
    url: 'mobile/lockOrder/pageByLockOrder',
    data: {
      ...data,
      agency_user_id:agency_user_id,
    },
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
