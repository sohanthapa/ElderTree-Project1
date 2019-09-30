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
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withStyles } from '@material-ui/styles';
import LogInButton from './LogInButton';

const styles = () => ({
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
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
    };
  }

   handleChange = (event) => {
     this.setState({
       [event.target.id]: event.target.value,
     });
   };

   handleSubmit = async (event) => {
     event.preventDefault();

     this.setState({ isLoading: true });
     // this.props.history.push('/dashboard');
     // try {
     //     await Auth.signIn(this.state.email, this.state.password);
     //     this.props.userHasAuthenticated(true);
     //  } catch (e) {
     //    alert(e.message);
     //     this.setState({ isLoading: false });
     // }
   };

   validateForm() {
     const { email, password } = this.state;
     return email.length > 0 && password.length > 0;
   }

   /* validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  } */

   render() {
     const { classes } = this.props;
     const {
       email,
       handleChange,
       password,
       isLoading,
     } = this.state;

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
           <form className={classes.form} onSubmit={this.handleSubmit}>
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="email"
               type="email"
               value={email}
               onChange={handleChange}
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
               onChange={handleChange}
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
               isLoading={isLoading}
               text="Sign In"
               className={classes.submit}
               variant="contained"
               color="primary"
               fullWidth
               loadingText="Signing In..."
             />

             <Grid container>
               <Grid item xs>
                 <Link href="" variant="body2">
                   Forgot password?
                 </Link>
               </Grid>
               <Grid item>
                 <RouterLink
                   to="/signup"
                   style={{ textDecoration: 'none' }}
                 >
                   <Link href="" variant="body2">
                     Sign Up
                   </Link>
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
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
