/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
    api: {
      drag: any
      exit: any
      notification: any
      mainFocus: any
      mainMinimize: any
      unAuth: any
      onLogin: any
      menu: any
      onLogout: any
    },
    apiAdd: {
      addExit: any
    },
    apiLogin: {
      loginSuccess: any
      loginExit: any
    }
  }
}
