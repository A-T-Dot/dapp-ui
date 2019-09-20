import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Segment, Header, Card, Button, Grid, List, Label } from 'semantic-ui-react';
import { ModalUpload } from '../Modals/Upload';
import { ModalPropose } from '../Modals/Propose';
import axios from '../../api/axios';
import Ipfs from '../../utils/Ipfs';
import { nodeTypeToText } from '../../constants/nodeType';
import chain from '../../api/chain';

export function MyContent () {

  const [account, setAccount] = useState({ balance: '0', energy: '0', activity: '0', reputation: '0' })

  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    async function fetchChainData() {
      try {
        const keys = chain.getKey();
        let [balance, energy, activity, reputation] = await Promise.all([
          chain.getBalance(keys.address),
          chain.getEnergyAsset(keys.address),
          chain.getActivityAsset(keys.address),
          chain.getReputationAsset(keys.address)
        ]);

        setAccount({
          balance, energy, activity, reputation
        });
        console.log(balance);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChainData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const keys = chain.getKey();
        const response = await axios(
          `/api/v1/accounts/${keys.address}/nodes`
        );
        let { data, error } = response;
        if (error) {
          console.log(error);
          return;
        }
        console.log(data);
        setNodes(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []); 

 

  const [isModalOpen, setIsModalOpen] = useState({ upload: false, propose: false });
  const [modalContent, setModalContent] = useState({ index: 0 });

  const handlModalOpen = (action, index, nodeId) => {
    setModalContent({ index, nodeId })
    setIsModalOpen({ upload: action === 'upload', propose: action === 'propose', transfer: action === 'transfer' });
  }
  const handlModalClose = () => {
    setIsModalOpen({ upload: false, propose: false, transfer: false });
  }

  const cards = nodes.map((node, index) => {
    let { sources, nodeType, referredBy, nodeId } = node;
    let cidStr = Ipfs.getCIDv0fromContentHashStr(node.nodeId).toString();
    return (
      <Card key={index}>
        <Card.Content>
          <Header className="break-word" size="small" as={Link} to={`/node/${cidStr}`} >
            {cidStr}
          </Header>
        </Card.Content>
        <Card.Content>
          <Card.Description>
            <List>
              <List.Item>
                <List.Icon name="users" />
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
            </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              primary
              onClick={handlModalOpen.bind(this, "propose", index, nodeId)}
            >
              Propose
            </Button>
            <Button
              basic
              color="blue"
              onClick={handlModalOpen.bind(this, "transfer", index)}
            >
              Transfer
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  });



  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Label color="blue">
              {account.balance}
              <Label.Detail>CT</Label.Detail>
            </Label>
            <Label color="teal">
              {account.energy}
              <Label.Detail>CEP</Label.Detail>
            </Label>
            <Label color="orange">
              {account.activity}
              <Label.Detail>CAP</Label.Detail>
            </Label>
            <Label color="yellow">
              {account.reputation}
              <Label.Detail>CRP</Label.Detail>
            </Label>
          </Grid.Column>
          <Grid.Column floated="right" textAlign="right" width={8}>
            <Button
              basic
              color="blue"
              onClick={handlModalOpen.bind(this, "upload", 0)}
            >
              Upload File
            </Button>
            <Button basic color="blue" as={Link} to="whiteboard">
              New Whiteboard
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Card.Group>{cards}</Card.Group>

      <ModalUpload
        isOpen={isModalOpen.upload}
        handleClose={handlModalClose}
        content={modalContent}
      />
      <ModalPropose
        isOpen={isModalOpen.propose}
        handleClose={handlModalClose}
        content={modalContent}
      />
      <ModalPropose
        isOpen={isModalOpen.transfer}
        handleClose={handlModalClose}
        content={modalContent}
      />
    </Container>
  );
}

