<template>
  <div>
    <Select v-model="item.select" clearable style="width:200px" v-for="(item,index) in defaultList" @on-change="moreSelect($event,item,index)">
      <Option v-for="op in item.dataList" :value="op.id" :key="op.id">{{ op.label }}</Option>
    </Select>
  </div>
</template>

<script>
  export default {
    name: "test",
    props:{
      threeData:{
        type:Array,
        default(){
          return [
            {
              id: '1101',
              label: '总经办',
              children: [
                {
                  id: '110101',
                  label: '综合办'
                },
                {
                  id: '110102',
                  label: '法务部'
                }
              ]
            },
            {
              id: '1109',
              label: '技术中心',
              children: [
                {
                  id: '110901',
                  label: '综合服务部'
                },
                {
                  id: '110902',
                  label: '电子事业部'
                },
                {
                  id: '110903',
                  label: '服装事业部',
                  children: [

                  ]
                },
                {
                  id: '110908',
                  label: '订单职能项目部',
                  children: [
                    {
                      id: '11090806',
                      label: '前端组'
                    }
                  ]
                }
              ]
            }
          ]
        },
      },
      pdefaultValue:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        defaultList:[{
          select:'',
          dataList:[...this.threeData]
        }],
        defaultValue:[...this.pdefaultValue]
      }
    },
    computed:{
    },
    created(){
      this.getdefault()
    },
    watch:{
      pdefaultValue(newv,old){
        console.log('监控-------',newv,old)
        if(newv&&newv.length){
          this.defaultValue = [...newv]
          this.getdefault()
        }
      }
    },
    methods:{
      //默认赋值
      getdefault(){
        for(let i=0,value='';value=this.defaultValue[i];i++){
          this.defaultList[i].select = value
          if((this.defaultValue.length-1)>i){
            var childrenList = this.defaultList[i].dataList.filter((i)=>{
              return i.id === value
            })
            if(childrenList[0].children && childrenList[0].children.length){
              this.defaultList.push({
                select: '',
                dataList: [...childrenList[0].children]
              })
            }
          }
        }
      },
      /**
       *  @e 选中的ID值
       *  @item 所属的下拉框信息
       *  @index 所属下拉框的索引
       * */
      moreSelect(e,item,index){
        console.log(e,index)
        //给默认值赋值
        this.defaultValue[index] = e||''
        if(!e){
          this.deletSelect(index,0)
          return
        }
        if(item.dataList&&item.dataList.length){
          var newList = this.defaultList[index].dataList.filter((i)=>{
            return i.id === e
          })
          if(this.defaultList[index+1]){
            //如果存在下一个拉下框重新赋值
            if(newList[0].children&&newList[0].children.length){
              this.defaultList[index+1].dataList = [...newList[0].children]     //需要下拉的数组
              //给后续的下拉框全部清空
              this.deletSelect(index,1)
            }else {
              //删除后续下拉框
              this.defaultList.splice(index+1)
              this.defaultValue.splice(index+1)
            }
          }else {
            //否则新增
            console.log(newList)
            if(newList[0].children&&newList[0].children.length){
              this.defaultList.push({
                select:'',
                dataList:[...newList[0].children]
              })
            }
          }
        }
      },
      /**
       * 清空后续下拉框的值和多余的下拉
       * @index 需要开始清空值的当前索引
       * @start 从index开始计算的第几位(删除多余下拉)
       * */
      deletSelect(index,start){
        for(let i =0;i<this.defaultList.length-index-1;i++){
          this.defaultList[index+1+i].select = ''
          this.defaultValue[index+1+i] = ''
        }
        this.defaultList.splice(index+1+start)
        this.defaultValue.splice(index+1+start)
      },
    }
  }
</script>

<style scoped>

</style>
