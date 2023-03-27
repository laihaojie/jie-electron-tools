import path from 'path'
import { BrowserWindow, Notification, ipcMain } from 'electron'
import { mainTitle } from '../main'

export default function handleNotification(win: BrowserWindow) {
  ipcMain.handle('notification', (event, opt) => {
    const notification = new Notification({
      ...opt,
      timeoutType: 'never',
      icon: path.join(__dirname, '../../../static/', 'logo.png'),
      actions: [
        { text: 'ttt' },
      ],
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    notification.on('click', (event) => {
      // 判断是否点击了关闭按钮
      // console.log({ ...event.sender })
      // createAddWindow()
      const mainWindow = BrowserWindow.getAllWindows().find(itemWin => itemWin.getTitle() === mainTitle)
      if (mainWindow)
        mainWindow.focus()
    })
    notification.show()
  })

  win.on('close', () => {
    ipcMain.removeHandler('notification')
  })
}

