import React from "react";
import {
  Image,
  Card,
  Button
} from "semantic-ui-react";
import Draggable from "react-draggable";
import LinkTo from "react-lineto";

function DraggableNode(props) {
  let { dragHandlers, node } = props;

  return (
    <Draggable
      bounds="parent"
      {...dragHandlers}
      defaultPosition={{ x: 30, y: 30 }}
    >
      <Card className={`n${node.id}`}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          <Card.Header>Steve Sanders</Card.Header>
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
      nodes: [{id: 1}, {id: 2}, {id: 3}],
    };
  }

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onDrag = () => {
    // TODO: don't rerender the whole page, update only those changed
    this.setState({ state: this.state });
  }

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  bgClicked(e) {
    let { clientX, clientY, target } = e
    let rect = target.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop, onDrag: this.onDrag };

    return (
      <div
        className="bg-grid"
        style={{ height: "3000px", width: "3000px", position: "relative" }}
        onClick={this.bgClicked}
      >
        {this.state.nodes.map(node => {
          return (
            <DraggableNode
              key={node.id}
              dragHandlers={dragHandlers}
              node={node}
            />
          );
        })}

        <LinkTo from="n1" to="n2" within="bg-grid" borderColor="black" delay={true} />
        <LinkTo from="n2" to="n3" within="bg-grid" borderColor="black" delay={true} />
      </div>
    );
  }
}
