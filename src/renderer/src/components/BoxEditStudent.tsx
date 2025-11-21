import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import fetch from 'electron-fetch'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { NewStudent, Student } from '~/src/shared/types/ipc';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


interface EditInterface {
  type: string
  GetAllStudents: any,
  student: Student
}

export default function Editstudent(props: EditInterface) {

  const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm();
  const today = moment().format().split("T")[0]
 
  //variáveis
  const [open, setOpen] = React.useState(false);
  
  const [dateBirth, setDateBirth] = React.useState<string>();

  const [startCourse, setStartCourse] = React.useState<any>();

  const [course, setCourse] = React.useState<any>("Instalações Elétrica");

  const [sexo, setSexo] = React.useState<any>("Masculino");

  const [viacep, setViaCep] = React.useState<any>({});
  

  //functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset()
    setViaCep({})
    props.GetAllStudents()
  };

  function FormatDate(date: any) {
    const oldDate = String(date).split("T")[0].split("-")
    const newDate = `${oldDate[0]}-${oldDate[1]}-${oldDate[2]}`
    return newDate
  }

  const onSubmit = async (data: any) => {
    
    data.dateBirth = dateBirth
    data.startCourse = startCourse
    data.Course = course
    data.sexo = sexo


    if(props.type === "Edit") {
      data._rev = props.student._rev
      data._id = props.student._id
      
      const response = await window.api.editStudent(data)
      if(response?.ok === true) {
        toast(`Os dados foi editado com sucesso`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
      else {
        toast(`Erro ao editar informações do aluno ${props.student.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }

      //reset()
      // data.dateBirth = ""
      // data.startCourse = ""
      // data.Course = ""
      // data.sexo = ""

       props.GetAllStudents()
       handleClose()
    }else {
      console.log("data",data)
      const response = await window.api.addStudent(data)
      console.log("resp",response)
      if(response?.ok === true) {
        toast(`O aluno foi cadastrado com sucesso`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
      else {
        toast(`Erro ao cadastrar informações do aluno(a)`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }

      props.GetAllStudents()
      handleClose()
    }
  
  }

  const handleInput = async (event: any) => {
    const response = await window.api.fetchAddress(event.target.value)
    if(response.bairro !== "" && response.bairro !== null && response.bairro !== undefined){
      setViaCep(response)
      console.log(viacep)
    }
  }; 
  

  return (
    <React.Fragment>
      <div>
        {props.type === "Edit"? <EditIcon color='info' sx={{ cursor: 'pointer' }} onClick={handleClickOpen}/> : <Button onClick={handleClickOpen} variant="contained">Cadastrar Aluno</Button> }
      </div>
      <Dialog
      fullScreen
        sx={{
            "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                //maxWidth: "400px", // Set your desired max-width here
                },
            },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        
         {/* header */}
        <div className='w-screen h-52 bg-[#03A9F4]'>
            <div className='flex justify-between '>
                {
                    props.type === "Register" ? 
                    <p className='mt-5 font-bold ml-4 text-[#ffffff]'>CADASTRAR</p>
                    :
                    <p className='mt-5 font-bold ml-4 text-[#ffffff]'>Alunos {'>'} Edite {'>'} {props.student.name}</p>
                }
                <div className='flex justify-center w-5 self-end  mr-3'>
                    <IconButton
                        size='small'
                        color="secondary"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
        </div>
        
        {/* box principal */}
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='relative'>
            <div className='pt-10 pb-16 overflow-y-auto flex flex-col pl-8 pr-8 bg-white shadow-2xl m-auto w-[calc(100vw-100px)] h-[calc(100vh-130px)] mt-[-100px] rounded-lg'>
              
              <div className='flex justify-between gap-16'>
                  <TextField defaultValue={props.type === "Edit" ? props.student.name : ""} className='w-screen' {...register('name')} id="name" label="Nome" variant="standard" />

                  <TextField defaultValue={props.type === "Edit" ? props.student.registration : ""} type='number' className='w-screen' {...register('registration')} id="registration" label="Código de Matrícula" variant="standard" />
              </div>

              <div className='flex justify-between mt-9 gap-16'>
                <TextField defaultValue={props.type === "Edit" ? props.student.cpf : ""} sx={{ mt: 1}} {...register('cpf')} id="cpf" label="CPF" variant="standard" />
                
                <TextField defaultValue={props.type === "Edit" ? props.student.rg : ""} sx={{ mt: 1}} {...register('rg')} id="rg" label="RG" variant="standard" />

                <FormControl variant="standard" sx={{ mt: 1, minWidth: 120 }}>
                  <InputLabel id="inputSexo">Sexo</InputLabel>
                  <Select sx={{ m: 1, minWidth: 140, maxWidth: 140 }}
                    labelId="sexo"
                    id="sexo"
                    //value={sexo}
                    defaultValue={props.type === "Edit" ? props.student.sexo : "Masculino"}
                    onChange={(sexo: SelectChangeEvent) => setSexo(sexo.target.value)}
                    label="Sexo"
                  >
                    <MenuItem value="Não informado">
                      <em>Não informado</em>
                    </MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                  </Select>
                </FormControl>
  
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={props.type === "Edit" ? dayjs(props.student.dateBirth) : dayjs(today)}
                    label="Data de Nascimento"
                    //value={dayjs(dateBirth) ?? dayjs(dateBirth)}
                    onChange={(newValue: any) => setDateBirth(moment(newValue.$d).format("YYYY-MM-DD"))}
                    format="DD/MM/YYYY" // Adicione esta prop
                  />
                </LocalizationProvider>
              </div>

              <div className='flex justify-between mt-9 gap-16'>
                  <TextField defaultValue={props.type === "Edit" ? props.student.email : ""} className='w-screen' {...register('email')} id="email" label="Email" variant="standard" />

                  <TextField defaultValue={props.type === "Edit" ? props.student.nameMother : ""} className='w-screen' {...register('nameMother')} id="nameMother" label="Nome da Mãe" variant="standard" />
              </div>

              <div className='flex justify-between mt-9 gap-16'>
                  <TextField defaultValue={props.type === "Edit" ? props.student.profession : ""} {...register('profession')} id="profession" label="Profissão" variant="standard" />

                  <TextField defaultValue={props.type === "Edit" ? props.student.maritalStatus : ""} {...register('maritalStatus')} id="maritalStatus" label="Estado Civil" variant="standard" />

                  <TextField defaultValue={props.type === "Edit" ? props.student.financialSituation : ""} {...register('financialSituation')} id="financialSituation" label="Situação Financeira" variant="standard" />

                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel id="inputSexo">Curso</InputLabel>
                      <Select sx={{ m: 1, minWidth: 180, maxWidth: 180 }}
                        labelId="course"
                        id="course"
                        value={course}
                        defaultValue={props.type === "Edit" ? props.student.Course : "Instalações Elétrica"}
                         onChange={(course: SelectChangeEvent) => setCourse(course.target.value)}
                        label="Curso"
                      >
                        <MenuItem value="Instalações Elétrica">Instalações Elétrica</MenuItem>
                        <MenuItem value="Comandos Elétricos">Comandos Elétricos</MenuItem>
                        <MenuItem value="Automação">Automação</MenuItem>
                      </Select>
                  </FormControl>
              </div>

              <div className='flex justify-between mt-9 gap-16'>
                  <TextField defaultValue={props.type === "Edit" ? props.student.telephone : ""} type='number' sx={{ mt: 1}} className='w-screen' {...register('telephone')} id="telephone" label="Telefone" variant="standard" />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className='w-screen'
                      defaultValue={props.type === "Edit" ? dayjs(props.student.startCourse) : dayjs(today)}
                      //defaultValue={dayjs(moment().format())}
                      label="Inicio do Curso"
                      //value={dayjs(startCourse) ?? dayjs(startCourse)}
                      onChange={(newValue: any) => startCourse(moment(newValue.$d).format("YYYY-MM-DD"))}
                      format="DD/MM/YYYY" // Adicione esta prop
                    />
                  </LocalizationProvider>
              </div>

              <div className='mt-16'>
                <h1 className='text-[20px] font-bold text-[#11181c]'>Endereço</h1>
              </div>

              <div className='flex justify-between mt-9 gap-16'>
                  <TextField  
                    defaultValue={props.type !== "Edit" && viacep.logradouro ? setValue("street",viacep.logradouro) : (props.type === "Edit" ? props.student.street : setValue("street", ""))} 
                  
                    className='w-screen' {...register('street')} 
                  
                    id="street" label="Rua" 
                  
                    variant="standard" />

                  <TextField defaultValue={props.type === "Edit" ? props.student.number : ""} className='w-screen' type='number' {...register('number')} id="number" label="Número" variant="standard" />

                  <TextField 
                    value={props.type !== "Edit" && viacep.complemento ? setValue("complement",viacep.complemento) : setValue("complement", "")}
                    
                    defaultValue={props.type !== "Edit" && viacep.complemento ? setValue("complement",viacep.complemento) : (props.type === "Edit" ? props.student.complement : setValue("complement", ""))}
                    
                    className='w-screen' {...register('complement')} id="complement" 
                    
                    label="Complement" variant="standard" />
                  
              </div>

              <div className='flex justify-between mt-9 gap-16'>
                  <TextField  
                  
                  defaultValue={props.type !== "Edit" && viacep.bairro ? setValue("neighborhood", viacep.bairro) : (props.type === "Edit" ? props.student.neighborhood : setValue("neighborhood", ""))}
                  
                  className='w-screen' {...register('neighborhood')} id="neighborhood" 
                  
                  label="Bairro" 
                  
                  variant="standard" />

                  <TextField 
                  
                  defaultValue={props.type !== "Edit" && viacep.estado ? setValue("state", viacep.estado) : (props.type === "Edit" ? props.student.state : setValue("state", ""))}
                  
                  className='w-screen' {...register('state')} 
                  
                  id="state" 
                  
                  label="Estado" 
                  
                  variant="standard" />

                  <TextField defaultValue={props.type === "Edit" ? props.student.cep : ""} onInput={handleInput} type='number' className='w-screen' {...register('cep')} id="cep" label="Cep" variant="standard" />
                  
              </div>

            </div>
        </div>

        {/* botoes parte inferior */}
        <DialogActions className='mt-4'>
          <Button 
          type='submit'
          variant="contained"
          >
            Salvar
          </Button>
          <Button color="error" onClick={handleClose}>Fechar</Button>
        
        </DialogActions>

        </form>
      </Dialog>
    </React.Fragment>
  );
}