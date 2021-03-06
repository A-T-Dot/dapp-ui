import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, Grid, List, Header } from "semantic-ui-react";
import { nodeTypeToText } from "../../constants/nodeType";
import Ipfs from "../../utils/Ipfs";

export default function NodeCard(props) {
  let { link, node } = props;
  let { sources, nodeType, referredBy, likeCount, admireCount } = node;
  return (
    <Card as={Link} to={link}>
      <Card.Content>
        <Header className="break-word" size="small">
          {Ipfs.getCIDv0fromContentHashStr(node.nodeId).toString()}
        </Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <List>
            <List.Item>
              <List.Icon name="file" />
              <List.Content>{nodeTypeToText[nodeType] || "0"}</List.Content>
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
                referred by {(referredBy && referredBy.length) || "0"} nodes
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="external alternate" />
              <List.Content>
                {(likeCount) || "0"} likes
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="external alternate" />
              <List.Content>
                {(admireCount) || "0"} admired
              </List.Content>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
