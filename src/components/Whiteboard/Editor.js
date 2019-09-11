import React from "react";
import {
  Image,
  Card,
  Button
} from "semantic-ui-react";
import Draggable from "react-draggable";


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0
    };
  }

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };
  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };

    return (
      <div
        className="bg-grid"
        style={{ height: "3000px", width: "3000px", padding: "10px" }}
      >
        <Draggable bounds="parent" {...dragHandlers}>
          <Card>
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              />
              <Card.Header>Steve Sanders</Card.Header>
              <Card.Meta>Friends of Elliot</Card.Meta>
              <Card.Description>
                Steve wants to add you to the group{" "}
                <strong>best friends</strong>
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
      </div>
    );
  }
}
