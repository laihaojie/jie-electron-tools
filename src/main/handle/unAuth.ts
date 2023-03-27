import { ipcMain } from 'electron'
import type { BrowserWindow } from 'electron/main'
import { createLoginWindow } from '../window/login/login'

export default function handleUnAuth(win: BrowserWindow) {
  ipcMain.handle('unAuth', () => {
    createLoginWindow()
  })

  win.on('close', () => {
    ipcMain.removeHandler('unAuth')
  })
}
