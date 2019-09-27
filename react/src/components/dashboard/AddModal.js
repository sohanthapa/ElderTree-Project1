import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import LogInButton from '../login/LogInButton';
import EmployeeService from '../../EmployeeService';

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
  
  // Refactor -  TOO DRY 
  const [fName, setfName] = useState();
  const [lName, setlName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [salary, setSalary] = useState();
  const [jobTitle, setJobTitle] = useState();
  const [gender, setGender] = useState();
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const employeeData = {
    ID: '3',
    FirstName: `${fName}`,
    LastName: `${lName}`,
    DOB: `${birthDate}`,
    Salary: `${salary}`,
    Title: `${jobTitle}`,
    Gender: `${gender}`,

  };
  const onPostEmployeeSuccess = () => {
    console.log('Success');
 };

 const onPostEmployeeError = (error) => {
    console.log('Failed to post', error.response);
 };
    // Refactor
    async function postToEmployee() {
      
    EmployeeService.Insert(employeeData, onPostEmployeeSuccess, onPostEmployeeError);
    
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Test submit button
    alert(`Submitting Information for employee: ${fName}`)
 
    postToEmployee();
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
              value={fName}
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
              value={lName}
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
              type="text"
              value={birthDate}
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
              type="text"
              value={salary}
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
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              id="jobTitle"
              autoComplete="on"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Gender"
              label="Gender"
              type="text"
              value={gender}
              onChange={e => setGender(e.target.value)}
              id="gender"
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