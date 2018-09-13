<template>
    <div>
      <div class="search-div">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="date">
            <span>注册时间：</span>
            <DatePicker type="datetimerange" v-model="formInline.date" :options="dateoptions" format="yyyy-MM-dd HH:mm" placeholder="请选择注册时间" style="width: 300px"></DatePicker>
          </FormItem>
          <FormItem prop="phone">
            <span>手机号：</span>
            <Input v-model="formInline.phone" placeholder="请输入手机号" clearable style="width: 200px" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
          </FormItem>
        </Form>
        <!--<div class="search-item">-->
          <!--<span>注册时间：</span>-->
          <!--<DatePicker type="datetimerange" :options="dateoptions" format="yyyy-MM-dd HH:mm" placeholder="请选择注册时间" style="width: 300px"></DatePicker>-->
        <!--</div>-->
        <!--<div class="search-item">-->
          <!--<span>手机号：</span>-->
          <!--<Input v-model="formInline.phone" placeholder="请输入手机号" maxlength=11 clearable style="width: 200px" />-->
        <!--</div>-->
      </div>

    </div>
</template>

<script>
export default {
  name: 'user',
  components: {
  },
  data () {
    return {
      formInline: {
        phone: '',
        date: ''
      },
      ruleInline: {
        date: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 11, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
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
      }
    }
  },
  computed: {
  },
  methods: {
    renderFormat (label) {
      return label.join(' => ')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
