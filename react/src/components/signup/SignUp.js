import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LogInButton from '../login/LogInButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import UserService from '../../UserService';
import axios from 'axios';

const styles = theme => ({
   '@global': {
      body: {
         backgroundColor: 'white'
      }
   },
   paper: {
      marginTop: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
   },
   avatar: {
      margin: 8,
      backgroundColor: 'red'
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: 16
   },
   submit: {
      margin: 20
   }
});

class SignUp extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isLoading: false,
         email: '',
         password: '',
         confirmPassword: '',
         confirmationCode: '',
         newUser: null
      };
   }
   validateForm() {
      return (
         this.state.email.length > 0 &&
         this.state.password.length > 0 &&
         this.state.password === this.state.confirmPassword
      );
   }

   validateConfirmationForm() {
      return this.state.confirmationCode.length > 0;
   }

   handleChange = event => {
      this.setState({
         [event.target.id]: event.target.value
      });
   };

   onUserSignUpSuccess = response => {
      console.log('success', response);
   };

   onUserSignupError = response => {
      console.log('error', response);
   };
   handleSubmit = async event => {
      event.preventDefault();

      const userSignUp = {
         Id: '1',
         FirstName: 'Jan Paulo',
         LastName: 'Gozum',
         Email: this.state.email,
         DOB: 'DOB',
         Gender: 'M',
         Password: this.state.password
      };

      UserService.SignUp(
         userSignUp,
         this.onUserSignUpSuccess,
         this.onUSerSignupError
      );

      alert('Redirect to login - Change');

      // try {
      //    const newUser = await Auth.signUp({
      //       username: this.state.email,
      //       password: this.state.password
      //    });
      //    this.setState({
      //       newUser
      //    });
      // } catch (e) {
      //    alert(e.message);
      // }

      this.setState({ isLoading: false });
   };

   handleConfirmationSubmit = async event => {
      event.preventDefault();

      this.setState({ isLoading: true });

      // try {
      //    await Auth.confirmSignUp(
      //       this.state.email,
      //       this.state.confirmationCode
      //    );
      //    await Auth.signIn(this.state.email, this.state.password);

      //    this.props.userHasAuthenticated(true);
      //    this.props.history.push('/dashboard');
      // } catch (e) {
      //    alert(e.message);
      //    this.setState({ isLoading: false });
      // }
   };

   renderConfirmationForm() {
      const { classes } = this.props;
      return (
         <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
               <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
               >
                  <form onSubmit={this.handleConfirmationSubmit}>
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="confirmationCode"
                        type="tel"
                        value={this.state.confirmationCode}
                        onChange={this.handleChange}
                        label="Confirmation Code "
                        name="confirmationCode"
                        autoComplete="confirmation"
                        autoFocus
                     />
                     <LogInButton
                        block
                        bsSize="large"
                        disabled={!this.validateConfirmationForm()}
                        type="submit"
                        className={classes.submit}
                        isLoading={this.state.isLoading}
                        text="Verify"
                        loadingText="Verifying…"
                     />
                  </form>
               </Box>
            </div>
         </Container>
      );
   }

   renderForm() {
      const { classes } = this.props;
      return (
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
               my={16}
               display="flex"
               flexDirection="column"
               justifyContent="center"
               alignItems="center"
            >
               <Avatar className="classes.avatar">
                  <LockOutlinedIcon />
               </Avatar>
               <Box my={2}>
                  <Button variant="contained" color="secondary">
                     <RouterLink
                        to="/"
                        style={{ textDecoration: 'none', color: 'white' }}
                     >
                        Go back to login
                     </RouterLink>
                  </Button>
               </Box>

               <Box mb={2}>
                  <Typography component="h1" variant="h5">
                     Sign up
                  </Typography>
                  <Typography component="h1" variant="h5"></Typography>
               </Box>
               <form
                  onSubmit={this.handleSubmit}
                  className="classes.form"
                  noValidate
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                           required
                           fullWidth
                           type="email"
                           id="email"
                           value={this.state.email}
                           onChange={this.handleChange}
                           label="Email Address"
                           name="email"
                           autoComplete="email"
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           value={this.state.password}
                           onChange={this.handleChange}
                           autoComplete="current-password"
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                           required
                           fullWidth
                           name="confirmPassword"
                           label="Confirm Password"
                           type="password"
                           id="confirmPassword"
                           value={this.state.confirmPassword}
                           onChange={this.handleChange}
                           autoComplete="current-password"
                        />
                     </Grid>
                  </Grid>
                  <Box mt={2}>
                     <LogInButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Sign Up"
                        fullWidth
                        className={classes.submit}
                        variant="contained"
                        color="primary"
                        loadingText="Signing up…"
                     />
                  </Box>
               </form>
            </Box>
         </Container>
      );
   }

   render() {
      return (
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            {this.state.newUser === null
               ? this.renderForm()
               : this.renderConfirmationForm()}
         </Container>
      );
   }
}
SignUp.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
