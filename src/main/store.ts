import { app, ipcMain } from 'electron'
import PouchDb from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'
import { Student } from '../shared/types/ipc'

let dbPath;
if(process.platform === "darwin") {
    dbPath = path.join(app.getPath("appData"), "teceduca", "my_db")
}else {
    dbPath = path.join(app.getPath("userData"), "my_db")
}

const dbDir = path.dirname(dbPath)
if(!fs.existsSync(dbDir)){
    fs.mkdirSync(dbDir, { recursive: true })
}

const db = new PouchDb<Student>(dbPath)