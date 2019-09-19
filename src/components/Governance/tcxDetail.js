import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Grid, List, Header } from 'semantic-ui-react';
import NodeCard from '../Cards/NodeCard';
import axios from '../../api/axios';

function listItem (elements) {
  let items = elements.map((ele, index) => {
    return <NodeCard key={index} link={`/node/${ele.nodeId}`} node={ele} />;
  });

  return items
}

export function TCXDetail (props) {
  const { tcxid } = props.match.params;
  const [balance, setBalance] = useState({ atdot: 50, token: 30 });
  const [current, setCurrent] = useState({
    index: tcxid,
    content: "some desc"
  });
  const [nodes, setNodes] = useState([]);

  const items = listItem(nodes);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(`/api/v1/tcxs/${tcxid}`);
        let { data, error } = response;
        if (error) {
          console.log(error);
          return;
        }
        // TODO: Pay attention here. Replace api?
        console.log(data.nodes);
        setNodes(data.nodes);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []); 

  return (
    <Container>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' size='large'>
            TCX #{current.index}: {current.content}
          </Header>
          <Button floated='right' primary>
            Add Content Node
          </Button>
        </Grid.Column>
        <Grid.Column width={16}>
          Your balance: {balance.atdot}ATDot, {balance.token}GE{current.index}{" "}
          Token
        </Grid.Column>
      </Grid>

      <Card.Group itemsPerRow={3}>{items}</Card.Group>
    </Container>
  );
}

