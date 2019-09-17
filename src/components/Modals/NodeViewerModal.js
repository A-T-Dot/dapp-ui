import React from "react";
import { Icon, Grid, Modal } from "semantic-ui-react";
import NodeRenderer from '../ContentRenderer/NodeRenderer';

export default function NodeViewerModal(props) {
  return (
    <Modal trigger={props.trigger} centered={false} closeIcon size='small'>
      <Modal.Header>Node Viewer</Modal.Header>
      <Modal.Content>
        <NodeRenderer node={{}} ipfsGatewayUrl={"http://localhost:8080"} />
      </Modal.Content>
    </Modal>
  );
}
