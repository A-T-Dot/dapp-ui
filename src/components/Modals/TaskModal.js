import React from "react";
import { Icon, Grid, Modal, Button } from "semantic-ui-react";
import NodeRenderer from "../ContentRenderer/NodeRenderer";
import Ipfs from "../../utils/Ipfs";

export default function TaskModal(props) {
  let { trigger, task } = props;
  let cid = Ipfs.getCIDv0fromContentHashStr(task.nodeId).toString();

  if(task.status == 0) {
    return (
      <Modal trigger={trigger} centered={true} closeIcon size="small">
        <Modal.Header>Challenge</Modal.Header>
        <Modal.Content>
          You want to challenge {task.proposer}'s proposal to add {cid} to TCX#
          {task.tcxId}
        </Modal.Content>
        <Modal.Actions>
          <Button color="green">
            <Icon name="checkmark" /> Challenge
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else if(task.status == 1) {
    return (
      <Modal trigger={trigger} centered={true} closeIcon size="small">
        <Modal.Header>Vote</Modal.Header>
        <Modal.Content>
          Please vote whether you think {cid} should be added to TCX#{" "}
          {task.tcxId}
        </Modal.Content>
        <Modal.Actions>
          <Button color="red">
            <Icon name="remove" /> No
          </Button>
          <Button color="green">
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else if(task.status == 3) {
    return (
      <Modal trigger={trigger} centered={true} closeIcon size="small">
        <Modal.Header>Claim Reward</Modal.Header>
        <Modal.Content>
          {task.proposer}'s proposal to add
          {cid} to TCX#
          {task.tcxId} has been accepted. Please claim your reward!
        </Modal.Content>
        <Modal.Actions>
          <Button color="green">
            <Icon name="checkmark" /> Claim
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else if(task.status == 4) {
    return (
      <Modal trigger={trigger} centered={true} closeIcon size="small">
        <Modal.Header>Task</Modal.Header>
        <Modal.Content>
          {task.proposer}'s proposal to add
          {cid} to TCX#
          {task.tcxId} has been accepted. Please claim your reward!
        </Modal.Content>
        <Modal.Actions>
          <Button color="green">
            <Icon name="checkmark" /> Claim
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

}
