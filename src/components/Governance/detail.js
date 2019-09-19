import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Grid, List } from 'semantic-ui-react';
import Tasks from './Tasks';
import axios from '../../api/axios';
import TcxCard from '../Cards/TcxCard';

function listItem (current, elements) {
  let items = elements.map((ele, index) => {
    return <TcxCard key={index} link={`/ge/${ele.owner}/tcx/${ele.tcxId}`} tcx={ele} />;
  });
  return items
}

export function GovernanceDetail (props) {

  const { geid } = props.match.params;
  const [current, setCurrent] = useState({
    index: geid,
    content: "some desc"
  });

  const [tcxs, setTcxs] = useState([]);
  const [balance, setBalance] = useState({ atdot: 50, token: 30 });

  const items = listItem(current, tcxs);

  // fetch tcxs
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios("/api/v1/tcxs");
        let { data, error } = response;
        if (error) {
          console.log(error);
          return;
        }
        console.log(data);
        setTcxs(data);
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
        const response = await axios(
          `/api/v1/ges/${current.index}/tasks`
        );
        let { data, error } = response;
        if (error) {
          console.log(error);
          return;
        }
        console.log(data);
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
          GE #{current.index}: {current.content}
          <Button style={{ marginLeft: "1rem" }} basic color="blue">
            Buy GE{current.index}
          </Button>
          <Button primary>New TCX</Button>
        </Grid.Column>
        <Grid.Column width={16}>
          Your balance: {balance.atdot}ATDot, {balance.token}GE{current.index}{" "}
          Token
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width={12}>
          <Card.Group>{items}</Card.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Tasks tasks={tasks} />
        </Grid.Column>
      </Grid>
    </Container>
  );
}

