<template>
  <div class="system">
    <div class="title-h2">小程序轮播图</div>
    <div class="imgList moudel">
      <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item.name)" size="30"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)" size="30"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="5048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="https://baidu.com"
        style="display: inline-block;width:150px;">
        <div class="upload">
          <Icon type="ios-camera" size="40"></Icon>
        </div>
      </Upload>
    </div>
    <div class="block"></div>
    <div class="title-h2">计费设置</div>
    <div class="time moudel">
      <div class="item">
        <span>每小时计费：</span><InputNumber :max="99" :min="1" v-model="money" :disabled="disabled"></InputNumber>
        <Button type="primary" @click="editMoney" class="button">{{disabled?'编辑':'保存'}}</Button>
      </div>
      <div class="item">
        <span>选时选项：</span>
        <Dropdown>
          <a href="javascript:void(0)">
            可选项
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem v-for="item in timeList">{{item}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="primary" @click="editOption" class="button">编辑</Button>
      </div>
    </div>
    <div class="block"></div>
    <div class="title-h2">客服电话</div>
    <div class="customer moudel">
      <span>客服电话：</span><Input v-model="phone" :disabled="cusDisabled" style="width: 200px"></Input>
      <Button type="primary" @click="editCustomer" class="button">{{cusDisabled?'编辑':'保存'}}</Button>
    </div>
    <Modal title="View Image" v-model="visible">
      <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal>
    <Modal title="编辑选项" v-model="edit" @on-ok="okAdd">
      <div class="editOption">
        <div class="item" v-for="(item,index) in newTimeList">
          <InputNumber :max="99" :min="1" v-model="newTimeList[index]" class="number" ></InputNumber>
          <Icon type="md-close" size="12" color="#fff" class="icon" @click="removeOption(index)" />
        </div>
        <Button type="primary" class="button" @click="addOption">添加</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Icons from '../../components/icons/icons'
import { getAllinfo, updateAppointInfo } from  '@/api/user'
export default {
  name: 'system',
  components: {Icons},
  data () {
    return {
      defaultList: [
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      edit: false,
      money: 2,
      timeList: [1, 2, 3, 4, 5, 6, 7],
      newTimeList: [],
      disabled:true,
      phone:'',
      cusDisabled:true
    }
  },
  created () {
    // 组件实例化生命周期
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    //查询所有的配置信息
    getAllinfo () {
      getAllinfo().then(res => {
        const data = res.data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    //修改指定配置信息
    updateAppointInfo (key,value) {
      updateAppointInfo(key,value).then(res => {
        const data = res.data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑选项
    editOption () {
      this.edit = true
      this.newTimeList = JSON.parse(JSON.stringify(this.timeList))
    },
    // 添加选项
    addOption () {
      this.newTimeList.push(1)
    },
    // 删除选项
    removeOption (index) {
      this.newTimeList.splice(index, 1)
    },
    // 确定添加
    okAdd () {
      this.timeList = JSON.parse(JSON.stringify(this.newTimeList))
    },
    //编辑计费
    editMoney () {
      if(!this.disabled){
        console.log('发起请求保存')
      }
      this.disabled = !this.disabled
    },
    //编辑电话
    editCustomer () {
      if(!this.cusDisabled){
        console.log('发起电话请求保存')
      }
      this.cusDisabled = !this.cusDisabled
    },
    //查看大图
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    //删除图片
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    //上传成功
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件类型错误',
        desc: '文件' + file.name + ' 类型错误, 请选择 jpg 或者 png'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件大小超出限制',
        desc: '文件  ' + file.name + ' 太大, 请上传2M以下的文件'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: '最多只能选择5张图片.'
        })
      }
      return check
    }
  }
}
</script>

<style scoped lang="less">
  .system{
    padding-bottom: 50px;
  }
  .title-h2{
    font-size: 16px;
    line-height: 60px;padding-left: 20px;
  }
  .block{
    background: #f5f7f9;
    height: 10px;
  }
  .moudel{
    margin-bottom: 30px;
    padding: 0 20px;
  }
  .upload{
    width: 150px;
    height: 128px;
    line-height: 128px;
  }
  .time{
    .item{
      margin-bottom: 15px;
      span{
        display: inline-block;width: 80px;text-align: right;
      }
      .button{
        margin-left: 15px;
      }
    }
  }
  .editOption{
    width: 450px;
    display: flex;flex-wrap: wrap;align-items: center;align-content: center;
    .item{
      position: relative;margin: 5px 20px;margin-bottom: 10px;
      .number{
        width: 50px;
      }
      .icon{
        cursor: pointer;position: absolute;top: -5px;right: -5px;background: red;border-radius: 20px;padding: 1px;
      }
    }
    .button{
      height: 32px;margin-left:20px;margin-bottom: 5px;
    }
  }
  .customer{
    display: flex;
    span{
      display: inline-block;width: 80px;text-align: right;
      line-height: 32px;
    }
    .button{
      margin-left: 15px;
    }
  }
  .demo-upload-list{
    display: inline-block;
    width: 150px;
    height: 130px;
    text-align: center;
    line-height: 130px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 15px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
