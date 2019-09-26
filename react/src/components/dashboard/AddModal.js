import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import LogInButton from '../login/LogInButton';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    button: {
      margin: theme.spacing(1),
    },
  },
  iconSmall: {
    fontSize: 20,
  },
}));


export default function AddModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  // First name, Last Name, DOB, Salary, Job Title, Update Button, Cancel Button
  // Hooks for input values
  
  const [fName, setfName] = useState();
  const [lName, setlName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [salary, setSalary] = useState();
  const [jobTitle, setJobTitle] = useState();
  
  
  console.log(fName);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Test submit button
    alert(`Submitting Information for: ${fName}`)
    setOpen(false);
  }

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleOpen}
      >
        <AddIcon className={classes.iconSmall} />
        Add Employee
       
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit Employee Details</h2>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              type="text"
              value=""
              onChange={e => setfName(e.target.value)}
              label="First Name"
              name="First Name"
              autoComplete="on"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="text"
              value=""
              onChange={e => setlName(e.target.value)}
              id="lName"
              autoComplete="on"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="birthDate"
              type="date"
              value=""
              onChange={e => setBirthDate(e.target.value)}
              id="birthDate"
              autoComplete="on"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="salary"
              label="Salary"
              type="number"
              value=""
              onChange={e => setSalary(e.target.value)}
              id="salary"
              autoComplete="on"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="jobTitle"
              label="Job Title"
              type="text"
              value=""
              onChange={e => setJobTitle(e.target.value)}
              id="jobTitle"
              autoComplete="on"
            />
          
            <LogInButton
              block
              bsSize="large"
              // disabled='{!this.validateForm()}'
              type="submit"
              // isLoading='{this.state.isLoading}'
              text="Sign In"
              className={classes.submit}
              variant="contained"
              color="primary"
              fullWidth
              // loadingText="Signing In..."
            />
            <Button variant="contained" color="secondary" fullWidth className={classes.button} onClick={handleClose}>
             Cancel
            </Button>
      
          </form>
        
        </div>
      </Modal>
    </div>
  );
}