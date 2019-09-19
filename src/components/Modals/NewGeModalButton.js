import React, { Component } from "react";
import { Button, Header, Icon, Modal, Input } from "semantic-ui-react";

export default class NewGeModalButton extends Component {
  state = { modalOpen: false, metadata: '' };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });
  
  handleChange = (e) => {
    this.setState({ metadata: e.target.value });
  }
  
  render() {
    return (
      <Modal
        trigger={
          <Button basic color="blue" onClick={this.handleOpen}>
            New Governance Entity
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="tiny"
        closeIcon
      >
        <Header icon="group" content="New Governance Entity" />
        <Modal.Content>
          <Input
            icon="tag"
            iconPosition="left"
            placeholder="Few words to describe GE"
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.handleClose}>
            <Icon name="checkmark" /> Create
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
