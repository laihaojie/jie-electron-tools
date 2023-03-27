import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const apiAdd = {
  addExit: () => {
    ipcRenderer.invoke('addExit')
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('apiAdd', apiAdd)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  // @ts-expect-error (define in dts)
  window.apiAdd = apiAdd
}
