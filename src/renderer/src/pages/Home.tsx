import { Header } from "../components/Header";
import { TableStudents } from "../components/TableStudents";

import Input from "@mui/material/Input";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


export function Home() {

    

    //const ariaLabel = { 'aria-label': 'description' };
    const navigate = useNavigate();
    return(
        <>  
            <header className="">
                <Header/>
            </header>
            <div className="bg-[#E7E5E4] h-screen">
                <div className="flex justify-between flex-col">
                    <h1 className="ml-5 mt-[2.5rem] text-[1.875rem] font-bold text-[#329CCA]">Gestão de Alunos</h1>
                    <p className="font-bold ml-5 mt-[.5rem] text-[#949494]">Configure e cadastre alunos</p>
                </div>

                <section className="mr-6 ml-6 mt-[1.75rem] flex justify-between items-center">
                    <div>
                        <p className="mb-2 text-[#727272] text-[16px] font-bold">Alunos</p>
                        
                        <div className="flex  items-center bg-[#ffff] w-[240px] h-[35px] rounded-xl pl-1">
                            <SearchIcon color="info"/>
                            <input className="pl-1 w-[200px] outline-none" type="text" />                                                 
                        </div>
                    </div>

                    <div>
                        <Button onClick={() => navigate('/editstudent')} variant="contained">Cadastrar Aluno</Button>
                    </div>
                </section>

                <section className="mb-10">
                    <TableStudents/>
                </section>
            </div>
        </>
    )
}


{/* <DeleteDialog title={"Exluir o Aluno?"} message={"Tem certeza que deseja excluir o aluno?"}/> */}