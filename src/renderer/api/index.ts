import service, { Get, Post } from '../utils/request'

const Api = {
  // 测试接口Get
  testGet: () => Get('/account/get'),

  // 测试接口Post
  tesPost: data => Post('/account/post', data),

  // 登录接口
  login: data => service.post('/api/admin/AdminAccount/login', data),
  // login: (data) => Post('/account/login', data),

  // 获取登录用户信息
  getUserInfo: () => Get<UserInfo>('/api/Account/info/app'),

  // 发送验证码
  sendMsCode: data => Post('/api/Public/send_sms', data),

  // 获取工作状态列表
  getWorkStatusList: () => Get('/api/workstatus/list'),

  // 保存工作状态
  saveWorkStatus: data => Post('/api/workstatus/create', data),

  // 获取上次提交内容
  getLastWorkStatus: () => Get('/api/workstatus/last'),
}

export default Api
