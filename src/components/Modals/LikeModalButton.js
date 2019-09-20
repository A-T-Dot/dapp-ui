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

export default class LikeModalButton extends Component {
  state = {
    modalOpen: false,
    metadata: "",
    loading: false,
    dimmerActive: false,
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false, dimmerActive: false });

  handleChange = e => {
    this.setState({ metadata: e.target.value });
  };

  onClick = async () => {
    try {
      this.setState({
        loading: true,
        dimmerActive: true
      });

      // write to chain
     

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
          Liked
        </Header>
      );
    }

    return (
      <Modal
        trigger={
          <Button basic color="blue" onClick={this.handleOpen}>
            Like
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="tiny"
        closeIcon
      >
        <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
        <Header icon="thumbs up" content="Like" />
        <Modal.Content>
          <Input
            icon="tag"
            iconPosition="left"
            placeholder="Few words here"
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.onClick}>
            <Icon name="checkmark" /> Like
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
