import React, { useState } from 'react'
import { Icon, Grid, Modal, Button, Input, Form, Dimmer, Loader, Header } from 'semantic-ui-react'
import IpfsUpload from '../Forms/IpfsUpload';
import chain from "../../api/chain";
import Ipfs from '../../utils/Ipfs';


export class ModalUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cid: '',
      files: null,
      fileType: 0,
      sourcesStr: '',
      loading: false,
      dimmerActive: false,
    };

    // bind methods
    this.uploadToIpfs = this.uploadToIpfs.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  onChange(e) {
    console.log(e.target)
    if(e.target.name == "file") {
      this.setState({
        files: e.target.files
      });
    } else if(e.target.name == "file-type") {
      this.setState({ fileType: e.target.value });
    } else {
      this.setState({ sourcesStr: e.target.value })
    }
 
  }

  onClose() {
    this.setState({
      dimmerActive: false
    });
    this.props.handleClose();
  }

  async uploadToIpfs() {
    let { files } = this.state;

    let cid = await Ipfs.add(files);
    this.setState({
      cid: cid
    });
    return cid;
  }

  async createNode (hash, type, sources) {
    const keys = chain.getKey();
    const nodeCreateRes = await chain.nodeCreate(keys, hash, type, sources);
    console.log("---nodeCreate return:", nodeCreateRes);
  }

  async handleClick() {
    try {
      this.setState({
        loading: true,
        dimmerActive: true,
      })

      let cid = await this.uploadToIpfs();
      let contentHash = Ipfs.getContentHashBufFromCIDv0(cid);

      console.log(cid.toString())
      console.log(contentHash);
      console.log(this.state.fileType)

      let sources = [];
      if(this.state.sourcesStr.length > 0 ){
        sources = this.state.sourcesStr.split(",").map(source => {
          return Ipfs.getContentHashStrfromCIDStr(source.trim());
        });
      }

      console.log(sources);
      await this.createNode(contentHash, this.state.fileType, sources);

      this.setState({
        loading: false
      })

      var that = this;
      setTimeout(() => {
        that.setState({
          dimmerActive: false
        });
        that.props.handleClose();
      }, 3000);
    } catch(e) {
      this.props.handleClose();
      console.error(e);
    }

  }

  render() {

    const { isOpen, handleClose } = this.props;
    let { loading, cid, dimmerActive } = this.state;

    let dimmerContent;
    if(loading) {
      dimmerContent = <Loader content="Loading" />;
    } else {
      dimmerContent = (
        <Header as="h2" icon inverted>
          <Icon name="checkmark" />
          Node Created
          <Header.Subheader>{cid.toString()}</Header.Subheader>
        </Header>
      )
    }
  

    return (
      <Modal open={isOpen} size="tiny" onClose={this.onClose} closeIcon>
        <Dimmer active={dimmerActive}>{dimmerContent}</Dimmer>
        <Modal.Header>UploadFile</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <input name="file" type="file" onChange={this.onChange} />
            </Form.Field>
            <Form.Field>
              <Input
                name="file-type"
                icon="file text outline"
                iconPosition="left"
                placeholder="file type"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="sources"
                icon="arrow left"
                iconPosition="left"
                placeholder="sources: e.g. 0x1234, 0x5566"
                onChange={this.onChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClick}>Create Node</Button>
        </Modal.Actions>
      </Modal>
    );

  }
}


