import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Form from "./Form"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.CloseModal()
  };


  function Register(){
    return <div>
      <Form formtype="Register" handleClose={props.CloseModal}/>
    </div>
   }
   
   function Login(){
     return <div>
          <Form formtype="Login" handleClose={props.CloseModal}/>
     </div>
   }
   

  return (
    <div>
      <Modal
        aria-labelledby={props.title}
        aria-describedby={props.desc}
        className={classes.modal}
        open={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <div className={classes.paper}>
          {props.formType==="Login" ? <Login />:<Register />}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
