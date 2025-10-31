import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { Student, NewStudent } from '../shared/types/ipc'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  fetchUsers: () => {
    return ipcRenderer.invoke("fetch-users")
  },

  addStudent: (student: NewStudent): Promise<void | PouchDB.Core.Response> => ipcRenderer.invoke("add-student", student),

  fetchAllStudents: (): Promise<Student[]> => ipcRenderer.invoke("fetch-all-students"),

  fetchStudentByID: (studentId: string) => ipcRenderer.invoke("fetch-student-id", studentId)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
