import React from "react";
import {
  Card,
  Search,
} from "semantic-ui-react";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(nodeId) {
    let { onChoose } = this.props;
    onChoose(nodeId);

  }

  render() {
    return (
      <div className="sidebar">
        <Search />
        <Card.Group centered>
          <Card fluid header="Option 1" onClick={() => this.handleClick(1)} />
          <Card fluid header="Option 2" onClick={() => this.handleClick(2)} />
        </Card.Group>
          {/* <Card fluid header="Option 3" onClick={() => this.handleClick(3)} /> */}
      </div>
    );
  }
}
