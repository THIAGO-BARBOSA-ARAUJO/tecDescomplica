import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface Delete {
  title: string,
  message: string
  idStudent: string
  GetAllStudents: any
}

export default function DeleteDialog(props: Delete) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteUser = async () => {
    const id = props.idStudent
    const response = await window.api.deleteStudent(id)
    props.GetAllStudents()
    handleClose()
    
  };

  return (
    <React.Fragment>
      <div>
        <DeleteRoundedIcon color='error' sx={{ cursor: 'pointer' }} onClick={handleClickOpen}/>
      </div>
      <Dialog
        sx={{
            "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "400px", // Set your desired max-width here
                },
            },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={handleClose}
          variant="contained">
            Fechar
          </Button>
          <Button color="error" onClick={DeleteUser}>Excluir</Button>
        
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}