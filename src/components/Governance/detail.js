import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Grid, List, Header, Label, Icon, Segment } from 'semantic-ui-react';
import Tasks from './Tasks';
import axios from '../../api/axios';
import TcxCard from '../Cards/TcxCard';
import NewTcxModalButton from '../Modals/NewTcxModalButton';
import StakeModalButton from "../Modals/StakeModalButton";
import InvestModalButton from "../Modals/InvestModalButton";
import hex2ascii from "hex2ascii";
import chain from "../../api/chain";

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
    metadata: ""
  });

  const [tcxs, setTcxs] = useState([]);

  const items = listItem(current, tcxs);

  // fetch tcxs
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(`/api/v1/ges/${geid}`);
        let { data, error } = response;
        if (error) {
          console.log(error);
          return;
        }
        console.log("data", data);
        let key = chain.getKey();
        setCurrent({
          metadata: data.contentHash,
          totalStaked: data.totalStaked,
          totalInvested: data.totalInvested,
          invested: data.members[key.address].invested || 0,
          staked: data.members[key.address].staked || 0,
          memberCount: Object.keys(data.members).length || 0
        });
        setTcxs(data.tcxs);
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
          <Header floated="left" size="large">
            GE #{geid}: {hex2ascii(current.metadata)}
          </Header>
          <Button.Group floated="right">
            <StakeModalButton geId={geid} />
            <InvestModalButton geId={geid} />
            <NewTcxModalButton geId={geid} />
          </Button.Group>
        </Grid.Column>
        <Grid.Column width={16}>
          <Segment>
            <Label color="blue">
              You've Staked
              <Label.Detail>{current.staked}</Label.Detail>
            </Label>
            <Label color="teal">
              You've Invested
              <Label.Detail>{current.invested}</Label.Detail>
            </Label>
            <Label>
              Total Staked
              <Label.Detail>{current.totalStaked}</Label.Detail>
            </Label>
            <Label>
              Total Invested
              <Label.Detail>{current.totalInvested}</Label.Detail>
            </Label>
            <Label>
              <Icon name="group" />
              <Label.Detail>{current.memberCount} members</Label.Detail>
            </Label>
          </Segment>
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

