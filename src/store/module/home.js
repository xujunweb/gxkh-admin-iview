import { getIndexData } from '@/api/home'
import {getCookies} from '@/libs/util'
import config from '../../config'
export default {
  state: {
    indexData: {},
    inforCardData:[
      { title: '总用户量', icon: 'md-person-add', count: 0, color: '#2d8cf0' },
      { title: '总订单数', icon: 'md-reorder', count: 0, color: '#19be6b' },
      { title: '在用设备数', icon: 'md-cog', count: 0, color: '#ff9900' },
      { title: '使用总时间(h)', icon: 'md-clock', count: 0, color: '#ed3f14' }
    ],
    source:'',
  },
  getters: {
    getIndexData (state) {
      return state.indexData
    },
    getInforCardData(state){
      var access = JSON.parse(getCookies('access'))[0] === 1
      return access?state.inforCardData:[]
    }
  },
  mutations: {
    setIndexData (state, data) {
      state.indexData = data
    },
    // 导出的excl表
    UPDATE_SOURCE (state, arg) {
      state.source = arg
    },
  },
  actions: {
    // 获取首页信息
    getIndexData ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getIndexData().then(res => {
          console.log('首页信息-----',res.data)
          const data = res.data.data
          commit('setIndexData', data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    exportOrderToExcel (store, args) {
      console.log('进来了')
      var params = ''
      for (let key in args){
        params += key+'='+args[key]+'&'
      }
      params.substring(0,params.length-1)
      window.open(config.baseUrl.pro+'mobile/lockOrder/exportLockOrderData?'+params)
    },
  }
}
