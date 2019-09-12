import React, { useState, useEffect } from "react";
import { Container, Header, Grid, Image, Card, Search, Button } from "semantic-ui-react";
import Draggable from 'react-draggable'; 
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Editor from './Editor';
export class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenNode: null
    };
  }

  chooseNode = (node) => {
    this.setState({
      chosenNode: node
    });
    console.log(node);
  }

  clearChosen = () => {
    this.setState({chosenNode: null});
  }

  render() {
    let { chosenNode } = this.state;

    return (
      <Grid style={{ height: "80vh" }}>
        <Grid.Row columns={3} style={{ height: "100%", padding: "0px" }}>
          <Grid.Column
            width={3}
            style={{ maxHeight: "100%", overflow: "auto" }}
          >
            <Sidebar onChoose={this.chooseNode}/>
          </Grid.Column>
          <Grid.Column
            width={10}
            style={{
              maxHeight: "100%",
              overflow: "auto",
              position: "relative",
              padding: "0px"
            }}
          >
            <Editor chosenNode={chosenNode} clearChosen={this.clearChosen} padding={10}/>
          </Grid.Column>
          <Grid.Column
            width={3}
            style={{ maxHeight: "100%", overflow: "auto" }}
          >
            <Toolbar/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}