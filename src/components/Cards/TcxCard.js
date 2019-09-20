import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, Grid, List } from "semantic-ui-react";
import { tcxTypeToText } from "../../constants/tcxType";
import hex2ascii from "hex2ascii";

export default function TcxCard(props) {
  let { link, tcx } = props;

  let { tcxType, nodeIds, owner } = tcx;

  return (
    <Card as={Link} to={link}>
      <Card.Content>
        <Card.Header>{hex2ascii(tcx.contentHash)}</Card.Header>
        <Card.Meta>TCX #{tcx.tcxId}</Card.Meta>
        <Card.Description>
          <List>
            <List.Item>
              <List.Icon name="list ul" />
              <List.Content>
                {tcxTypeToText[tcxType] || "Unknown"} type
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="user" />
              <List.Content>GE #{owner}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="sort numeric up" />
              <List.Content>{nodeIds.length || "0"} nodes</List.Content>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
