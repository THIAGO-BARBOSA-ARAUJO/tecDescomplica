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


interface EditInterface {
  type: string
}

export default function Editstudent(props: EditInterface) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteUser = () => {
    console.log("Usuário deletado!")
  };

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
          <div className='flex flex-col pl-8 pr-8 bg-white shadow-2xl m-auto w-[calc(100vw-100px)] h-[calc(100vh-130px)] mt-[-100px] rounded-lg'>
            <h1 className=''>Conteúdo</h1>
          </div>
        </div>

        {/* botoes parte inferior */}
        <DialogActions className='mt-4'>
          <Button 
          onClick={handleClose}
          variant="contained"
          >
            Fechar
          </Button>
          <Button color="error" onClick={DeleteUser}>Excluir</Button>
        
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}