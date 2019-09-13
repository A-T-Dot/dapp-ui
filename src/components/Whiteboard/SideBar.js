import React from "react";
import {
  Card,
  Search,
} from "semantic-ui-react";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [
        { id: 5, name: 'yogurt.jpg'},
        { id: 6, name: 'polkadot.md'},
        { id: 7, name: 'hello.whiteboard'}
      ]
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(arrayIndex) {
    let { onChoose } = this.props;
    let { nodes } = this.state;
    
    onChoose(nodes[arrayIndex]);

  }

  render() {
    let { nodes } = this.state;

    return (
      <div className="sidebar">
        <Search />
        <Card.Group centered>
          { nodes.map((node, index) => {
            return (
              <Card
                fluid
                key={node.id}
                header={node.name}
                onClick={() => this.handleClick(index)}
              />
            );
          })}
        </Card.Group>
          {/* <Card fluid header="Option 3" onClick={() => this.handleClick(3)} /> */}
      </div>
    );
  }
}
