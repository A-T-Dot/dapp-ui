import React, { Component } from "react";
import { Button, Header, Icon, Modal, Input, Loader, Dimmer } from "semantic-ui-react";
import chain from "../../api/chain";

export default class NewGeModalButton extends Component {
  state = { modalOpen: false, metadata: '', loading: false, dimmerActive: false, geId: '' };

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

      const geCreateRes = await chain.geCreate(keys, this.state.metadata);
      console.log("---nodeCreate return:", geCreateRes);
      let geId = geCreateRes.data[1];

      this.setState({ loading: false, geId})
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
    let { loading, geId, dimmerActive } = this.state;

    let dimmerContent;
    if (loading) {
      dimmerContent = <Loader content="Loading" />;
    } else {
      dimmerContent = (
        <Header as="h2" icon inverted>
          <Icon name="checkmark" />
          GE#{geId} Created
        </Header>
      );
    }
  
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
        <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
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
          <Button primary onClick={this.onClick}>
            <Icon name="checkmark" /> Create
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
