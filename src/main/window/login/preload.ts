import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const apiLogin = {
  loginSuccess: () => {
    ipcRenderer.invoke('loginSuccess')
  },
  loginExit: () => {
    ipcRenderer.invoke('loginExit')
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('apiLogin', apiLogin)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  // @ts-expect-error (define in dts)
  window.apiLogin = apiLogin
}
