import React from "react";
import { Icon, Grid, Modal, Button } from "semantic-ui-react";
import NodeRenderer from "../ContentRenderer/NodeRenderer";
import Ipfs from "../../utils/Ipfs";

export default class TaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.challenge = this.challenge.bind(this);
    this.vote = this.vote.bind(this);
    this.claim = this.claim.bind(this);
  }

  async challenge(amount) {
    let { task, closeModal } = this.props;
    // TODO:
    closeModal();
  }

  async vote(amount) {
    let { task, closeModal } = this.props;
    // TODO:

    closeModal();

  }

  async claim() {
    let { task, closeModal } = this.props;
    // TODO:

    closeModal();
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
              <Button color="green" onClick={this.challenge}>
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
              <Button color="red" onClick={this.vote}>
                <Icon name="remove" /> No
              </Button>
              <Button color="green" onClick={this.vote}>
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
              {task.proposer}'s proposal to add
              {cid} to TCX#
              {task.tcxId} has been accepted. Please claim your reward!
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
            <Modal.Header>Task</Modal.Header>
            <Modal.Content>
              {task.proposer}'s proposal to add
              {cid} to TCX#
              {task.tcxId} has been accepted. Please claim your reward!
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
