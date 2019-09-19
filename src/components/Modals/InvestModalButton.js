import React, { Component } from "react";
import { Button, Header, Icon, Modal, Input } from "semantic-ui-react";

export default class InvestModalButton extends Component {
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
            Invest
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
        closeIcon
      >
        <Header icon="money bill alternate" content="Invest" />
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
            <Icon name="checkmark" /> Invest
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
