import React, { useState } from "react";
import {
  Icon,
  Grid,
  Modal,
  Button,
  Input,
  Form,
  Dimmer,
  Loader,
  Header,
  Label
} from "semantic-ui-react";
import IpfsUpload from "../Forms/IpfsUpload";
import chain from "../../api/chain";
import Ipfs from "../../utils/Ipfs";

export class ModalPropose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tcxId: '',
      amount: 0,
      loading: false,
      dimmerActive: false
    };

    // bind methods
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onChange(e) {
    if (e.target.name == "tcx-id") {
      this.setState({ tcxId: e.target.value });
    } else if (e.target.name == "amount") {
      this.setState({ amount: e.target.value });
    } 
  }

  onClose() {
    this.setState({
      dimmerActive: false
    });
    this.props.handleClose();
  }

  async propose(tcxId, nodeId, balance) {
    const keys = chain.getKeysFromUri("//Alice");
    const proposeRes = await chain.tcxPropose(keys, tcxId, nodeId, balance, 0)
    console.log("---propose return:", proposeRes)

  }

  async handleClick() {
    try {
      this.setState({
        loading: true,
        dimmerActive: true
      });

      // API HERE
      console.log(this.state.amount, this.state.tcxId);
      
      await this.propose(this.state.tcxId ,this.props.content.nodeId, this.state.amount)
      this.setState({
        loading: false
      });

      var that = this;
      setTimeout(() => {
        that.setState({
          dimmerActive: false
        });
        that.props.handleClose();
      }, 3000);
    } catch (e) {
      this.props.handleClose();
      console.error(e);
    }
  }

  render() {
    const { content, isOpen, handleClose } = this.props;
    let { loading, cid, dimmerActive } = this.state;

    let dimmerContent;
    if (loading) {
      dimmerContent = <Loader content="Loading" />;
    } else {
      dimmerContent = (
        <Header as="h2" icon inverted>
          <Icon name="checkmark" />
          Proposed!
        </Header>
      );
    }

    return (
      <Modal open={isOpen} size="tiny" onClose={this.onClose} closeIcon>
        <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
        <Modal.Header>UploadFile</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                name="tcx-id"
                icon="list"
                iconPosition="left"
                placeholder="tcx id"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="amount"
                icon="dollar"
                iconPosition="left"
                placeholder="amount"
                onChange={this.onChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClick}>Propose</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
