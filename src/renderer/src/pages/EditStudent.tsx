import { Header } from "../components/Header";


export function EditStudent() {

    async function handleAdd() {
        const response = await window.api.fetchUsers()
        console.log(response)
    }

    return (
        <div>
            <Header/>
            <h1>Página de edição do aluno aluno</h1>
            <button onClick={handleAdd}>BUSCAR USUÁRIOS</button>
        </div>
    )
}