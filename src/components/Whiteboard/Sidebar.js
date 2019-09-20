import React from "react";
import { Card, Search, Button, Icon, Header, List } from "semantic-ui-react";
import { nodeType, nodeTypeToText } from "../../constants/nodeType";
import NodeViewerModal from "../Modals/NodeViewerModal";
import axios from "../../api/axios";
import Ipfs from "../../utils/Ipfs";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios("/api/v1/nodes");
      let { data, error } = response;
      if (error) {
        console.log(error);
        return;
      }
      console.log(data);
      this.setState({
        nodes: data
      })
    } catch (error) {
      console.error(error);
    }
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
        <Card.Group centered style={{padding: "0px 10px"}}>
          { nodes.map((node, index) => {
            
            let { sources, nodeType, referredBy, nodeId } = node;
            let cid = Ipfs.getCIDv0fromContentHashStr(nodeId).toString();

            return (
              <Card fluid key={nodeId} onClick={() => this.handleClick(index)}>
                <Card.Content>
                  <Header className="break-word" size="small">
                    {cid}
                  </Header>
                </Card.Content>
                <Card.Content>
                  <Card.Description>
                    <List>
                      <List.Item>
                        <List.Icon name="users" />
                        <List.Content>
                          {nodeTypeToText[nodeType] || "0"}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="linkify" />
                        <List.Content>
                          {(sources && sources.length) || "0"} cited sources
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="external alternate" />
                        <List.Content>
                          referred by {(referredBy && referredBy.length) || "0"}{" "}
                          nodes
                        </List.Content>
                      </List.Item>
                    </List>
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
                    cidStr={cid}
                    nodeType={nodeType}
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
