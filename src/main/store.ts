import { app, ipcMain } from 'electron'
import PouchDb from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'
import { Student, NewStudent } from '../shared/types/ipc'
import { randomUUID } from 'node:crypto'

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

// função para adiciona estudante no banco de dados

async function addStudent(student: NewStudent): Promise<PouchDB.Core.Response | void> {
    const id = randomUUID()

    const data: Student = {
        ...student,
        _id: id
    }

    return db.put(data)
        .then(response => console.log(response))
        .catch(error => console.error("Erro ao cadastrar", error))
}

ipcMain.handle("add-student", async (event, student: Student) => {
    const result = await addStudent(student)
    return result
})

async function fetchAllStudents():Promise<Student[]> {
    try{
        const result = await db.allDocs({ include_docs: true })
        return result.rows.map(row => row.doc as Student )
    }catch(err){
        console.log("ERRO AO BUSCAR ", err)
        return []
    }
}

ipcMain.handle("fetch-all-students", async () => {
    return await fetchAllStudents()
})

// Busca clientes pelo id

async function fetchSudentById(studentId: string) {
    return db.get(studentId)
            .then(student => student)
            .catch(err => {
                console.log("Erro ao buscar pelo Id", err)
                return null
            })
}   

ipcMain.handle("fetch-student-id", async (event, studentId) => {
    const result = await fetchSudentById(studentId)
    return result
})