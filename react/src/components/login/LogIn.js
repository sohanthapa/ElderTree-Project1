import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import LogInButton from './LogInButton';
import UserService from '../../services/UserService'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: 'white',
    },
  },
  paper: {
    marginTop: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 8,
    backgroundColor: 'red',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 16,
  },
  submit: {
    margin: 20,
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      invalidCredentials: '',
    };
  }
  
   handleChange = async (event) => {
     this.setState({
       [event.target.id]: event.target.value,
     });
   };

   

   onUserLogInSuccess = (response) => {
    // eslint-disable-next-line no-console
    this.props.history.push("/dashboard");
    this.props.userHasAuthenticated(true);
  };
  onUserLogInError = (response) => {
  
    // eslint-disable-next-line no-console
    return this.setState({ invalidCredentials: 'User account does not exist!'});
  };

   
   handleSubmit = async (event) => {
     const { email, password } = this.state;
     event.preventDefault();

     this.setState({ isLoading: true });

     const logInCredentials = {
      Email: email,
      Password: password
    }

     UserService.LogIn(
      logInCredentials,
      this.onUserLogInSuccess,
      this.onUserLogInError,
    );
    
     // try {
     //    await Auth.signIn(this.state.email, this.state.password);
     //    this.props.userHasAuthenticated(true);
     //    this.props.history.push('/dashboard');
     // } catch (e) {
     //    alert(e.message);
     //    this.setState({ isLoading: false });
     // }
     
     
     this.setState({ isLoading: false });
   };

   validateForm() {
     const { email, password } = this.state;
     return email.length > 0 && password.length > 0;
   }

   /* validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  } */

   render() {
     const { email, password } = this.state;
     const { classes } = this.props;
     return (
       <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
           <Avatar className={classes.avatar}>
             <LockOutlinedIcon />
           </Avatar>
           <Typography component="h1" variant="h5">
              Sign in
           </Typography>
           <Typography component="h1" variant="h6" color="secondary">
              {this.state.invalidCredentials}
           </Typography>
           <form className={classes.form} onSubmit={this.handleSubmit}>
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="email"
               type="email"
               value={email}
               onChange={this.handleChange}
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
               value={password}
               onChange={this.handleChange}
               id="password"
               autoComplete="current-password"
             />
             <FormControlLabel
               control={<Checkbox value="remember" color="primary" />}
               label="Remember me"
             />
             <LogInButton
               block
               bsSize="large"
               disabled={!this.validateForm()}
               type="submit"
               isLoading={this.state.isLoading}
               text="Sign In"
               className={classes.submit}
               variant="contained"
               color="primary"
               fullWidth
               loadingText="Signing In..."
             />

             <Grid container>
               <Grid item xs>
                 <Link href="#" variant="body2">
                    Forgot password?
                 </Link>
               </Grid>
               <Grid item>
                 <RouterLink
                   to="/signup"
                   style={{ textDecoration: 'none' }}
                 >
                   <Link variant="body2">Sign Up</Link>
                 </RouterLink>
               </Grid>
             </Grid>
           </form>
         </div>
       </Container>
     );
   }
}
Login.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);

