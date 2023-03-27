import { join } from 'path'
import { BrowserWindow, app, screen, session } from 'electron'
import handleDrag from './handle/drag'
import handleLoginSuccess from './handle/loginSuccess'
import handleMenu from './handle/menu'
import handleUnAuth from './handle/unAuth'

export const mainTitle = '灵曼工作'
const winWidth = 100
const winHeight = 100

function createWindow() {
  // 判断是否已经有窗口
  const win = BrowserWindow.getAllWindows().find(win => win.getTitle() === mainTitle)
  if (win) {
    win.focus()
    return
  }

  // 获取屏幕宽高 设置初始在右下角
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const mainWindow = new BrowserWindow({
    x: width - winWidth,
    y: height - winHeight,
    width: winWidth,
    height: winHeight,
    title: mainTitle,
    type: 'toolbar',
    frame: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    hasShadow: false,
    icon: join(__dirname, '../../static', 'logo.png'),
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  handleDrag(mainWindow, width, height)
  handleMenu(mainWindow)
  // handleNotification(mainWindow)
  handleUnAuth(mainWindow)
  handleLoginSuccess(mainWindow)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}`)
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    console.log(url)
    return { action: 'deny' }
  })
}

// if (process.env.NODE_ENV !== 'development') {
//   // 开机自启动
//   app.setLoginItemSettings({
//     openAtLogin: true,
//     path: app.getPath('exe'),
//   })
// }

app.setAppUserModelId('阿杰工具球')

app.whenReady().then(() => {
  createWindow()

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\''],
      },
    })
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
