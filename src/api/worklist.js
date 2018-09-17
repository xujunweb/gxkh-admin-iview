import axios from '@/libs/api.request'
export const getWorkList = ({pageNum, pageSize, type = '', device_no, fault_type = ''}) => {
  return axios.request({
    url: 'mobile/faultFeedback/pageByFaultFeedback',
    data: {
      pageNum,
      pageSize,
      type,
      device_no,
      fault_type,
      user_id:app.$store.state.user.userId
    },
    headers:{
      "ticket":app.$store.state.user.userId
    },
    method: 'post'
  })
}
