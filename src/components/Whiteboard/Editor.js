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
  let { dragHandlers, node, padding, onLinkClicked, onCardClicked } = props;

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
        onClick={(e) => {onCardClicked(e, node.id)}}
      >
        <Card.Content header={node.name} className="handle move" />
        <Card.Content>
          <Card.Meta className="break-word">{node.id}</Card.Meta>
          <Card.Description className="break-word">
            description here
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            primary
            animated="vertical"
            onClick={(e, data) => {onLinkClicked(e, node.id);}}
          >
            <Button.Content hidden>Link</Button.Content>
            <Button.Content visible>
              <Icon name="linkify" />
            </Button.Content>
          </Button>
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
          x: 10,
          y: 10,
          name: "bob.mp4"
        },
        { id: 2, x: 200, y: 200, name: "bob.txt" },
        { id: 3, x: 500, y: 500, name: "hello.txt" }
      ],
      links: [
        { source: 1, target: 2},
        { source: 2, target: 3}
      ],
      activeLink: null
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

    if(activeLink) {
      this.setState({
        activeLink: null,
        links: [...this.state.links, { source: activeLink, target: nodeId }]
      });
    }

  }
  

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop, onDrag: this.onDrag };
    let { padding, chosenNode } = this.props;
    let { nodes, links } = this.state;
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
