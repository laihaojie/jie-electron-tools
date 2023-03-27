import { join } from 'path'
import * as url from 'url'
import { BrowserWindow, app, ipcMain } from 'electron'

const title = '登录'

export function createLoginWindow() {
  // 判断是否已经有登录窗口
  const loginWindow = BrowserWindow.getAllWindows().find(win => win.getTitle() === title)
  if (loginWindow) {
    loginWindow.focus()
    return
  }

  const mainWindow = new BrowserWindow({
    width: 380,
    height: 500,
    title,
    // frame: false,
    resizable: false,
    hasShadow: false,
    autoHideMenuBar: true,
    icon: join(__dirname, '../../../../static', 'logo.png'),
    webPreferences: {
      preload: join(__dirname, './preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  ipcMain.handleOnce('loginExit', () => {
    mainWindow.close()
  })

  mainWindow.on('close', () => {
    ipcMain.removeHandler('loginExit')
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}#/login`)
  }
  else {
    const loginPath = url.format({
      pathname: join(app.getAppPath(), 'renderer', 'index.html'),
      protocol: 'file:',
      slashes: true,
      hash: '/login',
    })
    mainWindow.loadURL(loginPath)
  }
}
