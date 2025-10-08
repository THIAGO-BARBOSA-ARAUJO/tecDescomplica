import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Editstudent from "../components/BoxEditStudent"
import DeleteDialog from "../components/BoxDelete";

export function TableStudents(){

    interface StudentTable {
        name: string,
        cpf: number,
        email: string,
        course: string,
        idStudent: number
    }

    const Alunos: StudentTable[] = [
        {
            name: "Thiago",
            cpf: 12547845,
            email: "thiago.araujo@outlook.com",
            course: "Automação",
            idStudent: 1
        },
        {
            name: "Niely",
            cpf: 12562547,
            email: "niely.araujo@outlook.com",
            course: "Comandos Elétricos",
            idStudent: 1
        },
        {
            name: "Niely",
            cpf: 12562547,
            email: "niely.araujo@outlook.com",
            course: "Comandos Elétricos",
            idStudent: 1
        },
        {
            name: "Niely",
            cpf: 12562547,
            email: "niely.araujo@outlook.com",
            course: "Comandos Elétricos",
            idStudent: 1
        },
        {
            name: "Niely",
            cpf: 12562547,
            email: "niely.araujo@outlook.com",
            course: "Comandos Elétricos",
            idStudent: 1
        },
        {
            name: "Niely",
            cpf: 12562547,
            email: "niely.araujo@outlook.com",
            course: "Comandos Elétricos",
            idStudent: 1
        },
        {
            name: "Niely",
            cpf: 12562547,
            email: "niely.araujo@outlook.com",
            course: "Comandos Elétricos",
            idStudent: 1
        },
        {
            name: "Niely",
            cpf: 12562547,
            email: "niely.araujo@outlook.com",
            course: "Comandos Elétricos",
            idStudent: 1
        },
        {
            name: "Niely",
            cpf: 12562547,
            email: "niely.araujo@outlook.com",
            course: "Comandos Elétricos",
            idStudent: 1
        },
    ]
    
    return(
        <div className='mt-8 mr-5 ml-5'>
            <TableContainer className="h-[calc(100vh_-_350px)]" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>NOME</TableCell>
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">EMAIL</TableCell>
                        <TableCell align="center">COURSE</TableCell>
                        <TableCell align="left">ACTIONS</TableCell>
                    
                    </TableRow>
                    </TableHead>
                    <TableBody >
                    {Alunos.map((student) => (
                        <TableRow
                        key={student.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {student.name}
                        </TableCell>
                        <TableCell align="center">{student.cpf}</TableCell>
                        <TableCell align="center">{student.email}</TableCell>
                        <TableCell align="center">{student.course}</TableCell>
                        <TableCell align="right">
                            <div className='flex w-14 justify-between'>
                                <Editstudent type='Edit'/>
                                
                                <DeleteDialog title='Deletar Aluno?' message='Deseja realmente excluir o Aluno?'/>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}