import React, { Component } from "react";
import { Button, Header, Icon, Modal, Input } from "semantic-ui-react";

export default class StakeModalButton extends Component {
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
            Stake
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
        closeIcon
      >
        <Header icon="money bill alternate outline" content="Stake" />
        <Modal.Content>
          <Input
            icon="dollar sign"
            iconPosition="left"
            placeholder="amount"
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Stake
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
