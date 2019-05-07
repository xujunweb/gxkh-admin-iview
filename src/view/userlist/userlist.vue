<template>
    <div class="userlist">
      <div class="search-div">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <!--<FormItem prop="date">-->
            <!--<span>注册时间：</span>-->
            <!--<DatePicker type="datetimerange" v-model="formInline.date" :options="dateoptions" @on-change="changeDate" format="yyyy-MM-dd HH:mm" placeholder="请选择注册时间" style="width: 300px"></DatePicker>-->
          <!--</FormItem>-->
          <FormItem prop="telphone">
            <span>手机号：</span>
            <Input v-model="formInline.telphone" placeholder="请输入手机号" number clearable style="width: 200px" />
          </FormItem>
          <FormItem prop="type">
            <span>用户身份：</span>
            <Select v-model="formInline.type" style="width:200px">
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="money_lt_zero">
            <Checkbox v-model="formInline.money_lt_zero" true-value="1" false-value="0">欠费用户</Checkbox>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
            <Button @click="handleReset('formInline')" style="margin-left: 8px">清除条件</Button>
          </FormItem>
        </Form>
        <!--<Button size="large" icon="ios-download-outline" type="primary" @click="exportExcel">导出表格</Button>-->
      </div>
      <Table border :columns="columns" :data="tableData" stripe ref="userTable"></Table>
      <div class="page">
        <Page :total="total" show-total show-elevator :page-size="pageSize" @on-change="pageSwitch" />
      </div>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
      <!-- 编辑用户信息窗口 -->
      <Modal
        v-model="showEdit"
        title="编辑用户信息"
        @on-ok="updateUser">
        <h3>用户ID：{{this.formEdit.id}}</h3>
        <h3>用户手机号：{{this.formEdit.telphone}}</h3>
        <Form ref="formEdit" :model="formEdit" :rules="ruleInline">
          <FormItem prop="type" v-if="formEdit.type != 1">
            <span>用户身份：</span>
            <Select v-model="formEdit.type" style="width:200px">
              <Option v-for="item in editTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="type">
            <span>用户余额：</span>
            <Input v-model="formEdit.money" placeholder="请输入价格" style="width: 200px" />
          </FormItem>
        </Form>
      </Modal>
    </div>
</template>

<script>
import table2excel from '@/libs/table2excel.js'
import { getUserList,updateUser } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'userlist',
  components: {
  },
  data () {
    return {
      showEdit:false,
      total:0,
      //搜索条件
      formInline: {
        telphone: '',
        type: '',
        money_lt_zero:'0',
      },
      //编辑条件
      formEdit: {
        type: '',
        id:'',    //不能编辑
        telphone:'',  //手机号
        money:'', //价格
        index:'',
      },
      pageSize: 15,
      ruleInline: {
        phone: [
          // { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          // { len: 11, message: '请输入正确的手机号', trigger: 'blur' }
          // { type: 'string', min:11, message: '请输入数字', trigger: 'blur' },
        ]
      },
      typeList:[
        {value:'',label:'全部'},
        {value:'0',label:'普通用户'},
        {value:'1',label:'管理员'},
        {value:'2',label:'代理商'},
        {value:'3',label:'工作人员'},
      ],
      editTypeList:[
        {value:'0',label:'普通用户'},
        {value:'2',label:'代理商'},
        {value:'3',label:'工作人员'},
      ],
      columns: [
        {title: '手机号', key: 'telphone'},
        {title: '用户ID', key: 'id'},
        {title: '用户身份', key: 'type',
          render: (h, params) => {
            return h('div', this.typeMap[params.row.type])
        }},
        {title: '使用总时间', key: 'total_time',
          render: (h, params) => {
            return h('div', (params.row.total_time/60/60).toFixed(2)+'h')
        }},
        {title: '用户余额', key: 'money',
          render:(h, params)=>{
            return h('div',(params.row.money/100).toFixed(2))
        }},
        {title: '用户积分', key: 'score'},
        {title: '注册时间', key: 'register_time'},
        {title: '操作', key: 'action', width: 150, align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {type: 'primary', size: 'small'},
                style: {marginRight: '5px'},
                on: {click: () => {this.show(params.index)}}
              }, '查看'),
              h('Button', {
                props: {type: 'primary', size: 'small'},
                style: {marginRight: '5px'},
                on: {click: () => {
                    this.formEdit.index = params.index
                    this.formEdit.id = params.row.id
                    this.formEdit.telphone = params.row.telphone
                    this.formEdit.type = params.row.type
                    this.formEdit.money = params.row.money/100
                    this.showEdit = true
                }}
              }, '编辑')
            ])
          }
        }
      ],
      tableData: []
    }
  },
  computed: {
    ...mapState({
      typeMap(state){
        return state.user.typeMap
      }
    }),
  },
  created () {
    // 组件实例化生命周期
    this.getUserList(1)
  },
  methods: {
    renderFormat (label) {
      return label.join(' => ')
    },
    // 请求用户列表
    getUserList (p) {
      return new Promise((resolve, reject)=>{
        getUserList({pageNum: p, pageSize: this.pageSize,...this.formInline}).then(res => {
          console.log('用户列表----',res)
          const data = res.data
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          resolve(res.data)
          console.log(res)
        }).catch(err => {
          reject(err)
          console.log(err)
        })
      })
    },
    // 发起搜索
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getUserList(1).then((res)=>{
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
    //编辑用户信息
    updateUser(){
      var data = {
        user_id:this.formEdit.id,
        type:this.formEdit.type,
        money:''+(this.formEdit.money*100),
      }
      updateUser(data).then((res)=>{
        console.log('编辑用户信息--------',res)
        if(res.data.code === 100){
          this.tableData[this.formEdit.index].type = this.formEdit.type
          this.tableData[this.formEdit.index].money = this.formEdit.money*100
          this.$Message.success('操作成功!')
        }
      }).catch(err => {
        this.$Message.error('操作失败!')
      })
    },
    // 分页切换
    pageSwitch (page) {
      console.log(page)
      this.getUserList(page)
    },
    // 导出excel
    exportExcel () {
      table2excel.transform(this.$refs.userTable, 'hrefToExportTable', '文件名')
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="less">
  .userlist{
    padding: 20px;
  }
  .page{
    text-align: right;
    margin-top: 40px;
  }
  .search-div{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .ivu-form-item{
      margin-bottom: 0;
    }
  }
</style>
