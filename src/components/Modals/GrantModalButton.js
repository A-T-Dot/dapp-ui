import React, { Component } from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
  Loader,
  Dimmer
} from "semantic-ui-react";
import chain from "../../api/chain";
import Ipfs from "../../utils/Ipfs";

export default class GrantModalButton extends Component {
  state = {
    modalOpen: false,
    amount: "",
    loading: false,
    dimmerActive: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false, dimmerActive: false });

  handleChange = e => {
    this.setState({ amount: e.target.value });
  };

  onClick = async () => {
    try {
      this.setState({
        loading: true,
        dimmerActive: true
      });

      // write to chain
      const keys = chain.getKey();
      const interactionGrantRes = await chain.interactionGrant(keys, this.props.nodeId, this.state.amount);
      console.log("---interactionGrant return:", interactionGrantRes);

      this.setState({ loading: false });
      var that = this;
      setTimeout(() => {
        that.handleClose();
      }, 3000);
    } catch (e) {
      this.handleClose();
      console.error(e);
    }
  };

  render() {
    let { loading, tcxId, dimmerActive } = this.state;

    let dimmerContent;
    if (loading) {
      dimmerContent = <Loader content="Loading" />;
    } else {
      dimmerContent = (
        <Header as="h2" icon inverted>
          <Icon name="checkmark" />
          Granted
        </Header>
      );
    }

    return (
      <Modal
        trigger={
          <Button basic color="blue" onClick={this.handleOpen}>
            Grant
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="tiny"
        closeIcon
      >
        <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
        <Header icon="leaf" content="Grant" />
        <Modal.Content>
          You want to grant to{" "}
          {this.props.nodeId &&
            Ipfs.getCIDv0fromContentHashStr(this.props.nodeId).toString()}
        </Modal.Content>
        <Modal.Actions>
          <Input
            icon="dollar"
            iconPosition="left"
            placeholder="amount"
            onChange={this.handleChange}
          />
          <Button primary onClick={this.onClick}>
            <Icon name="checkmark" /> Grant
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
