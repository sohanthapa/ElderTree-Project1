import React, { Component } from "react";
import LogInButton from "../login/LogInButton";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { API } from "aws-amplify";
import { Link as RouterLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";



export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
  
    this.setState({ isLoading: true });
  
    try {
      const attachment = this.file
        ? await s3Upload(this.file)
        : null;
  
      await this.createNote({
        attachment,
        content: this.state.content
      });
      this.props.history.push("/dashboard");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  
  
  
  createNote(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }
  

  render() {
    return (
        <div>
        <Container>
        <Box my={2}>
              <Button variant="contained" color="secondary">
              <RouterLink to="/dashboard" style={{ textDecoration: 'none', color: 'white' }} >
                Go Back to Dashboard
              </RouterLink>
              </Button>
        </Box>
        <form  onSubmit={this.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="content"
          type="textarea"
          value={this.state.content}
          onChange={this.handleChange}
          label="Create a New Note"
          name="content"
          autoFocus
        />
        <LogInButton
         block
         bsSize="large"
         disabled={!this.validateForm()}
         type="submit"
         isLoading={this.state.isLoading}
         text="Create"
        
         variant="contained"
         color="primary"
         fullWidth
         loadingText="Creating"
      />
        </form>   
        </Container> 
      </div>
    );
  }
}
