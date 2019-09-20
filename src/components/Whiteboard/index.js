import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Header,
  Grid,
  Image,
  Card,
  Search,
  Button,
  Menu,
  Icon,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Editor from './Editor';
import logo from "../../castor.svg";
import Ipfs from "../../utils/Ipfs";
import chain from "../../api/chain";
import { nodeType } from "../../constants/nodeType"

export class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenNode: null,
      loading: false,
      dimmerActive: false,
      cid: '',
      redirect: false
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

  async createNode (hash, type, sources) {
    const keys = chain.getKey();
    const nodeCreateRes = await chain.nodeCreate(keys, hash, type, sources);
    console.log("---nodeCreate return:", nodeCreateRes);
  }
  handleClick = async () => {
    if(!this.editorRef) {
      console.log("Cannot find editor");
      return;
    } 
    let { nodes, links, root } = this.editorRef.state;
    
    let nodeObj = {
      nodes: nodes.map((node) => {
        return node.nodeId
      }),
      links,
      root,
    };

    this.setState({
      loading: true,
      dimmerActive: true,
    })
    let cid = await Ipfs.add([JSON.stringify(nodeObj)]);
    let contentHashBuf = Ipfs.getContentHashBufFromCIDv0(cid);
    console.log("uploaded to ipfs", cid.toString());

    await this.createNode(contentHashBuf, nodeType.WHITEBOARD, nodeObj.nodes)
    // let res2 = await Ipfs.get(cid2);
    // console.log(JSON.parse(res2));

    this.setState({ loading: false, cid});
    var that = this;
    setTimeout(() => {
      that.setState({
        dimmerActive: false,
        redirect: true
      });
    }, 3000);

  }


  render() {

    let { chosenNode, loading, dimmerActive, cid, redirect } = this.state;
    
    if(redirect) {
      return <Redirect to="/content" />;
    }

    let dimmerContent;
    if (loading) {
      dimmerContent = <Loader content="Loading" />;
    } else {
      dimmerContent = (
        <Header as="h2" icon inverted>
          <Icon name="checkmark" />
          Node Created
          <Header.Subheader>{cid.toString()}</Header.Subheader>
        </Header>
      );
    }
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
        <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
        <Grid>
          <Grid.Row columns={2} style={{ height: "100%", padding: "0px" }}>
            <Grid.Column
              width={4}
              style={{
                maxHeight: "100%",
                overflow: "auto",
                paddingRight: "0px"
              }}
            >
              <Sidebar onChoose={this.chooseNode} />
            </Grid.Column>
            <Grid.Column
              width={12}
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