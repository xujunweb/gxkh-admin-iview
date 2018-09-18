/**
 * Created by 132 on 2017/11/9.
 */
import DateUtil from './DateUtil'
let statusList = {
  0: '等待上传CT数据',
  1: '等待客户付款',
  2: '待处理'
}
// 工单类型
let statusType = {
  // 3: '超时未设计',  // 处理完成 //超时设计和超时未设计暂未提供操作方法
  4: '拒单',
  5: '超时设计', // 先不管
  6: '订单暂停',
  10: '审核认证资料',
  15: '客服协助',
  21: '订单取消',
  22: '超时未设计',
  25: '订单评价', // 用户评价
  24: '无人接单',
  27: '用户申请退款',
  26: '方案投诉'
}
// 日志类型
let journalType = {
  1: '登录系统',
  2: '退出系统',
  3: '处理工单-客服协助',
  4: '通过审核订单',
  5: '用户补充文件',
  6: '编辑订单'
}
let sex = {
  '1': '男',
  '0': '女'
}
// 通知类型
let noticeType = {
  15: '超时请求协助',
  6: '订单暂停',
  21: '用户申请取消订单',
  22: '接单后，超过离用户手术开始时间的百分之50没设计',
  24: '加急订单无人接单',
  4: '工程师拒单提醒',
  25: '收到用户差评'
}
let payWay = {
  1: '支付宝',
  2: '微信',
  3: '他人代付',
  5: '线下转账',
  6: '无'
  // '': '暂无'
}
let fileStatus = {
  0: '医生审核中',
  1: '审核完成',
  2: '审核失败',
  3: '设计中...'
}
let csStatus = {
  0: '未查看工单',
  1: '待审核工单',
  2: '已审核工单'
}
// 下单人身份
let placeType = {
  0: '医生',
  1: '代理商',
  2: '医学生'
}
let csDetails = {
  0: '待处理工单',
  1: '待处理工单',
  2: '处理工单'
}
let evaluateType = {
  1: '非常满意',
  2: '满意',
  3: '一般',
  4: '不满意'
}
// 服务类型
let serviceType = {
  2: '仅分割',
  3: '分割+设计',
  4: '仅设计',
  5: '钛网',
  6: '模型打印+分割',
  7: '模型打印'
}
// 退款阶段
let refundType = {
  // 1: '申请退款',
  2: '退款审核中',
  3: '已退款'
}
let filters = {
  date (value) {
    let newvalue = DateUtil.dateToStr(false, DateUtil.longToDate(value))
    return newvalue
  },
  status (value) {
    let newvalue = statusList[+value]
    return newvalue
  },
  sex (value) {
    let newvalue = sex[+value]
    return newvalue
  },
  type (value) {
    let newvalue = statusType[+value]
    return newvalue
  },
  journal (value) {
    let newvalue = journalType[+value]
    return newvalue
  },
  notice (value) {
    let newvalue = noticeType[+value]
    return newvalue
  },
  payway (value) {
    let newvalue = payWay[+value]
    return newvalue
  },
  fileStatus (value) {
    let newvalue = fileStatus[+value]
    return newvalue
  },
  csStatus (value) {
    let newvalue = csStatus[+value]
    return newvalue
  },
  placetype (value) {
    let newvalue = placeType[+value]
    return newvalue
  },
  csDetailStatus (value) {
    let newvalue = csDetails[+value]
    return newvalue
  },
  evaluateType (value) {
    let newvalue = evaluateType[+value]
    return newvalue
  },
  serviceType (value) {
    let newvalue = serviceType[+value]
    return newvalue
  },
  refundType (value) {
    let newvalue = refundType[+value]
    return newvalue
  },
  saveSpaces (value) {
    if (value && typeof value === 'string') {
      let newvalue = value.replace(/\s/g, '&nbsp;')
      return newvalue
    } else {
      return value
    }
  },
  formatMoney (money) {
    if (money == 0) return '0'
    money = money/100
    money = (+money)
    //money = money.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,');
    return money.toString()
  },
  formatTwo (money) {
    if (!money) return '0.00'
    money = (+money).toFixed(2)
    return money
  }
}
export default {
  install (Vue) {
    for (let i in filters) {
      Vue.filter(i, filters[i])
    }
  },
  filters:filters
}
