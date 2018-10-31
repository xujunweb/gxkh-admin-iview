import axios from '@/libs/api.request'
//获取首页数据
export const getIndexData = () => {
  return axios.request({
    url: 'mobile/home/indexData',
    data: {},
    headers:{
      "ticket":app.$store.state.user.token
    },
    method: 'post'
  })
}
