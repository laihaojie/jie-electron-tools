import type { BrowserWindow } from 'electron'
import { ipcMain } from 'electron'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function handleDrag(win: BrowserWindow, w, h) {
  ipcMain.handle('drag', (event, opt: { x: number; y: number }) => {
    const [x, y] = win.getPosition()
    win.setPosition(x + opt.x, y + opt.y)
    // console.log(x, '--------------', y)
    // console.log(w, h)
  })

  win.on('close', () => {
    ipcMain.removeHandler('drag')
  })
}

