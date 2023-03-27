import { ipcMain } from 'electron'
import type { BrowserWindow } from 'electron/main'

export default function handleExit(win: BrowserWindow) {
  ipcMain.handleOnce('exit', () => {
    win.close()
  })

  win.on('close', () => {
    ipcMain.removeHandler('exit')
  })
}
