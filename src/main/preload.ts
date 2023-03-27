import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  quit: () => {
    ipcRenderer.send('quit')
  },
  drag: (opt: { x: number; y: number }) => {
    ipcRenderer.invoke('drag', opt)
  },
  notification: () => {
    ipcRenderer.invoke('notification', { title: 'title', body: 'body' })
  },
  unAuth: () => {
    ipcRenderer.invoke('unAuth')
  },
  mainFocus: () => {
    ipcRenderer.invoke('mainFocus')
  },
  mainMinimize: () => {
    ipcRenderer.invoke('mainMinimize')
  },
  onLogin: (cb: (event: any, arg: any) => void) => {
    ipcRenderer.on('login', cb)
  },
  onLogout: (cb: (event: any, arg: any) => void) => {
    ipcRenderer.on('logout', cb)
  },
  menu: (userInfo: string) => {
    ipcRenderer.invoke('menu', userInfo)
  },
  exit: () => {
    ipcRenderer.invoke('exit')
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  // @ts-expect-error (define in dts)
  window.api = api
}
