import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Grid, Image, Card, Search, Button, Menu, Icon } from "semantic-ui-react";
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Editor from './Editor';
import logo from "../../castor.svg";
import Ipfs from "../../utils/Ipfs";


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

  handleClick = async () => {
    if(!this.editorRef) {
      console.log("Cannot find editor");
      return;
    } 
    let { nodes, links, root } = this.editorRef.state;
    
    let nodeObj = {
      nodes: nodes.map((node) => {
        return node.id
      }),
      links,
      root,
    };

    let cid = await Ipfs.add([JSON.stringify(nodeObj)]);
    console.log(cid.buffer.toString('hex'));
    let contentHashBuf = Ipfs.getContentHashBufFromCIDv0(cid);
    console.log(
      Ipfs.getCIDv0fromContentHashStr(
        "0x4e8ac7dc3a61da3354ebf3ee7ed24b57df4762c2ef318c125f23cdd759362b63"
      )
    );
    // let res2 = await Ipfs.get(cid2);
    // console.log(JSON.parse(res2));


  }


  render() {
    let { chosenNode } = this.state;

    return (
      <div className="whiteboard">
        <Menu>
          <Menu.Item as={Link} to="/content">
            <Icon name="arrow alternate circle left" />
          </Menu.Item>
          <Menu.Item as={Link} to="/">
            <img src={logo} alt="logo" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button primary onClick={this.handleClick}>
                Submit
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Grid>
          <Grid.Row columns={2} style={{ height: "100%", padding: "0px" }}>
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
              width={13}
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
                ref={editorRef => {
                  this.editorRef = editorRef;
                }}
              />
            </Grid.Column>
            {/* <Grid.Column
              width={3}
              style={{ maxHeight: "100%", overflow: "auto" }}
            >
              <Toolbar />
            </Grid.Column> */}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}