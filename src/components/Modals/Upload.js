import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import IpfsUpload from '../Forms/IpfsUpload';

export function ModalUpload (props) {
    const { content, isOpen, handleClose } = props;
    return (
        // <Modal open={isOpen} size='mini' >
        //   <Modal.Content>
        //     <Modal.Description>
        //       <Header>{content.header}</Header>
        //       <p>{content.body}</p>
        //     </Modal.Description>
        //   </Modal.Content>
        //   <Modal.Actions>
        //     <Button primary onClick={handleClose} inverted>
        //       Submit
        //     </Button>
        //   </Modal.Actions>
        // </Modal>
        <Modal open={isOpen}>
            <Modal.Header>UploadFile</Modal.Header>
            <Modal.Content image>
                {content.body}
                <IpfsUpload />
                {/* <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                        We've found the following gravatar image associated with your e-mail
                        address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                </Modal.Description> */}
            </Modal.Content>
            {/* <Modal.Actions>
                <Button primary onClick={handleClose}>
                    Submit
                </Button>
            </Modal.Actions> */}
        </Modal>
    )
}


