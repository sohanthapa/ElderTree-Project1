import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
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
  },
}));


export default function UpdateModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  // First name, Last Name, DOB, Salary, Job Title, Update Button, Cancel Button
  // Hooks for input values
  const test = 'Change Value to real employee name';
  const [fName, setfName] = useState(test);
  const [lName, setlName] = useState(test);
  const [birthDate, setBirthDate] = useState(test);
  const [salary, setSalary] = useState(20);
  const [jobTitle, setJobTitle] = useState(test);
  
  
  console.log(fName);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p>Click to get the full Modal experience!</p>
      <button type="button" onClick={handleOpen}>
        Test Modal Edit Employee
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit Employee Details</h2>
          <form className={classes.form} onSubmit=''>
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
              label="Date of Birth"
              type="date"
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
              type="number"
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