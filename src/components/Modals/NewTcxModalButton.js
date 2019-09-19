import React, { Component } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

export default class NewTcxModalButton extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        trigger={
          <Button basic color="blue" onClick={this.handleOpen}>
            New Tcx
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
        closeIcon
      >
        <Header icon="list" content="New TCX" />
        <Modal.Content>
          <h3>This website uses cookies to ensure the best user experience.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
