import { getIndexData } from '@/api/home'
export default {
  state: {
    indexData: {},
  },
  getters: {
    getIndexData (state) {
      return state.indexData
    }
  },
  mutations: {
    setIndexData (state, data) {
      state.indexData = data
    }
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
    }
  }
}
