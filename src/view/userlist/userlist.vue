<template>
    <div class="userlist">
      <div class="search-div">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="date">
            <span>注册时间：</span>
            <DatePicker type="datetimerange" v-model="formInline.date" :options="dateoptions" @on-change="changeDate" format="yyyy-MM-dd HH:mm" placeholder="请选择注册时间" style="width: 300px"></DatePicker>
          </FormItem>
          <FormItem prop="phone">
            <span>手机号：</span>
            <Input v-model="formInline.phone" placeholder="请输入手机号" number clearable style="width: 200px" />
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
        <Page :total="100" show-total show-elevator :page-size="pageSize" @on-change="pageSwitch" />
      </div>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </div>
</template>

<script>
import table2excel from '@/libs/table2excel.js'
import { getUserList } from '@/api/user'
export default {
  name: 'userlist',
  components: {
  },
  data () {
    return {
      formInline: {
        phone: '',
        date: ''
      },
      pageSize: 8,
      ruleInline: {
        phone: [
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
          title: '微信账号',
          key: 'weix',
          render: (h, params) => {
            return h('div', [
              h('strong', params.row.weix)
            ])
          }
        },
        {
          title: '手机号',
          key: 'telphone'
        },
        {
          title: '余额',
          key: 'money'
        },
        {
          title: '注册时间',
          key: 'register_time'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      tableData: [
        {
          weix: 'John Brown',
          telphone: 13330116209,
          money: '12.00',
          register_time: '2018-09-14'
        },
        {
          weix: 'John Brown',
          telphone: 13330116209,
          money: '12.00',
          register_time: '2018-09-14'
        },
        {
          weix: 'John Brown',
          telphone: 13330116209,
          money: '12.00',
          register_time: '2018-09-14'
        }
      ]
    }
  },
  computed: {
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
      getUserList({pageNum: p, pageSize: this.pageSize,type:0}).then(res => {
        console.log('用户列表----',res)
        const data = res.data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 发起搜索
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
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
        content: `微信号：${this.tableData[index].weix}<br>
        手机号：${this.tableData[index].phone}<br>
        注册时间：${this.tableData[index].insertTime}<br>
        余额：${this.tableData[index].money}
        `
      })
    },
    remove (index) {
      this.tableData.splice(index, 1)
    },
    // 分页切换
    pageSwitch (page) {
      console.log(page)
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
