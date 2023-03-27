import { Menu, app, ipcMain } from 'electron'
import type { BrowserWindow, MenuItemConstructorOptions } from 'electron/main'
import { createLoginWindow } from '../window/login/login'

export default function handleMenu(win: BrowserWindow) {
  ipcMain.handle('menu', (event, userInfoJSON: string) => {
    const userInfo: UserInfo = JSON.parse(userInfoJSON)
    const isLogin = !!userInfo.nickName

    const contextMenu = Menu.buildFromTemplate([
      // isLogin && {
      //   label: '汇报工作',
      //   click: () => {
      //     createAddWindow()
      //   },
      // },
      // isLogin && {
      //   label: '切换账号',
      //   click: () => {
      //     createLoginWindow()
      //   },
      // },
      isLogin && {
        label: '退出登录',
        click: () => {
          win.webContents.send('logout')
        },
      },
      isLogin && {
        type: 'separator',
      },
      !isLogin && {
        label: '登录',
        click: () => {
          createLoginWindow()
        },
      },
      {
        label: '退出',
        click: () => {
          app.quit()
        },
      },
    ].filter(Boolean) as MenuItemConstructorOptions[])

    // 显示上下文菜单
    contextMenu.popup({
      window: win,
    })
  })

  win.on('close', () => {
    ipcMain.removeHandler('menu')
  })
}
