import React from "react";
import {
  Card,
  Search,
  Button, Icon
} from "semantic-ui-react";
import { nodeType, nodeTypeToText } from "../../constants/nodeType";
import NodeViewerModal from "../Modals/NodeViewerModal";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [
        { id: 5, name: "yogurt", nodeType: 0 },
        { id: 6, name: "polkadot", nodeType: 7 },
        { id: 7, name: "cat", nodeType: 0 },
        { id: 8, name: "dog", nodeType: 4 }
      ]
    };

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
              <Card fluid key={node.id} onClick={() => this.handleClick(index)}>
                <Card.Content>
                  <Card.Header>{node.name}</Card.Header>
                  <Card.Meta>{node.id}</Card.Meta>
                  <Card.Description>
                    {nodeTypeToText[node.nodeType]}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <NodeViewerModal
                    trigger={
                      <Button
                        circular
                        icon="eye"
                        floated="right"
                        onClick={e => e.stopPropagation()}
                      />
                    }
                  />
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </div>
    );
  }
}
