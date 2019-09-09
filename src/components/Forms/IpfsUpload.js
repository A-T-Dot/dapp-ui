import React, { useState } from "react";
import { Container, Form, Button, Checkbox } from "semantic-ui-react";
import ipfsClient from 'ipfs-http-client';
import Ipfs from '../../utils/Ipfs';

class IpfsUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file_hash: null,
      files: null
    }

    // bind methods
    this.uploadToIpfs = this.uploadToIpfs.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({
      files: e.target.files
    })
  }

  async uploadToIpfs() {
    let { files } = this.state;

    let cid = await Ipfs.add(files);
    this.setState({
      file_hash: cid
    })

  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.uploadToIpfs}>
          <Form.Field>
            <label>Upload File</label>
            <input type='file' onChange={this.onChange}/>
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
        <span>{this.state.file_hash}</span>
      </Container>
    );
  }
}

export default IpfsUpload;