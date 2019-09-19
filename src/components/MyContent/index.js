import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Segment, Header, Card, Button, Grid, List } from 'semantic-ui-react';
import { ModalUpload } from '../Modals/Upload';
import { ModalPropose } from '../Modals/Propose';
import axios from '../../api/axios';
import Ipfs from '../../utils/Ipfs';
import { nodeTypeToText } from '../../constants/nodeType';

export function MyContent () {

  const [account, setValues] = useState({ balance: '50' })

  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(
          "/api/v1/accounts/5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY/nodes"
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

    return (
      <Card key={index}>
        <Card.Content>
          <Header className="break-word" size="small">
            {Ipfs.getCIDv0fromContentHashStr(node.nodeId).toString()}
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
              propose
            </Button>
            <Button
              basic
              color="blue"
              onClick={handlModalOpen.bind(this, "transfer", index)}
            >
              transfer
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  });



  return (
    <Container>

      <Header size='large'>
        <Grid>
          <Grid.Column width={8}>
            Your balance: {account.balance} ATDot
          </Grid.Column>
          <Grid.Column floated='right' textAlign='right' width={8}>
            <Button basic color='blue' onClick={handlModalOpen.bind(this, 'upload', 0)}>Upload File</Button>
            <Button basic color='blue' as={Link} to='whiteboard'>New Whiteboard</Button>
          </Grid.Column>
        </Grid>
      </Header>

      <Card.Group>
        {cards}
      </Card.Group>

      <ModalUpload isOpen={isModalOpen.upload} handleClose={handlModalClose} content={modalContent} />
      <ModalPropose isOpen={isModalOpen.propose} handleClose={handlModalClose} content={modalContent} />
      <ModalPropose isOpen={isModalOpen.transfer} handleClose={handlModalClose} content={modalContent} />

    </Container>
  )
}

