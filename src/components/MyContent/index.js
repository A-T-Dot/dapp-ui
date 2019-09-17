import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Segment, Header, List, Button, Grid } from 'semantic-ui-react';
import { ModalUpload } from '../Modals/Upload';
import { ModalPropose } from '../Modals/Propose';
import chain from "../../api/chain";

export function MyContent () {

  const [account, setValues] = useState({ balance: '50' }, [
    { type: 'jpeg' },
    { type: 'mp4' },
    { type: 'whiteboard' },
  ])
  const [elements, setContents] = useState([
    { type: 'jpeg' },
    { type: 'mp4' },
    { type: 'whiteboard' },
  ])
  const [isModalOpen, setIsModalOpen] = useState({ upload: false, propose: false });
  const [modalContent, setModalContent] = useState({ index: 0 });

  // TODO in modal
  const createNode = (hash, type, sources) => {
    elements.push({ type })

    const keys = chain.getKeysFromUri('//Alice')
    chain.nodeCreate(keys, hash, type, sources).then((res) => {
      console.log('-------nodeCreate:')
      console.log(res)
      setContents(JSON.parse(JSON.stringify(elements)))
    })
  }

  const handlModalOpen = (action, index) => {
    setModalContent({ index })
    setIsModalOpen({ upload: action === 'upload', propose: action === 'propose', transfer: action === 'transfer' });
  }
  const handlModalClose = () => {
    setIsModalOpen({ upload: false, propose: false, transfer: false });
  }

  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Grid.Column key={index}>
      <Segment>
        <List>
          <List.Item>node id: #{index}</List.Item>
          <List.Item>node type: {value.type}</List.Item>
        </List>
        <Button primary onClick={handlModalOpen.bind(this, 'propose', index)}>propose</Button>
        <Button basic color='blue' onClick={handlModalOpen.bind(this, 'transfer', index)}>transfer</Button>
      </Segment>
    </Grid.Column>)
  }

  return (
    <Container>

      <Header size='large'>
        <Grid>
          <Grid.Column width={8}>
            Your balance: {account.balance} ATDot
          </Grid.Column>
          <Grid.Column floated='right' textAlign='right' width={8}>
            <Button basic onClick={createNode.bind(this, 'hash', 'whitepaper', ['hash1'])}>Create Node</Button>
            <Button basic color='blue' onClick={handlModalOpen.bind(this, 'upload', 0)}>Upload File</Button>
            <Button primary as={Link} to='whiteboard'>New Whiteboard</Button>
          </Grid.Column>
        </Grid>
      </Header>

      <Grid stackable columns={4}>
        {items}
      </Grid>

      <ModalUpload isOpen={isModalOpen.upload} handleClose={handlModalClose} content={modalContent} />
      <ModalPropose isOpen={isModalOpen.propose} handleClose={handlModalClose} content={modalContent} />
      <ModalPropose isOpen={isModalOpen.transfer} handleClose={handlModalClose} content={modalContent} />

    </Container>
  )
}

