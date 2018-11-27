<template>
  <div class="userlist">
    <div class="search-div">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user_id" class="search-item">
          <span>用户id：</span>
          <Input v-model="formInline.user_id" placeholder="请输入用户id" number clearable style="width: 200px" />
        </FormItem>
        <FormItem prop="lock_no" class="search-item">
          <span>设备编号：</span>
          <Input v-model="formInline.lock_no" placeholder="请输入设备编号" number clearable style="width: 200px" />
        </FormItem>
        <FormItem prop="qr_code_no" class="search-item">
          <span>二维码编号：</span>
          <Input v-model="formInline.qr_code_no" placeholder="请输入二维码编号" number clearable style="width: 200px" />
        </FormItem>
        <FormItem prop="device_no" class="search-item">
          <span>柜子编号：</span>
          <Input v-model="formInline.device_no" placeholder="请输入柜子编号" number clearable style="width: 200px" />
        </FormItem>
        <FormItem prop="lock_mac" class="search-item">
          <span>锁MAC：</span>
          <Input v-model="formInline.lock_mac" placeholder="请输入锁MAC" number clearable style="width: 200px" />
        </FormItem>
        <FormItem prop="hospital" class="search-item">
          <span>锁所属医院：</span>
          <Input v-model="formInline.hospital" placeholder="请输入医院" number clearable style="width: 200px" />
        </FormItem>
        <FormItem prop="state" class="search-item">
          <span>锁状态：</span>
          <Select v-model="formInline.state" style="width:200px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
          <Button @click="handleReset('formInline')" style="margin-left: 8px">清除条件</Button>
        </FormItem>
        <Upload
          ref="upload"
          :on-success="handleSuccess"
          :format="['xlsx','excel']"
          :max-size="5048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          action="https://www.chmbkh.com/mobile/lockInfo/importLockInfoData" v-if="access[0] == '1'">
          <Button icon="ios-cloud-upload-outline">导入设备</Button>
        </Upload>
      </Form>
      <!--<Button size="large" icon="ios-download-outline" type="primary" @click="exportExcel">导出表格</Button>-->
    </div>
    <Table border :columns="columns" :data="tableData" stripe ref="userTable"></Table>
    <div class="page">
      <Page :total="total" show-total show-elevator :page-size="pageSize" @on-change="pageSwitch" />
    </div>
    <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    <Modal
      v-model="showEdit"
      title="编辑锁信息"
      @on-ok="updateDevice"
      @on-cancel="cancel">
      <h3>锁二维码编号：{{this.tableData[this.selectIndex]&&this.tableData[this.selectIndex].qr_code_no}}</h3>
      <div class="input-item"><span>用户ID：</span><Input v-model="inputUserId" placeholder="请输入用户ID" style="width: 200px" /></div>
      <div class="input-item"><span>绑定医院：</span><Input v-model="hospital" placeholder="请输入医院" style="width: 200px" /></div>
    </Modal>
  </div>
</template>

<script>
  // import table2excel from '@/libs/table2excel.js'
  import { getDeviceList,updateDevice } from '@/api/devicelist'
  import {mapGetters} from 'vuex'
  export default {
    name: 'devicelist',
    components: {
    },
    data () {
      return {
        total:0,
        inputUserId:'', //绑定的用户ID
        hospital:'',  //绑定的医院
        formInline: {
          lock_no: '',
          qr_code_no:'',  //二维码编号
          device_no:'',   //柜子编号
          lock_mac:'',  //锁mac地址
          state:'',     //锁状态
          hospital:'',  //锁所属医院
          user_id:'',   //用户ID
        },
        stateList:[
          {value:'',label:'全部'},
          {value:0,label:'正常'},
          {value:1,label:'维修中'},
          {value:2,label:'禁用'},
          {value:3,label:'使用中'},
        ],
        stateMap:{
          0:'正常',
          1:'维修中',
          2:'禁用',
          3:'使用中'
        },
        pageSize: 15,
        showEdit:false,
        selectIndex:0,     //选中的索引
        ruleInline: {
          user_id: [
            // { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            // { len: 11, message: '请输入正确的手机号', trigger: 'blur' }
            // { type: 'string', min:11, message: '请输入数字', trigger: 'blur' },
          ]
        },
        columns: [
          {
            title: '二维码编号',
            key: 'qr_code_no'
          },
          {
            title: '设备编号',
            key: 'lock_no',
            render:(h, params)=>{
              if(app.$store.state.user.access[0] == '1'){
                return h('div', params.row.lock_no)
              }else {
                return h('div', '-')
              }
            }
          },
          {
            title: '柜子编号',
            key: 'device_no'
          },
          {
            title: '设备密码',
            key: 'lock_pwd',
            render:(h, params)=>{
              if(app.$store.state.user.access[0] == '1'){
                return h('div', params.row.lock_pwd)
              }else {
                return h('div', '-')
              }
            }
          },
          {
            title: '设备秘钥',
            key: 'lock_key'
          },
          {
            title: '锁MAC',
            key: 'lock_mac'
          },
          {
            title: '锁所属医院',
            key: 'hospital'
          },
          {
            title: '锁状态',
            key: 'state',
            render: (h, params) => {
              return h('div', this.stateMap[params.row.state])
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              if(this.access[0] == '1'){
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
                        this.selectIndex = params.index
                        this.showEdit = true
                        this.inputUserId = this.tableData[params.index].user_id
                        this.hospital = this.tableData[params.index].hospital
                      }
                    }
                  }, '编辑信息')
                ])
              }else {
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
          }
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
      this.getDeviceList(1)
    },
    methods: {
      handleSpinCustom () {
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'ios-loading',
                  size: 18
                }
              }),
              h('div', 'Loading')
            ])
          }
        })
      },
      renderFormat (label) {
        return label.join(' => ')
      },
      // 请求设备列表
      getDeviceList (p) {
        return new Promise((resolve, reject)=>{
          let data = {
            pageNum: p, pageSize: this.pageSize,
            ...this.formInline
          }
          getDeviceList(data).then(res => {
            console.log('设备列表----',res)
            const data = res.data
            this.tableData = res.data.data.list.length?res.data.data.list:[]
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
            this.getDeviceList(1).then((res)=>{
              this.$Message.success('操作成功!')
            }).catch(err => {
              this.$Message.error('操作失败!')
            })
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      //编辑锁信息
      updateDevice(){
        var data = {
          id:this.tableData[this.selectIndex].id,
          user_id:this.inputUserId,
          hospital:this.hospital
        }
        updateDevice(data).then((res)=>{
          console.log('编辑锁信息--------',res)
          if(res.data.code === 100){
            this.tableData[this.selectIndex].user_id = this.inputUserId
            this.tableData[this.selectIndex].hospital = this.hospital
            this.$Message.success('操作成功!')
          }
        }).catch(err => {
          this.$Message.error('操作失败!')
        })
      },
      //关闭弹窗
      cancel(){
        this.showEdit = false
      },
      show (index) {
        this.$Modal.info({
          title: '锁信息',
          content: `锁二维码：${this.tableData[index].qr_code_no}<br>
        所属医院：${this.tableData[index].hospital}<br>
        锁状态：${this.stateMap[this.tableData[index].status]}`
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      changeDate (e) {
        this.formInline.date = e
      },
      remove (index) {
        this.tableData.splice(index, 1)
      },
      // 分页切换
      pageSwitch (page) {
        console.log(page)
        this.getDeviceList(page)
      },
      // 导出excel
      exportExcel () {
        table2excel.transform(this.$refs.userTable, 'hrefToExportTable', '文件名')
      },
      //上传之前
      handleBeforeUpload () {
        this.handleSpinCustom()
        return true
      },
      //上传成功
      handleSuccess (res, file) {
        this.$Spin.hide()
        console.log('上传成功-------',res,file)
        this.getDeviceList(1)
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '文件' + file.name + ' 类型错误, 请选择 xlsx 或者 excel'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '文件大小超出限制',
          desc: '文件  ' + file.name + ' 太大, 请上传5M以下的文件'
        })
      },
    },
    watch: {
    }
  }
</script>

<style scoped lang="less">
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  .input-item{
    margin-top: 20px;
    span{display: inline-block;width: 70px;}
  }
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
    .search-item{
      margin-bottom: 20px;
      span{
        display: inline-block;
        width: 75px;text-align: right;
      }
    }
  }
</style>
