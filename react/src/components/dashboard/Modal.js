import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import LogInButton from '../login/LogInButton';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

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
        Test Modal for edit/add
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
              id="email"
              type="email"
              value='{this.state.email}'
              onChange='{this.handleChange}'
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value='{this.state.password}'
              onChange='{this.handleChange}'
              id="password"
              autoComplete="current-password"
            />
            
            <LogInButton
              block
              bsSize="large"
              disabled='{!this.validateForm()}'
              type="submit"
              isLoading='{this.state.isLoading}'
              text="Sign In"
              className={classes.submit}
              variant="contained"
              color="primary"
              fullWidth
              // loadingText="Signing In..."
            />
     
           
          </form>
         
        </div>
      </Modal>
    </div>
  );
}