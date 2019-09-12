import React from "react";
import {
  Image,
  Card,
  Button
} from "semantic-ui-react";
import Draggable from "react-draggable";
import LinkTo from "react-lineto";

function DraggableNode(props) {
  let { dragHandlers, node, padding } = props;

  return (
    <Draggable
      bounds="parent"
      {...dragHandlers}
      defaultPosition={{ x: node.x, y: node.y }}
      handle='.handle'
    >
      <Card
        className={`n${node.id}`}
        style={{
          margin: "0em",
          top: padding,
          left: padding,
          position: "absolute"
        }}
      >
        <Card.Content header={node.name} className='handle move'/>
        <Card.Content>
          <Card.Meta className='break-word'>{node.id}</Card.Meta>
          <Card.Description className='break-word'>
            QmPxGdk9e6p1ZgMRvN6QuQGApZ5b8MPHg5EYkkkj3DSGqQ
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Approve
            </Button>
            <Button basic color="red">
              Decline
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
          x: 10,
          y: 10,
          name: "bob.mp4"
        },
        { id: 2, x: 200, y: 200, name: "bob.txt" },
        { id: 3, x: 500, y: 500, name: "hello.txt" }
      ]
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

  bgClicked = (e) => {

    let { clientX, clientY, target } = e
    let { padding, clearChosen, chosenNode } = this.props;

    if(target.classList.contains("bg-grid")) {

      let rect = target.getBoundingClientRect();
      let x = Math.round(clientX - rect.left) - padding;
      let y = Math.round(clientY - rect.top) - padding;

      if(chosenNode) {
        this.setState({nodes: [...this.state.nodes, {id: chosenNode, x, y}]})
      }
      console.log(x, y);
    }

    clearChosen();

  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop, onDrag: this.onDrag };
    let { padding, chosenNode } = this.props;

    return (
      <div
        className={`bg-grid${chosenNode ? " pointer" : ""}`}
        style={{ height: "3000px", width: "3000px", padding: `${padding}px` }}
        onClick={this.bgClicked}
      >
        {this.state.nodes.map((node, index) => {
          return (
            <DraggableNode
              key={index}
              dragHandlers={dragHandlers}
              node={node}
              padding={padding}
            />
          );
        })}
        <LinkTo
          from="n1"
          fromAnchor="bottom center"
          to="n2"
          toAnchor="top center"
          within="bg-grid"
          borderColor="black"
          delay={true}
        />
        <LinkTo
          from="n2"
          fromAnchor="bottom center"
          to="n3"
          toAnchor="top center"
          within="bg-grid"
          borderColor="black"
          delay={true}
        />
      </div>
    );
  }
}
