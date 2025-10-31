import { Header } from "../components/Header";


export function EditStudent() {

    async function handleAdd() {
        const response = await window.api.fetchUsers()
        console.log(response)
    }

    async function handleStudentById() {
        const response= await window.api.fetchStudentByID("16d7fa92-0d6e-4188-bbcc-e0a8ce7b1b4a")
        console.log(response)
    }

    return (
        <div>
            <Header/>
            <h1>Página de edição do aluno aluno</h1>
            <button onClick={handleAdd}>BUSCAR USUÁRIOS</button>
            <br/>
            <button onClick={handleStudentById}>BUSCAR USUÁRIO PELO ID</button>
        </div>
    )
}