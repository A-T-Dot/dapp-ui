import React from 'react'
import { Icon, Grid, Modal, Button } from 'semantic-ui-react'
import IpfsUpload from '../Forms/IpfsUpload';
import chain from "../../api/chain";


export function ModalUpload (props) {
  const createNode = (hash, type, sources) => {
    // elements.push({ type })

    const keys = chain.getKeysFromUri('//Alice')
    chain.nodeCreate(keys, hash, type, sources).then((res) => {
      console.log('-------nodeCreate:')
      console.log(res)
      // setContents(JSON.parse(JSON.stringify(elements)))
    })
  }

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
      <Button basic onClick={createNode.bind(this, 'hash', 'whitepaper', ['hash1'])}>Create Node</Button>
    </Modal>
  )
}


