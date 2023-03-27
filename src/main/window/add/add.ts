import { join } from 'path'
import * as url from 'url'
import { BrowserWindow, app, ipcMain } from 'electron'

const title = '汇报工作'

export function createAddWindow() {
  // 判断是否已经有添加窗口
  const addWindow = BrowserWindow.getAllWindows().find(win => win.getTitle() === title)
  if (addWindow) {
    addWindow.focus()
    return
  }

  const mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    // frame: false,
    resizable: false,
    hasShadow: false,
    autoHideMenuBar: true,
    title,
    icon: join(__dirname, '../../../static', 'logo.png'),
    webPreferences: {
      preload: join(__dirname, './preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })
  ipcMain.handleOnce('addExit', () => {
    mainWindow.close()
  })

  mainWindow.on('close', () => {
    ipcMain.removeHandler('addExit')
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}#/add`)
  }
  else {
    const addPath = url.format({
      pathname: join(app.getAppPath(), 'renderer', 'index.html'),
      protocol: 'file:',
      slashes: true,
      hash: '/add',
    })
    mainWindow.loadURL(addPath)
  }
}
