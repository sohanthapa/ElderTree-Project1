import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { API } from "aws-amplify";
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

export default class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    
  
    try {
      const notes = await this.notes();
      this.setState({ notes });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  notes() {
    return API.get("notes", "/notes");
  }
  

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? <LinkContainer
              key={note.noteId}
              to={`/notes/${note.noteId}`}
            >
              <List>
                <ListItem>
                  <ListItemText
                  primary={note.content.trim().split("\n")[0]}
                  secondary={"Created: " + new Date(note.createdAt).toLocaleString()}>  
                  </ListItemText>  
                </ListItem>
              </List>
            </LinkContainer>
          : null
    );
  }
  
  



  render() {
    return (
      <div>
       <Box>
         {!this.state.isLoading && this.renderNotesList(this.state.notes)}
       </Box> 
      </div>
    );
  }
}
