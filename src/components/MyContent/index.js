import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Segment, Header, Card, Button, Grid } from 'semantic-ui-react';
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
  ])
  const [isModalOpen, setIsModalOpen] = useState({ upload: false, propose: false });
  const [modalContent, setModalContent] = useState({ index: 0 });

  const handlModalOpen = (action, index) => {
    setModalContent({ index })
    setIsModalOpen({ upload: action === 'upload', propose: action === 'propose', transfer: action === 'transfer' });
  }
  const handlModalClose = () => {
    setIsModalOpen({ upload: false, propose: false, transfer: false });
  }

  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Card key={index}>
      <Card.Content>
        <Card.Header>node id: #{index}</Card.Header>
        <Card.Description>
          node type: {value.type}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button primary onClick={handlModalOpen.bind(this, 'propose', index)}>propose</Button>
          <Button basic color='blue' onClick={handlModalOpen.bind(this, 'transfer', index)}>transfer</Button>
        </div>
      </Card.Content>
    </Card>
    )
  }

  return (
    <Container>

      <Header size='large'>
        <Grid>
          <Grid.Column width={8}>
            Your balance: {account.balance} ATDot
          </Grid.Column>
          <Grid.Column floated='right' textAlign='right' width={8}>
            <Button basic color='blue' onClick={handlModalOpen.bind(this, 'upload', 0)}>Upload File</Button>
            <Button primary as={Link} to='whiteboard'>New Whiteboard</Button>
          </Grid.Column>
        </Grid>
      </Header>

      <Card.Group>
        {items}
      </Card.Group>

      <ModalUpload isOpen={isModalOpen.upload} handleClose={handlModalClose} content={modalContent} />
      <ModalPropose isOpen={isModalOpen.propose} handleClose={handlModalClose} content={modalContent} />
      <ModalPropose isOpen={isModalOpen.transfer} handleClose={handlModalClose} content={modalContent} />

    </Container>
  )
}

