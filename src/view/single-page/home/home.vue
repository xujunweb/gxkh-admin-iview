<template>
  <div class="home">
    <div class="top">
      <div class="item" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </div>
    </div>
    <!--<selectMore :pdefaultValue="defaultValue"></selectMore>-->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import selectMore from './test'
// import { ChartPie, ChartBar } from '_c/charts'
// import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    selectMore
    // ChartPie,
    // ChartBar,
    // Example
  },
  data () {
    return {
      pieData: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'}
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      },
      defaultValue:[],
    }
  },
  computed:{
    ...mapGetters({
      'indexData':'getIndexData',
      'access':'getAccess',
      'inforCardData':'getInforCardData'
    }),
  },
  created(){
    this.$store.dispatch('getIndexData').then(()=>{
      console.log('获取到的首页数据----',this.indexData)
      if(this.inforCardData.length){
        this.inforCardData[0].count = this.indexData.total_user
        this.inforCardData[1].count = this.indexData.total_order
        this.inforCardData[2].count = this.indexData.total_use_device
        this.inforCardData[3].count = this.indexData.total_time/60/60
      }
    })
    // setTimeout(()=>{
    //   this.defaultValue = ["1109", "110908", "11090806"]
    // },3000)
  },
  mounted () {
    //
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
.count-style{
  font-size: 50px;
}
.home{
  padding: 18px;
}
.top{
  display: flex;justify-content: space-between;
  .item{
    width: 200px;
  }
}
</style>
