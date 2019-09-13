import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Grid, Image, Card, Search, Button, Menu, Icon } from "semantic-ui-react";
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Editor from './Editor';
import logo from "../../castor.svg";

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
      <div className="whiteboard">
        <Menu>
          <Menu.Item as={Link} to='/content'>
            <Icon name="arrow alternate circle left" />
          </Menu.Item>
          <Menu.Item as={Link} to='/'>
            <img src={logo} alt="logo" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button primary>Submit</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Grid>
          <Grid.Row columns={3} style={{ height: "100%", padding: "0px" }}>
            <Grid.Column
              width={3}
              style={{
                maxHeight: "100%",
                overflow: "auto",
                paddingRight: "0px"
              }}
            >
              <Sidebar onChoose={this.chooseNode} />
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
              <Editor
                chosenNode={chosenNode}
                clearChosen={this.clearChosen}
                padding={10}
              />
            </Grid.Column>
            <Grid.Column
              width={3}
              style={{ maxHeight: "100%", overflow: "auto" }}
            >
              <Toolbar />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}