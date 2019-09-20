import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Grid, List, Header } from 'semantic-ui-react';
import NodeCard from '../Cards/NodeCard';
import axios from '../../api/axios';
import Tasks from "./Tasks";
import hex2ascii from "hex2ascii";
import Ipfs from "../../utils/Ipfs";

function listItem (elements) {
  let items = elements.map((ele, index) => {
    return <NodeCard key={index} link={`/node/${Ipfs.getCIDv0fromContentHashStr(ele.nodeId).toString()}`} node={ele} />;
  });

  return items
}

export function TCXDetail (props) {
  const { tcxid } = props.match.params;
  const [balance, setBalance] = useState({ atdot: 50, token: 30 });
  const [current, setCurrent] = useState({
    index: tcxid,
    metadata: "some desc"
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
        setCurrent({ metadata: data.contentHash });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []); 

  const [tasks, setTasks] = useState([]);

  // fetch tcxtasks
  useEffect(() => {
    async function fetchData() {
      try {
        // TODO: change to dynamic key
        const response = await axios(`/api/v1/tcxs/${tcxid}/tasks`);
        let { data, error } = response;
        if (error) {
          console.log(error);
          return;
        }
        console.log("data", data);
        setTasks(data);
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
          <Header floated="left" size="large">
            TCX #{tcxid}: {hex2ascii(current.metadata)}
          </Header>
          <Button floated="right" primary>
            Add Content Node
          </Button>
        </Grid.Column>
        <Grid.Column width={16}>
          Your balance: {balance.atdot}ATDot, {balance.token}GE{current.index}{" "}
          Token
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width={12}>
          <Card.Group itemsPerRow={3}>{items}</Card.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Tasks tasks={tasks} />
        </Grid.Column>
      </Grid>
    </Container>
  );
}

