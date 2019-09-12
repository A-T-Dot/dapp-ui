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
      nodes: [{id: 1, x: 10, y: 10}, {id: 2, x: 200, y: 200}, {id: 3, x: 500, y:500}],
    };
  }

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onDrag = (e, data) => {
    // TODO: don't rerender the whole page, update only those changed
    this.setState({ state: this.state });
    console.log(data);
  }

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  bgClicked(e) {
    let { clientX, clientY, target } = e
    let rect = target.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    
    console.log(x,y);
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop, onDrag: this.onDrag };
    let padding = '10px';

    return (
      <div
        className="bg-grid"
        style={{ height: "3000px", width: "3000px", padding }}
        onClick={this.bgClicked}
      >
        {this.state.nodes.map(node => {
          return (
            <DraggableNode
              key={node.id}
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
