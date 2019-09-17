import React from "react";
import {
  Image,
  Card,
  Button,
  Icon
} from "semantic-ui-react";
import Draggable from "react-draggable";
import LinkTo from "react-lineto";

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
          className={`handle${isLinking ? " pointer" : " move"}${
            isRoot ? " red" : ""
          }`}
        >
          <Card.Header>
            {node.name}
            <Button circular icon="close" floated='right' size='mini'/>
          </Card.Header>
        </Card.Content>
        <Card.Content className={isLinking ? "pointer" : "default-cursor"}>
          <Card.Meta className="break-word">{node.id}</Card.Meta>
          <Card.Description className="break-word">
            description here
          </Card.Description>
        </Card.Content>
        <Card.Content
          extra
          className={isLinking ? "pointer" : "default-cursor"}
        >
          <div className="ui two buttons">
            <Button
              primary
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
            <Button
              color='red'
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
          id: 1,
          x: 200,
          y: 10,
          name: "bob.mp4"
        },
        { id: 2, x: 100, y: 400, name: "bob.txt" },
        { id: 3, x: 500, y: 500, name: "hello.txt" }
      ],
      links: [
        { source: 1, target: 2},
      ],
      activeLink: null,
      root: null,
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

        this.setState({nodes: [...this.state.nodes, {id: chosenNode.id, name: chosenNode.name,x, y}]})

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
