import {mapGetters} from 'vuex'
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
      user_id:mapGetters({'infor':'getUserInfo'}).infor
    },
    method: 'post'
  })
}
