import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, Grid, List } from "semantic-ui-react";

export default function NodeCard(props) {
  let { link, node } = props;
  return (
    <Card as={Link} to={link}>
      <Card.Content>
        <Card.Header className='break-word'>Node #{node.nodeId}</Card.Header>
        <Card.Description>test</Card.Description>
      </Card.Content>
    </Card>
  );
}
