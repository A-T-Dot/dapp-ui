import React from "react";
import { Icon, Grid, Modal, Button, Input } from "semantic-ui-react";
import NodeRenderer from "../ContentRenderer/NodeRenderer";
import Ipfs from "../../utils/Ipfs";

export default class TaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.challenge = this.challenge.bind(this);
    this.vote = this.vote.bind(this);
    this.claim = this.claim.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      amount: 0
    }
  }

  async challenge() {
    let { task, closeModal } = this.props;
    let { amount } = this.state;
    console.log(amount);
    // TODO: Call API
    closeModal();
  }

  async vote(value) {
    let { task, closeModal } = this.props;
    // TODO: Call API
    console.log(value);
    closeModal();

  }

  async claim() {
    let { task, closeModal } = this.props;
    // TODO: Call API

    closeModal();
  }

  handleChange(e) {
    this.setState({ amount: e.target.value });
  }

  render() {
      let { task, open, closeModal } = this.props;
      let cid = Ipfs.getCIDv0fromContentHashStr(task.nodeId).toString();

      if (task.status == 0) {
        return (
          <Modal
            open={open}
            centered={true}
            closeIcon
            size="small"
            onClose={() => closeModal()}
          >
            <Modal.Header>Challenge</Modal.Header>
            <Modal.Content>
              You want to challenge {task.proposer}'s proposal to add {cid} to
              TCX#
              {task.tcxId}
            </Modal.Content>
            <Modal.Actions>
              <Input
                icon="dollar"
                iconPosition="left"
                placeholder="amount"
                onChange={this.handleChange}
              />
              <Button color="green" onClick={async() => this.challenge()}>
                <Icon name="checkmark" /> Challenge
              </Button>
            </Modal.Actions>
          </Modal>
        );
      } else if (task.status == 1) {
        return (
          <Modal
            open={open}
            centered={true}
            closeIcon
            size="small"
            onClose={() => closeModal()}
          >
            <Modal.Header>Vote</Modal.Header>
            <Modal.Content>
              Please vote whether you think {cid} should be added to TCX#{" "}
              {task.tcxId}
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={async () => this.vote(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button color="green" onClick={async () => this.vote(true)}>
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        );
      } else if (task.status == 3) {
        return (
          <Modal
            open={open}
            centered={true}
            closeIcon
            size="small"
            onClose={() => closeModal()}
          >
            <Modal.Header>Claim Reward</Modal.Header>
            <Modal.Content>
              <div>
              {task.proposer}'s proposal to add {cid} to TCX#
              {task.tcxId} has been accepted. Please claim your reward!
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={this.claim}>
                <Icon name="checkmark" /> Claim
              </Button>
            </Modal.Actions>
          </Modal>
        );
      } else if (task.status == 4) {
        return (
          <Modal
            open={open}
            centered={true}
            closeIcon
            size="small"
            onClose={() => closeModal()}
          >
            <Modal.Header>Claim Reward</Modal.Header>
            <Modal.Content>
              {task.proposer}'s proposal to add
              {cid} to TCX#
              {task.tcxId} has been rejected. Please claim your reward!
            </Modal.Content>
            <Modal.Actions>
              <Button color="green">
                <Icon name="checkmark" onClick={this.claim}/> Claim
              </Button>
            </Modal.Actions>
          </Modal>
        );
      }
  }

}
