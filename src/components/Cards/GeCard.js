import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, Grid, List } from "semantic-ui-react";
import hex2ascii from "hex2ascii";

export default function GeCard(props) {
  let { link, ge } = props;

  let { totalStaked, totalInvested, members, tcxIds } = ge;
  return (
    <Card as={Link} to={link}>
      <Card.Content>
        <Card.Header>{hex2ascii(ge.contentHash)}</Card.Header>
        <Card.Meta>GE #{ge.geId}</Card.Meta>
        <Card.Description>
          <List>
            <List.Item>
              <List.Icon name="users" />
              <List.Content>{Object.keys(members).length || "0"} members</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="numbered list" />
              <List.Content>{tcxIds.length || "0"} TCXs</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="money bill alternate outline" />
              <List.Content>{totalStaked || "0"} ATdot staked</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="money" />
              <List.Content>{totalInvested || "0"} ATdot invested</List.Content>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}