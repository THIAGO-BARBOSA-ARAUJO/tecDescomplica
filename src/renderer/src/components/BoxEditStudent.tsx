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


interface EditInterface {
  type: string
}

export default function Editstudent(props: EditInterface) {
 
  const day = moment().format()
 
  //variáveis
  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState<string>();

  const [registration, setRegistration] = React.useState<string>();

  const [cpf, setCpf] = React.useState<string>();

  const [rg, setRg] = React.useState<string>();
  
  const [dateBirth, setDateBirth] = React.useState<any>();

  const [email, setEmail] = React.useState<string>();

  const [nameMother, setNameMother] = React.useState<string>();

  const [profission, setProfission] = React.useState<string>();

  const [maritalStatus, setMaritalStatus] = React.useState<string>();

  const [financialSituation, setFinancialSituation] = React.useState<string>();

  const [street, setStreet] = React.useState<string>();

  const [namber, setNamber] = React.useState<string>();

  const [complement, setComplement] = React.useState<string>();

  const [neighborhood, setNeighborhood] = React.useState<string>();

  const [state, setState] = React.useState<string>();

  const [cep, setCep] = React.useState<string>();

  const [startCourse, setStartCourse] = React.useState<any>();

  const [course, setCourse] = React.useState<any>();

  const [sexo, setSexo] = React.useState<any>();


  const mockstudent = {
    name: "Thiago Araujo",
    registration: 0o1,
    cpf: "16953214724",
    rg: "297599334",
    dateBirth: "03-10-1996",
    sexo: "Masculino",
    email: "thiafo@gmail.com",
    nameMother: "Marilene",
    profession: "Técnico em mecatrônica",
    maritalStatus: "Solteiro",
    financialSituation: "Pago",
    Course: "Automação",
    telephone: 21970337418,
    startCourse: "05-05-2024",
    street: "Santa Rosa",
    number: 57,
    complement: "casa 19",
    neighborhood: "Bento Ribeiro",
    state: "Rio de Janeiro",
    cep: 21331420,
  }

  //functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function FormatDate(date: any) {
    const oldDate = String(date).split("T")[0].split("-")
    const newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`
    return newDate
  }

  const SaveStudent = () => {
    const response = window.api.addStudent(mockstudent)
    console.log(response)
  };

  async function GetAllStudents() {
    const response = await window.api.fetchAllStudents()
    console.log(response)
  }

  return (
    <React.Fragment>
      <div>
        <EditIcon color='info' sx={{ cursor: 'pointer' }} onClick={handleClickOpen}/>
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
                    props.type === "Edit" ? 
                    <p className='mt-5 font-bold ml-4 text-[#ffffff]'>CADASTRAR</p>
                    :
                    <p className='mt-5 font-bold ml-4 text-[#ffffff]'>Nome Aluno</p>
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
                <TextField className='w-screen' onChange={(name) => setName(name.target.value)} id="name" label="Nome" variant="standard" />

                <TextField type='number' className='w-screen' onChange={(registration) => setRegistration(registration.target.value)} id="registration" label="Código de Matrícula" variant="standard" />
            </div>

            <div className='flex justify-between mt-9 gap-16'>
              <TextField sx={{ mt: 1}} onChange={(cpf) => setCpf(cpf.target.value)} id="cpf" label="CPF" variant="standard" />
              
              <TextField sx={{ mt: 1}} onChange={(rg) => setRg(rg.target.value)} id="rg" label="RG" variant="standard" />

              <FormControl variant="standard" sx={{ mt: 1, minWidth: 120 }}>
                <InputLabel id="inputSexo">Sexo</InputLabel>
                <Select sx={{ m: 1, minWidth: 140, maxWidth: 140 }}
                  labelId="sexo"
                  id="sexo"
                  value={sexo}
                  defaultValue="Masculino"
                  onChange={(sexo: SelectChangeEvent) => setSexo(sexo)}
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
                  defaultValue={dayjs(moment().format())}
                  label="Data"
                  value={dateBirth}
                  onChange={(newValue: any) => setDateBirth(FormatDate(moment(newValue.$d).format()))}
                  format="DD/MM/YYYY" // Adicione esta prop
                />
              </LocalizationProvider>
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField className='w-screen' onChange={(email) => setEmail(email.target.value)} id="email" label="Email" variant="standard" />

                <TextField className='w-screen' onChange={(nameMother) => setNameMother(nameMother.target.value)} id="nameMother" label="Nome da Mãe" variant="standard" />
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField onChange={(profission) => setProfission(profission.target.value)} id="profission" label="Profissão" variant="standard" />

                <TextField onChange={(maritalStatus) => setMaritalStatus(maritalStatus.target.value)} id="maritalStatus" label="Estado Civil" variant="standard" />

                <TextField onChange={(financialSituation) => setFinancialSituation(financialSituation.target.value)} id="financialSituation" label="Situação Financeira" variant="standard" />

                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                  <InputLabel id="inputSexo">Curso</InputLabel>
                    <Select sx={{ m: 1, minWidth: 180, maxWidth: 180 }}
                      labelId="course"
                      id="course"
                      value={course}
                      defaultValue="Instalações Elétricas"
                      onChange={(course: SelectChangeEvent) => setCourse(course)}
                      label="Curso"
                    >
                      <MenuItem value="Instalações Elétricas">Instalações Elétricas</MenuItem>
                      <MenuItem value="Comandos Elétricos">Comandos Elétricos</MenuItem>
                      <MenuItem value="Automação">Automação</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField sx={{ mt: 1}} className='w-screen' onChange={(profission) => setProfission(profission.target.value)} id="profission" label="Profissão" variant="standard" />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className='w-screen'
                    defaultValue={dayjs(moment().format())}
                    label="Data"
                    value={startCourse}
                    onChange={(newValue: any) => setStartCourse(FormatDate(moment(newValue.$d).format()))}
                    format="DD/MM/YYYY" // Adicione esta prop
                  />
                </LocalizationProvider>
            </div>

            <div className='mt-16'>
              <h1 className='text-[20px] font-bold text-[#11181c]'>Endereço</h1>
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField className='w-screen' onChange={(street) => setStreet(street.target.value)} id="street" label="Rua" variant="standard" />

                <TextField className='w-screen' type='number' onChange={(number) => setNamber(number.target.value)} id="number" label="Número" variant="standard" />

                <TextField className='w-screen' onChange={(complement) => setComplement(complement.target.value)} id="complement" label="Complement" variant="standard" />
                
            </div>

            <div className='flex justify-between mt-9 gap-16'>
                <TextField className='w-screen' onChange={(neighborhood) => setNeighborhood(neighborhood.target.value)} id="neighborhood" label="Bairro" variant="standard" />

                <TextField className='w-screen' onChange={(state) => setState(state.target.value)} id="state" label="Estado" variant="standard" />

                <TextField type='number' className='w-screen' onChange={(cep) => setCep(cep.target.value)} id="cep" label="Cep" variant="standard" />
                
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
          <Button color="error" onClick={GetAllStudents}>Fechar</Button>
        
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}