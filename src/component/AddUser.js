import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography, Modal,TextField,} from '@material-ui/core';
import './AddUser.css'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import fb from "../config/firebase";
import { v4 as uuidv4 } from 'uuid';



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
  },
    text:{
      marginRight:'5%',
    },
    textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(-3),
    width: 200,
        // marginTop:'2%',
  },
    group1:{
      display:'flex',
    },
     group2:{
      display:'flex',
         marginTop:'2%',
    },

}));




function AddUser(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [name, setName] = React.useState('')
    const [run, setRun] = React.useState('')
    const [type, setType] = React.useState('')
    const [date, setDate] = React.useState('')
    const [point, setPoint] = React.useState(0)
     const [productID, setproductID] = React.useState(uuidv4())

    async function Player(props) {
         fb.firestore()
            .collection("player")
            .doc(productID)
            .set({
              name: name,
                run: run,
                type: type,
                date: date,
                point: point,
                id: productID,
            }).then(handleClose()).then({
             setPoint: setPoint(''),
             setDate: setDate(''),
             setType: setType(''),
             setName: setName(''),
             setRun: setRun(''),
             setproductID: setproductID(uuidv4)
         })
    }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div className='main'>
            <Typography className='heading' variant="h4" component="h2">
                Leader Board
            </Typography>
            <Button className='btn' variant="outlined" onClick={handleOpen}>Add Player</Button>
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
              <div className={classes.group1}>
              <TextField className={classes.text} value={name} onChange={e => setName(e.target.value)} id="outlined-basic" label="Player Name" variant="outlined" />
               <TextField className={classes.text} value={run}  onChange={text => setRun(text.target.value)} id="outlined-basic" label="Running Km" variant="outlined" type='number'/>
               <TextField  className={classes.text} value={type} onChange={text => setType(text.target.value)}id="outlined-basic" label="Type: Run/Walk" variant="outlined" />
              </div>
              <div className={classes.group2}>
             <TextField
                 value={date}
                  onChange={text => setDate(text.target.value)}
                 id="date"
                 label="Date"
                 type="date"
                 defaultValue=""
                 className={classes.textField}
                 InputLabelProps={{
                     shrink: true,
                 }}
            />
              <Button className='btn1' variant="outlined" onClick={() =>Player()} >Add</Button>
              </div>
          </div>
        </Fade>
      </Modal>
        </div>
    );
}

export default AddUser;