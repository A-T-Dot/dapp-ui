import React, { useState } from 'react';
import { Container, Segment, Header, List, Button, Grid } from 'semantic-ui-react';
import { ModalUpload } from '../Modals/Upload';
import { ModalPropose } from '../Modals/Propose';

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
    { type: 'whiteboard' },
    { type: 'whiteboard' },
    { type: 'whiteboard' },
  ])
  const [isModalOpen, setIsModalOpen] = useState({ upload: false, propose: false });
  const [modalContent, setModalContent] = useState({ index: 0 });


  const handlModalOpen = (action, index) => {
    setModalContent({ index })
    setIsModalOpen({ upload: action === 'upload', propose: action === 'propose' });
  }
  const handlModalClose = () => {
    setIsModalOpen({ upload: false, propose: false });
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
            <Button basic onClick={handlModalOpen.bind(this, 'upload', 0)}>Upload File</Button>
            <Button primary>New Whiteboard</Button>
          </Grid.Column>
        </Grid>
      </Header>

      <Grid stackable columns={5}>
        {items}
      </Grid>

      <ModalUpload isOpen={isModalOpen.upload} handleClose={handlModalClose} content={modalContent} />
      <ModalPropose isOpen={isModalOpen.propose} handleClose={handlModalClose} content={modalContent} />

    </Container>
  )
}

