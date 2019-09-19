import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, Grid, List } from "semantic-ui-react";

export default function GeCard(props) {
  let { link, ge } = props;
  return (
    <Card as={Link} to={link}>
      <Card.Content>
        <Card.Header>GE #{ge.geId}</Card.Header>
        <Card.Description>
          test
        </Card.Description>
      </Card.Content>
    </Card>
  );
}