import { ipcMain } from 'electron'

// handle
ipcMain.handle("fetch-users", () => {
    console.log("BUSCANDO USUÁRIOS...")

    return [
        {id: 1, nome: "Thiago"},
        {id: 2, nome: "Niely"},
        {id: 3, nome: "Marilene"}
    ]
})