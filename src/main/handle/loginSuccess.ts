import { ipcMain } from 'electron'
import type { BrowserWindow } from 'electron/main'

export default function handleLoginSuccess(win: BrowserWindow) {
  ipcMain.handle('loginSuccess', () => {
    win.webContents.send('login')
  })

  win.on('close', () => {
    ipcMain.removeHandler('loginSuccess')
  })
}
