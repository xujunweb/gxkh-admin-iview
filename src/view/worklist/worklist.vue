<template>
  <div class="worklist">
    <Table border ref="selection" :columns="columns4" :data="data1" stripe class="table"></Table>
    <Button @click="handleSelectAll(true)">标记已处理</Button>
    <div class="page">
      <Page :total="100" show-total show-elevator :page-size="pageSize" @on-change="pageSwitch" />
    </div>
    <Modal title="View Image" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
export default {
  name: "worklist",
  data () {
    return {
      pageSize:20,
      visible: false,
      imgName:'',
      faultMap:{
        0:'其他',
        1:'床坏了',
        2:'锁坏了',
        3:'还床失败'
      },
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '设备编号',
          key: 'device_no'
        },
        {
          title: '故障类型',
          width:120,
          key: 'fault_type',
          render:(h, params)=>{
            return h('span',this.faultMap[params.row.fault_type])
          }
        },
        {
          title: '描述',
          key: 'desc'
        },
        {
          title: '故障图片',
          key: 'images',
          render: (h, params) => {
            var imgs = []
            console.log(params)
            for(let i =0,len=params.row.imgs.length;i<len;i++){
              imgs.push(h('img', {
                attrs : {
                  src:params.row.imgs[i]
                },
                style: {
                  marginRight: '5px', width:'45px', height:'50px', cursor:'pointer', float:'left', margin:'5px'
                },
                on: {
                  click: () => {
                    this.handleView(params.row.imgs[i])
                  }
                }
              }))
            }
            return h('div',imgs)
          }
        },
        {
          title: '是否处理',
          width:100,
          align: 'center',
          key: 'result'
        }
      ],
      data1: [
        {
          device_no: '5658788',
          fault_type: '1',
          desc: '我关锁的时候莫名其妙就关不上了',
          result: '未处理',
          imgs:[
            'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/d833c895d143ad4b164d6bea8f025aafa40f06bc.jpg',
            'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/d833c895d143ad4b164d6bea8f025aafa40f06bc.jpg',
            'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/d833c895d143ad4b164d6bea8f025aafa40f06bc.jpg',
            'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/d833c895d143ad4b164d6bea8f025aafa40f06bc.jpg',
            'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/d833c895d143ad4b164d6bea8f025aafa40f06bc.jpg',
            'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/d833c895d143ad4b164d6bea8f025aafa40f06bc.jpg'
          ]
        },
        {
          device_no: '5658788',
          fault_type: '1',
          desc: '我关锁的时候莫名其妙就关不上了',
          result: '未处理',
          imgs:[]
        },
        {
          device_no: '5658788',
          fault_type: '1',
          desc: '我关锁的时候莫名其妙就关不上了',
          result: '未处理',
          imgs:[]
        },
        {
          device_no: '5658788',
          fault_type: '1',
          desc: '我关锁的时候莫名其妙就关不上了',
          result: '未处理',
          imgs:[]
        },
      ]
    }
  },
  created () {

  },
  methods: {
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status);
    },
    // 分页切换
    pageSwitch (page) {
      console.log(page)
    },
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
  }
}
</script>

<style scoped lang="less">
  .worklist{
    padding: 18px;padding-bottom: 50px;
  }
  .table{
    margin-bottom: 15px;
  }
  .page{
    margin-top: 30px;text-align: right;
  }
</style>
