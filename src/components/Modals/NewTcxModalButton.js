import React, { Component } from "react";
import { Button, Header, Icon, Modal, Input, Loader, Dimmer } from "semantic-ui-react";
import chain from "../../api/chain";

export default class NewTcxModalButton extends Component {
  state = { modalOpen: false, metadata: '', loading: false, dimmerActive: false, tcxId: '' };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false, dimmerActive: false});
  
  handleChange = (e) => {
    this.setState({ metadata: e.target.value });
  }

  onClick = async () => {
    try {
      this.setState({
        loading: true,
        dimmerActive: true
      });

      // write to chain
      const keys = chain.getKeysFromUri("//Alice");

      const tcxCreateRes = await chain.tcxCreate(keys, this.props.geId, 0, this.state.metadata);
      console.log("---tcxCreate return:", tcxCreateRes);
      let tcxId = tcxCreateRes.data[1];

      this.setState({ loading: false, tcxId });
      var that = this;
      setTimeout(() => {
        that.handleClose();
      }, 3000);
    } catch (e) {
      this.handleClose();
      console.error(e);
    }
  }



  render() {
    let { loading, tcxId, dimmerActive } = this.state;

    let dimmerContent;
    if (loading) {
      dimmerContent = <Loader content="Loading" />;
    } else {
      dimmerContent = (
        <Header as="h2" icon inverted>
          <Icon name="checkmark" />
          Tcx #{tcxId} Created
        </Header>
      );
    }
  
    return (
      <Modal
        trigger={
          <Button basic color="blue" onClick={this.handleOpen}>
            New TCX
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="tiny"
        closeIcon
      >
        <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
        <Header icon="group" content="New TCX" />
        <Modal.Content>
          <Input
            icon="tag"
            iconPosition="left"
            placeholder="Few words to describe TCX"
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.onClick}>
            <Icon name="checkmark" /> Create
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
