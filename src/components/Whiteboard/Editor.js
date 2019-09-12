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
    >
      <Card className={`n${node.id}`} style={{margin: '0em', top: padding, left: padding, position: 'absolute'}}>
        <Card.Content>
          <Card.Header>{node.id}</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
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
      nodes: [{id: 1, x: 10, y: 10}, {id: 2, x: 200, y: 200}, {id: 3, x: 500, y:500}],
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
        className={`bg-grid${chosenNode ? ' pointer' : ''}`}
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
          to="n2"
          within="bg-grid"
          borderColor="black"
          delay={true}
        />
        <LinkTo
          from="n2"
          to="n3"
          within="bg-grid"
          borderColor="black"
          delay={true}
        />
      </div>
    );
  }
}
