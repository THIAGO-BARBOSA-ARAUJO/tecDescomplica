import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import { useEffect } from 'react';


interface EditInterface {
  type: string
  GetAllStudents: any,
  student: Student
}

export default function Editstudent(props: EditInterface) {
 
  const day = moment().format()
 
  //variáveis
  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState<string>("");

  const [registration, setRegistration] = React.useState<number>(0);

  const [cpf, setCpf] = React.useState<string>("");

  const [rg, setRg] = React.useState<string>("");
  
  const [dateBirth, setDateBirth] = React.useState<any>();

  const [email, setEmail] = React.useState<string>("");

  const [nameMother, setNameMother] = React.useState<string>("");

  const [profission, setProfission] = React.useState<string>("");

  const [maritalStatus, setMaritalStatus] = React.useState<string>("");

  const [financialSituation, setFinancialSituation] = React.useState<string>("");

  const [telephone, setTelephone] = React.useState<number>(0);

  const [street, setStreet] = React.useState<string>("");

  const [namber, setNamber] = React.useState<number>(0);

  const [complement, setComplement] = React.useState<string>("");

  const [neighborhood, setNeighborhood] = React.useState<string>("");

  const [state, setState] = React.useState<string>("");

  const [cep, setCep] = React.useState<number>(0);

  const [startCourse, setStartCourse] = React.useState<any>();

  const [course, setCourse] = React.useState<any>();

  const [sexo, setSexo] = React.useState<any>();
  

  //functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.GetAllStudents()
  };

  function FormatDate(date: any) {
    const oldDate = String(date).split("T")[0].split("-")
    const newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`
    return newDate
  }

  const SaveStudent = async () => {

    const rawStudent: NewStudent = {
      name: name,
      registration: registration,
      cpf: cpf,
      rg: rg,
      dateBirth: dateBirth === undefined ? FormatDate(moment().format()) : dateBirth,
      sexo: sexo,
      email: email,
      nameMother: nameMother,
      profession: profission,
      maritalStatus: maritalStatus,
      financialSituation: financialSituation,
      Course: course,
      telephone: telephone,
      startCourse: startCourse === undefined ? FormatDate(moment().format()) : startCourse,
      street: street,
      number: namber,
      complement: complement,
      neighborhood: neighborhood,
      state: state,
      cep: cep,
    }
  
    const response = await window.api.addStudent(rawStudent)
    props.GetAllStudents()
    handleClose()
  };

  useEffect(() => {
    if(props.type === "Edit") {
      console.log('lalalala', props?.student)
    }else {
      console.log('ta no cadastrar')
    }
  }, [])

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
        <div className='relative'>
          <div className='pt-10 pb-16 overflow-y-auto flex flex-col pl-8 pr-8 bg-white shadow-2xl m-auto w-[calc(100vw-100px)] h-[calc(100vh-130px)] mt-[-100px] rounded-lg'>
            
            <div className='flex justify-between gap-16'>
                <TextField defaultValue={props.type === "Edit" ? props.student.name : ""} className='w-screen' onChange={(name) => setName(name.target.value)} id="name" label="Nome" variant="standard" />

                <TextField defaultValue={props.type === "Edit" ? props.student.registration : ""} type='number' className='w-screen' onChange={(registration) => setRegistration(Number(registration.target.value))} id="registration" label="Código de Matrícula" variant="standard" />
            </div>

            <div className='flex justify-between mt-9 gap-16'>
              <TextField defaultValue={props.type === "Edit" ? props.student.cpf : ""} sx={{ mt: 1}} onChange={(cpf) => setCpf(cpf.target.value)} id="cpf" label="CPF" variant="standard" />
              
              <TextField defaultValue={props.type === "Edit" ? props.student.rg : ""} sx={{ mt: 1}} onChange={(rg) => setRg(rg.target.value)} id="rg" label="RG" variant="standard" />

              <FormControl variant="standard" sx={{ mt: 1, minWidth: 120 }}>
                <InputLabel id="inputSexo">Sexo</InputLabel>
                <Select sx={{ m: 1, minWidth: 140, maxWidth: 140 }}
                  labelId="sexo"
                  id="sexo"
                  value={sexo}
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
                  defaultValue={props.type === "Edit" ? dayjs(props.student.dateBirth) : dayjs(moment().format())}
                  label="Data de Nascimento"
                  //value={dayjs(dateBirth) ?? dayjs(dateBirth)}
                  onChange={(newValue: any) => setDateBirth(FormatDate(moment(newValue.$d).format()))}
                  format="DD/MM/YYYY" // Adicione esta prop
                />
              </LocalizationProvider>
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField defaultValue={props.type === "Edit" ? props.student.email : ""} className='w-screen' onChange={(email) => setEmail(email.target.value)} id="email" label="Email" variant="standard" />

                <TextField defaultValue={props.type === "Edit" ? props.student.nameMother : ""} className='w-screen' onChange={(nameMother) => setNameMother(nameMother.target.value)} id="nameMother" label="Nome da Mãe" variant="standard" />
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField defaultValue={props.type === "Edit" ? props.student.profession : ""} onChange={(profission) => setProfission(profission.target.value)} id="profission" label="Profissão" variant="standard" />

                <TextField defaultValue={props.type === "Edit" ? props.student.maritalStatus : ""} onChange={(maritalStatus) => setMaritalStatus(maritalStatus.target.value)} id="maritalStatus" label="Estado Civil" variant="standard" />

                <TextField defaultValue={props.type === "Edit" ? props.student.financialSituation : ""} onChange={(financialSituation) => setFinancialSituation(financialSituation.target.value)} id="financialSituation" label="Situação Financeira" variant="standard" />

                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                  <InputLabel id="inputSexo">Curso</InputLabel>
                    <Select sx={{ m: 1, minWidth: 180, maxWidth: 180 }}
                      labelId="course"
                      id="course"
                      value={course}
                      defaultValue={props.type === "Edit" ? props.student.Course : "Instalações Elétricas"}
                      onChange={(course: SelectChangeEvent) => setCourse(course.target.value)}
                      label="Curso"
                    >
                      <MenuItem value="Instalações Elétricas">Instalações Elétricas</MenuItem>
                      <MenuItem value="Comandos Elétricos">Comandos Elétricos</MenuItem>
                      <MenuItem value="Automação">Automação</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField defaultValue={props.type === "Edit" ? props.student.telephone : ""} type='number' sx={{ mt: 1}} className='w-screen' onChange={(telephone) => setTelephone(Number(telephone.target.value))} id="telephone" label="Telefone" variant="standard" />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className='w-screen'
                    defaultValue={props.type === "Edit" ? dayjs(props.student.startCourse) : dayjs(moment().format())}
                    //defaultValue={dayjs(moment().format())}
                    label="Inicio do Curso"
                    //value={dayjs(startCourse) ?? dayjs(startCourse)}
                    onChange={(newValue: any) => setStartCourse(FormatDate(moment(newValue.$d).format()))}
                    format="DD/MM/YYYY" // Adicione esta prop
                  />
                </LocalizationProvider>
            </div>

            <div className='mt-16'>
              <h1 className='text-[20px] font-bold text-[#11181c]'>Endereço</h1>
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField defaultValue={props.type === "Edit" ? props.student.street : ""} className='w-screen' onChange={(street) => setStreet(street.target.value)} id="street" label="Rua" variant="standard" />

                <TextField defaultValue={props.type === "Edit" ? props.student.number : ""} className='w-screen' type='number' onChange={(number) => setNamber(Number(number.target.value))} id="number" label="Número" variant="standard" />

                <TextField defaultValue={props.type === "Edit" ? props.student.complement : ""} className='w-screen' onChange={(complement) => setComplement(complement.target.value)} id="complement" label="Complement" variant="standard" />
                
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField defaultValue={props.type === "Edit" ? props.student.neighborhood : ""} className='w-screen' onChange={(neighborhood) => setNeighborhood(neighborhood.target.value)} id="neighborhood" label="Bairro" variant="standard" />

                <TextField defaultValue={props.type === "Edit" ? props.student.state : ""} className='w-screen' onChange={(state) => setState(state.target.value)} id="state" label="Estado" variant="standard" />

                <TextField defaultValue={props.type === "Edit" ? props.student.cep : ""} type='number' className='w-screen' onChange={(cep) => setCep(Number(cep.target.value))} id="cep" label="Cep" variant="standard" />
                
            </div>

          </div>
        </div>

        {/* botoes parte inferior */}
        <DialogActions className='mt-4'>
          <Button 
          onClick={SaveStudent}
          variant="contained"
          >
            Salvar
          </Button>
          <Button color="error" onClick={handleClose}>Fechar</Button>
        
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}