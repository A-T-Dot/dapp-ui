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

export default class InvestModalButton extends Component {
  state = { modalOpen: false, amount: "", loading: false, dimmerActive: false };

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

      // // write to chain
      // const keys = chain.getKeysFromUri("//Alice");

      // const geCreateRes = await chain.geCreate(keys, this.state.metadata);
      // console.log("---nodeCreate return:", geCreateRes);
      // let geId = geCreateRes.data[1];

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
    let { loading, geId, dimmerActive, amount } = this.state;

    let dimmerContent;
    if (loading) {
      dimmerContent = <Loader content="Loading" />;
    } else {
      dimmerContent = (
        <Header as="h2" icon inverted>
          <Icon name="checkmark" />
          Invested {amount}
        </Header>
      );
    }

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
        <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
        <Header icon="money bill alternate outline" content="Invest" />
        <Modal.Content>
          <Input
            icon="dollar sign"
            iconPosition="left"
            placeholder="amount"
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.onClick}>
            <Icon name="checkmark" /> Invest
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
