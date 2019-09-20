import React from "react";
import { Icon, Grid, Modal, Button, Input, Dimmer, Loader, Header } from "semantic-ui-react";
import Ipfs from "../../utils/Ipfs";
import chain from "../../api/chain";

export default class TaskModal extends React.Component {

  constructor(props) {
    super(props);
    this.challenge = this.challenge.bind(this);
    this.vote = this.vote.bind(this);
    this.claim = this.claim.bind(this);
    this.resolve = this.resolve.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      amount: 0,
      dimmerActive: false,
      loading: false,
    }
  }

  handleClose() {
    this.setState({ dimmerActive: false, loading: false});
    this.props.closeModal();
  }

  async challenge() {
    let { task, closeModal } = this.props;
    let { amount } = this.state;
    this.setState({ loading: true, dimmerActive: true });

    console.log(amount);
    const keys = chain.getKeysFromUri("//Alice");
    const challengeRes = await chain.tcxChallenge(keys, task.tcxId, task.nodeId, amount)
    console.log("---challenge return:", challengeRes)

    this.setState({ loading: false})
    var that = this;
    setTimeout(() => {
      that.handleClose();
    }, 3000);
  }

  async vote(value) {
    let { task, closeModal } = this.props;
    let { amount } = this.state;
    this.setState({ loading: true, dimmerActive: true });

    console.log(amount);
    const keys = chain.getKeysFromUri("//Alice");
    const voteRes = await chain.tcxVote(keys, task.challengeId, amount, value)
    console.log("---vote return:", voteRes)

    this.setState({ loading: false });
    var that = this;
    setTimeout(() => {
      that.handleClose();
    }, 3000);
  }

  async resolve() {
    let { task, closeModal } = this.props;
    let { amount } = this.state;
    this.setState({ loading: true, dimmerActive: true });

    console.log(amount);
    const keys = chain.getKeysFromUri("//Alice");
    const resolveRes = await chain.tcxResolve(keys, task.tcxId, task.nodeId);
    console.log("---resolve return:", resolveRes)

    
    this.setState({ loading: false });
    var that = this;
    setTimeout(() => {
      that.handleClose();
    }, 3000);
  }

  async claim() {
    let { task, closeModal } = this.props;
    let { amount } = this.state;
    this.setState({ loading: true, dimmerActive: true });

    console.log(amount);
    const keys = chain.getKeysFromUri("//Alice");
    const claimRes = await chain.tcxClaim(keys, task.challengeId)
    console.log("---claim return:", claimRes)

    
    this.setState({ loading: false });
    var that = this;
    setTimeout(() => {
      that.handleClose();
    }, 3000);
  }


  handleChange(e) {
    this.setState({ amount: e.target.value });
  }

  render() {
      let { task, open, closeModal, action } = this.props;
      let { loading, dimmerActive} = this.state;
      let cid = Ipfs.getCIDv0fromContentHashStr(task.nodeId).toString();

      let dimmerContent;
      if (loading) {
        dimmerContent = <Loader content="Loading" />;
      } else {
        dimmerContent = (
          <Header as="h2" icon inverted>
            <Icon name="checkmark" />
            OK
          </Header>
        );
      }
  

      if (action == 'challenge') {
        return (
          <Modal
            open={open}
            centered={true}
            closeIcon
            size="small"
            onClose={this.handleClose}
          >
            <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
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
              <Button color="blue" onClick={async () => this.challenge()}>
                <Icon name="checkmark" /> Challenge
              </Button>
            </Modal.Actions>
          </Modal>
        );
      } else if (action == 'vote') {
        return (
          <Modal
            open={open}
            centered={true}
            closeIcon
            size="small"
            onClose={this.handleClose}
          >
            <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
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
      } else if(action == 'resolve') {
        return (
          <Modal
            open={open}
            centered={true}
            closeIcon
            size="small"
            onClose={this.handleClose}
          >
            <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
            <Modal.Header>Resolve</Modal.Header>
            <Modal.Content>
              Resolve now to find out whether {cid} was added to TCX#{task.tcxId}
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={async () => this.resolve()}>
                <Icon name="checkmark" /> Resolve
              </Button>
            </Modal.Actions>
          </Modal>
        );
      } else if (action == 'claim') {
        return (
          <Modal
            open={open}
            centered={true}
            closeIcon
            size="small"
            onClose={this.handleClose}
          >
            <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
            <Modal.Header>Claim Reward</Modal.Header>
            <Modal.Content>
              You've voted for the winning side. Please claim your reward!
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={this.claim}>
                <Icon name="checkmark" /> Claim
              </Button>
            </Modal.Actions>
          </Modal>
        );
      } 
  }

}
