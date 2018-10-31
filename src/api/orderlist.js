import axios from '@/libs/api.request'
//获取订单列表
export const getOrderList = ({pageNum, pageSize,user_id,lock_no}) => {
  return axios.request({
    url: 'mobile/lockOrder/pageByLockOrder',
    data: {
      pageNum,
      pageSize,
      user_id,
      lock_no
    },
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
