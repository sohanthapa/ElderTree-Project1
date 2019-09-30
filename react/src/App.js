/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './Routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };
  }

  async componentDidMount() {
    try {
    //         await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async () => {
  //    await Auth.signOut();
    this.userHasAuthenticated(false);

    // eslint-disable-next-line react/destructuring-assignment
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/');
  };

  render() {
    const childProps = {
    // eslint-disable-next-line react/destructuring-assignment
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };
    return (
    // eslint-disable-next-line react/destructuring-assignment
      !this.state.isAuthenticating && (
      <div className="">
        <CssBaseline />
        <Routes childProps={childProps} />
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {this.state.isAuthenticated ? (
          <Box
            position="absolute"
            top="16px"
            right="16px"
            zIndex="5000"
            display="flex"
            justifyContent="center"
            mx="auto"
          >
            <Button
              onClick={this.handleLogout}
              variant="contained"
              color="primary"
            >
            Log out
            </Button>
          </Box>
        ) : (
          <Fragment />
        )}
      </div>
      )
    );
  }
}
export default withRouter(App);
