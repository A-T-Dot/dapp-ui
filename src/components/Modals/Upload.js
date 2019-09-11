import React from 'react'
import { Icon, Grid, Modal } from 'semantic-ui-react'
import IpfsUpload from '../Forms/IpfsUpload';

export function ModalUpload (props) {
  const { isOpen, handleClose } = props;
  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <Grid>
          <Grid.Column width={14}>
            UploadFile
          </Grid.Column>
          <Grid.Column floated='right' textAlign='right' width={2}>
            <Icon name='close' onClick={handleClose} />
          </Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content image>
        <IpfsUpload />
      </Modal.Content>
    </Modal>
  )
}


