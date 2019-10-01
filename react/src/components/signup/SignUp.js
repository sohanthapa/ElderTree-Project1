import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import UserService from '../../services/UserService';
import LogInButton from '../login/LogInButton';

// eslint-disable-next-line no-unused-vars
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
         userExists: ''
      };
   }

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

   onUserSignUpSuccess = (response) => {
     // eslint-disable-next-line no-console
     if (response.status === 200) {
     this.props.userHasAuthenticated(true);
     this.props.history.push("/dashboard");
     }
   };

  onUserSignupError = (response) => {
    // eslint-disable-next-line no-console
    return this.setState({ userExists: 'Email already registered!'});
  };

   handleSubmit = async (event) => {
     // Destructure
     const { email, password } = this.state;
     event.preventDefault();

     const userSignUp = {
        Id: '1',
        FirstName: 'Jan Paulo',
        LastName: 'Gozum',
        Email: email,
        DOB: '112595',
        Gender: 'M',
        Password: password,
     }
      UserService.SignUp(
         userSignUp,
         this.onUserSignUpSuccess,
         this.onUSerSignupError
      );
     

     UserService.SignUp(
       userSignUp,
       this.onUserSignUpSuccess,
       this.onUserSignupError,
     );
     // eslint-disable-next-line no-alert
     
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

   handleChange = event => {
      this.setState({
         [event.target.id]: event.target.value
      });
   };

   

   validateForm() {
      const { email, password, confirmPassword } = this.state;
      return (
         email.length > 0 && password.length > 0 && password === confirmPassword
      );
   }

   renderForm() {
      const { classes } = this.props;
      // eslint-disable-next-line object-curly-newline
      const { email, password, confirmPassword, isLoading } = this.state;
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
                  <Typography component="h1" variant="h6" color="secondary">
                     {this.state.userExists}
                  </Typography>
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
                           value={email}
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
                           value={password}
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
                           value={confirmPassword}
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
                        isLoading={isLoading}
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
            {this.renderForm()}
         </Container>
      );
   }
}
SignUp.propTypes = {
   // eslint-disable-next-line react/forbid-prop-types
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
