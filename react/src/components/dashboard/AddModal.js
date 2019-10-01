import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

function getModalStyle() {
   const top = 50;
   const left = 50;

   return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
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
         margin: theme.spacing(1)
      }
   },
   iconSmall: {
      fontSize: 20
   }
}));

export default function AddModal(props) {
   const classes = useStyles();
   const [modalStyle] = useState(getModalStyle);

   //   const [fName] = useState();
   const [lName] = useState();
   const [birthDate] = useState();
   const [salary] = useState();
   const [jobTitle] = useState();
   const [gender] = useState();

   const {
      modalState,
      handleClose,
      handleSubmit,
      handleChange,
      employee
   } = props;

   return (
      <div>
         <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={modalState}
            onClose={handleClose}
         >
            <div style={modalStyle} className={classes.paper}>
               <h2 id="simple-modal-title">Employee Details</h2>

               <form className={classes.form}>
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="firstName"
                     type="text"
                     value={employee.FirstName}
                     onChange={handleChange}
                     label="First Name"
                     name="First Name"
                     autoComplete="on"
                     autoFocus
                  />
                  <TextField
                     margin="normal"
                     variant="outlined"
                     required
                     fullWidth
                     name="lastName"
                     label="Last Name"
                     type="text"
                     value={lName}
                     onChange={handleChange}
                     id="lastName"
                     autoComplete="on"
                  />
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     name="birthDate"
                     label="DOB"
                     type="text"
                     value={birthDate}
                     onChange={handleChange}
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
                     onChange={handleChange}
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
                     onChange={handleChange}
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
                     onChange={handleChange}
                     id="gender"
                     autoComplete="on"
                  />

                  <Button
                     text="Sign In"
                     className={classes.submit}
                     variant="contained"
                     color="primary"
                     fullWidth
                     onClick={handleSubmit}
                  >
                     Submit
                  </Button>
                  <Button
                     variant="contained"
                     color="secondary"
                     fullWidth
                     className={classes.button}
                     onClick={handleClose}
                  >
                     Cancel
                  </Button>
               </form>
            </div>
         </Modal>
      </div>
   );
}
