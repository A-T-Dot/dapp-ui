import React from "react";
import {
  Image,
  Card,
  Button,
  Icon,
  Header
} from "semantic-ui-react";
import Draggable from "react-draggable";
import LinkTo from "react-lineto";
import { nodeType, nodeTypeToText } from "../../constants/nodeType";
import NodeViewerModal from '../Modals/NodeViewerModal';

function DraggableNode(props) {
  let {
    dragHandlers,
    node,
    padding,
    onLinkClicked,
    onCardClicked,
    isLinking,
    setRoot,
    isRoot
  } = props;

  return (
    <Draggable
      bounds="parent"
      {...dragHandlers}
      defaultPosition={{ x: node.x, y: node.y }}
      handle=".handle"
    >
      <Card
        className={`n${node.id}`}
        style={{
          margin: "0em",
          top: padding,
          left: padding,
          position: "absolute"
        }}
        onClick={e => {
          onCardClicked(e, node.id);
        }}
      >
        <Card.Content
          className={`handle break-word${isLinking ? " pointer" : " move"}${
            isRoot ? " red" : ""
          }`}
        >
          {/* <Button circular icon="close" floated="right" size="mini" /> */}
          <Header size="small">{node.name}</Header>
        </Card.Content>
        <Card.Content className={isLinking ? "pointer" : "default-cursor"}>
          <Card.Meta className="break-word">{node.id}</Card.Meta>
          <Card.Description className="break-word">
            {nodeTypeToText[node.nodeType]}
          </Card.Description>
        </Card.Content>
        <Card.Content
          extra
          className={isLinking ? "pointer" : "default-cursor"}
        >
          <div className="ui three buttons">
            <Button
              color="red"
              animated="vertical"
              onClick={(e, data) => {
                setRoot(e, node.id);
              }}
            >
              <Button.Content hidden>Set Root</Button.Content>
              <Button.Content visible>
                <Icon name="chess king" />
              </Button.Content>
            </Button>
            <Button
              color="blue"
              animated="vertical"
              onClick={(e, data) => {
                onLinkClicked(e, node.id);
              }}
            >
              <Button.Content hidden>Link</Button.Content>
              <Button.Content visible>
                <Icon name="linkify" />
              </Button.Content>
            </Button>
            <NodeViewerModal
              trigger={
                <Button color="green" animated="vertical">
                  <Button.Content hidden>Preview</Button.Content>
                  <Button.Content visible>
                    <Icon name="eye" />
                  </Button.Content>
                </Button>
              }
            />
          </div>
        </Card.Content>
      </Card>
    </Draggable>
  );
}


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      nodes: [
        {
          id: "QmeY8rh5x5832wQD8mWt6cDEiX3uJHrSnEYURZQcNWBuYW",
          x: 200,
          y: 10,
          name: "hi.jpg",
          nodeType: 0
        },
        {
          id: "QmVFX5VKCN2cEGtB7JrHms1Bq9PcFQ7cDhHHujgYVyfzSA",
          x: 100,
          y: 400,
          name: "bob.md",
          nodeType: 7
        },
        {
          id: "QmRC9s7W4a5mr3wuXDuM53CHvXKPexDaVc1342oYgp1fZQ",
          x: 500,
          y: 500,
          name: "hello.txt",
          nodeType: 1
        }
      ],
      links: [
        {
          source: "QmeY8rh5x5832wQD8mWt6cDEiX3uJHrSnEYURZQcNWBuYW",
          target: "QmVFX5VKCN2cEGtB7JrHms1Bq9PcFQ7cDhHHujgYVyfzSA"
        }
      ],
      activeLink: null,
      root: null
    };
  }

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onDrag = (e, data) => {
    // TODO: don't rerender the whole page, update only those changed
    this.setState({ state: this.state });
    // console.log(data);
  }

  onStop = () => {
    // TODO: don't rerender the whole page, update only those changed
    this.setState({ state: this.state });
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  onBgClicked = (e) => {

    let { clientX, clientY, target } = e
    let { padding, clearChosen, chosenNode } = this.props;
    if(chosenNode) {
      if(target.classList.contains("bg-grid")) {

        let rect = target.getBoundingClientRect();
        let x = Math.round(clientX - rect.left) - padding;
        let y = Math.round(clientY - rect.top) - padding;

        this.setState({nodes: [...this.state.nodes, {...chosenNode, x, y}]})

        // console.log(x, y);
      }
      clearChosen();
    }
    // console.log(target.classList);

  }

  onLinkClicked = (e, nodeId) => {
    let { clearChosen } = this.props;

    e.stopPropagation();
    clearChosen();

    this.setState({
      activeLink: nodeId
    })
    console.log(nodeId);
  }

  onCardClicked = (e, nodeId) => {
    let { clearChosen } = this.props;
    let { activeLink } = this.state;

    e.stopPropagation();
    clearChosen();

    if(activeLink && activeLink != nodeId) {
      this.setState({
        activeLink: null,
        links: [...this.state.links, { source: activeLink, target: nodeId }]
      });
    }

  }
  
  setRoot = (e, nodeId) => {
    let { clearChosen } = this.props;

    e.stopPropagation();
    clearChosen();

    this.setState({
      root: nodeId
    })
    console.log("set root");
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop, onDrag: this.onDrag };
    let { padding, chosenNode } = this.props;
    let { nodes, links, activeLink, root } = this.state;
    return (
      <div
        className={`bg-grid${chosenNode ? " pointer" : ""}`}
        style={{ height: "3000px", width: "3000px", padding: `${padding}px` }}
        onClick={this.onBgClicked}
      >
        {nodes.map((node, index) => {
          return (
            <DraggableNode
              key={index}
              dragHandlers={dragHandlers}
              node={node}
              padding={padding}
              onLinkClicked={this.onLinkClicked}
              onCardClicked={this.onCardClicked}
              isLinking={!!activeLink}
              setRoot={this.setRoot}
              isRoot={node.id == root}
            />
          );
        })}
        { links.map((link, index) => {
          return (
            <LinkTo
              key={index}
              from={`n${link.source}`}
              fromAnchor="bottom center"
              to={`n${link.target}`}
              toAnchor="top center"
              within="bg-grid"
              borderColor="black"
              delay={true}
            />
          );
        })}

      </div>
    );
  }
}
