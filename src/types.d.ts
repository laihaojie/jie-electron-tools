interface UserInfo {
  id: string
  avatar: string
  mobile: string
  nickName: string
  apps: App[]
}

interface App {
  id: string
  name: string
  webPosition: Number
  h5Position: Number
}
