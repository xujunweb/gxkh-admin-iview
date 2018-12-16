<template>
  <div class="userlist">
    <div class="search-div">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="date">
          <span>订单创建时间：</span>
          <DatePicker type="datetimerange" v-model="formInline.date" :options="dateoptions" @on-change="changeDate" format="yyyy-MM-dd HH:mm" placeholder="请选择创建时间" style="width: 300px"></DatePicker>
        </FormItem>
        <FormItem prop="user_id">
          <span>用户id：</span>
          <Input v-model="formInline.user_id" placeholder="请输入用户id" number clearable style="width: 200px" />
        </FormItem>
        <FormItem prop="lock_no">
          <span>设备编号：</span>
          <Input v-model="formInline.lock_no" placeholder="请输入设备编号" number clearable style="width: 200px" />
        </FormItem>
        <FormItem prop="agency_user_id" v-if="access[0] === 1">
          <span>代理商ID：</span>
          <Input v-model="formInline.agency_user_id" placeholder="请输入代理商ID" number clearable style="width: 200px" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
          <Button @click="handleReset('formInline')" style="margin-left: 8px">清除条件</Button>
        </FormItem>
      </Form>
      <Button size="large" icon="ios-download-outline" type="primary" @click="exportExcel">导出表格</Button>
    </div>
    <Table border :columns="columns" :data="tableData" stripe ref="userTable"></Table>
    <div class="page">
      <Page :total="total" show-total show-elevator :page-size="pageSize" @on-change="pageSwitch" class="pagecom" />
      <span>每页</span><Input v-model="pageSize" number @on-enter="getOrderList(1)" style="width: 60px;" class="pagesize" /><span>条</span>
    </div>
    <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
  </div>
</template>

<script>
  import table2excel from '@/libs/table2excel.js'
  import { getOrderList } from '@/api/orderlist'
  import {mapGetters} from 'vuex'
  export default {
    name: 'orderlist',
    components: {
    },
    data () {
      return {
        total:0,
        formInline: {
          lock_no: '',
          date: '',
          user_id:'',
          agency_user_id:'',
        },
        pageSize: 15,
        ruleInline: {
          user_id: [
            // { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            // { len: 11, message: '请输入正确的手机号', trigger: 'blur' }
            // { type: 'string', min:11, message: '请输入数字', trigger: 'blur' },
          ]
        },
        dateoptions: {
          shortcuts: [
            {
              text: '1周内',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                return [start, end]
              }
            },
            {
              text: '1个月',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
              }
            },
            {
              text: '3个月内',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
              }
            }
          ]
        },
        columns: [
          {
            title: '订单号',
            key: 'order_no'
          },
          {
            title: '用户ID',
            key: 'user_id',
            render:(h, params)=>{
              if(app.$store.state.user.access[0] == '1'){
                return h('div', params.row.user_id)
              }else {
                return h('div', '-')
              }
            }
          },
          {
            title: '用户手机',
            key: 'user',
            render:(h, params)=>{
              if(app.$store.state.user.access[0] == '1'){
                return h('div', params.row.user.telphone)
              }else {
                return h('div', '-')
              }

            }
          },
          {
            title: '订单id',
            key: 'id'
          },
          {
            title: '设备编号',
            key: 'lock_no'
          },
          {
            title: '订单金额',
            key: 'fee',
            render: (h, params) => {
              return h('div', Math.abs(params.row.fee/100)+'元')
            }
          },
          {
            title: '开始时间',
            key: 'start_time'
          },
          {
            title: '结束时间',
            key: 'end_time'
          },
        ],
        tableData: []
      }
    },
    computed: {
      ...mapGetters({
        'access':'getAccess'
      })
    },
    created () {
      // 组件实例化生命周期
      this.getOrderList(1)
    },
    methods: {
      renderFormat (label) {
        return label.join(' => ')
      },
      // 请求订单列表
      getOrderList (p) {
        return new Promise((resolve, reject)=>{
          var agency_user_id = app.$store.state.user.token==100000000?this.formInline.agency_user_id:app.$store.state.user.token
          let data = {
            pageNum: p, pageSize: this.pageSize,
            user_id:this.formInline.user_id,
            lock_no: this.formInline.lock_no,
            start_time:this.formInline.date[0],
            end_time:this.formInline.date[1],
            agency_user_id:agency_user_id,
          }
          this.$Spin.show()
          getOrderList(data).then(res => {
            console.log('订单列表----',res)
            const data = res.data
            this.tableData = res.data.data.list
            this.total = res.data.data.total
            this.$Spin.hide()
            resolve(res.data)
            console.log(res)
          }).catch(err => {
            this.$Spin.hide()
            reject(err)
            console.log(err)
          })
        })
      },
      // 发起搜索
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.getOrderList(1).then((res)=>{
              this.$Message.success('操作成功!')
            }).catch(err => {
              this.$Message.error('操作失败!')
            })
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      changeDate (e) {
        console.log('日期---',e)
        this.formInline.date = e
      },
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `手机号：${this.tableData[index].telphone}<br>
        使用总时间：${(this.tableData[index].total_time/60/60).toFixed(2)}h<br>
        注册时间：${this.tableData[index].register_time}<br>
        用户余额：${(this.tableData[index].money/100).toFixed(2)}<br>
        用户积分：${this.tableData[index].score}
        `
        })
      },
      remove (index) {
        this.tableData.splice(index, 1)
      },
      // 分页切换
      pageSwitch (page) {
        console.log(page)
        this.getOrderList(page)
      },
      // 导出excel
      exportExcel () {
        table2excel.transform(this.$refs.userTable, 'hrefToExportTable', '订单')
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="less">
  .userlist{
    padding: 20px;
    padding-bottom: 50px;
  }
  .page{
    text-align: right;
    margin-top: 25px;
    display: flex;
    align-items: center;
    .pagecom{margin-right: 15px;}
    .pagesize{
      margin-left: 8px;
      margin-right: 8px;
    }
  }
  .search-div{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .ivu-form-item{
      margin-bottom: 20px;
    }
  }
</style>
