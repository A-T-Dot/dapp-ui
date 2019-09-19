import React, { Component } from "react";
import { Button, Header, Icon, Modal, Input } from "semantic-ui-react";

export default class NewTcxModalButton extends Component {
  state = { modalOpen: false,  };

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
          <Input
            icon="tag"
            iconPosition="left"
            placeholder="Few words to describe GE"
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" onClick={this.handleClose}>
            <Icon name="checkmark" /> Create
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
