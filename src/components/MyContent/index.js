import React, { useState } from 'react';
import { Container, Segment, Header, List, Button, Grid } from 'semantic-ui-react';
import { ModalUpload } from '../Modals/Upload';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlModalOpen = () => {
    setIsModalOpen(true);
  }
  const handlModalClose = () => {
    setIsModalOpen(false);
  }
  const [modalContent, setModalContent] = useState({ header: '1', body: '2' });

  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Grid.Column key={index}>
      <Segment>
        <List>
          <List.Item>node id: #{index}</List.Item>
          <List.Item>node type: {value.type}</List.Item>
        </List>
        <Button primary onClick={handlModalOpen}>propose</Button>
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
            <Button basic onClick={handlModalOpen}>Upload File</Button>
            <Button primary>New Whiteboard</Button>
          </Grid.Column>
        </Grid>
      </Header>

      <Grid stackable columns={5}>
        {items}
      </Grid>

      <ModalUpload isOpen={isModalOpen} handleClose={handlModalClose} content={modalContent} />

    </Container>
  )
}

