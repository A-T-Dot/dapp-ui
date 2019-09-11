import React from 'react'
import { Icon, Grid, Form, Button, Modal } from 'semantic-ui-react'

export function ModalPropose (props) {
  const { content, isOpen, handleClose } = props;
  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <Grid>
          <Grid.Column width={14}>
            Propose
          </Grid.Column>
          <Grid.Column floated='right' textAlign='right' width={2}>
            <Icon name='close' onClick={handleClose} />
          </Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            node id: {content.index}
          </p>
        </Modal.Description>
        <Form>
          <Form.Field>
            <label>amount</label>
            <input placeholder='' />
          </Form.Field>
          <Form.Field>
            <label>tcs id / ge id</label>
            <input placeholder='' />
          </Form.Field>
          <Button type='submit' primary onClick={handleClose}>Propose</Button>
        </Form>

      </Modal.Content>
    </Modal>
  )
}


