import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import { nodeType, nodeTypeToText } from "../../constants/nodeType";

export default class NodeRenderer extends Component {
  render() {
    let { node, ipfsGatewayUrl } = this.props;
    if (!node) {
      return <div>Loading</div>;
    }

    // let typeId = node.node_type.toNumber();
    // let cid = node.id.toHex();
    let typeId = nodeType.TXT;
    let cid = "QmRC9s7W4a5mr3wuXDuM53CHvXKPexDaVc1342oYgp1fZQ";

    let content;
    let url = `${ipfsGatewayUrl}/ipfs/${cid}`;
    switch (typeId) {
      case 0:
        // jpg
        content = <img src={url}></img>;
        break;
      case 1:
        // txt
        content = (
          <object data={url} width="100%">
            Not supported
          </object>
        );
        break;
      case 2:
        // json
        content = (
          <object data={url} width="100%">
            Not supported
          </object>
        );
        break;
      case 3:
        // mp4
        content = (
          <video width="100%" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
        break;
      case 4:
        // whiteboard
        content = <p>whiteboard</p>;
        break;
      case 5:
        // tcx pointer
        content = <p>tcx pointer</p>;
        break;
      case 6:
        // node pointer
        content = <p>node pointer</p>;
        break;
      case 7:
        // markdown
        content = <MarkdownRenderer url={url} />;
        break;
      default:
        content = <p>No renderer for node type</p>;
    }

    return <React.Fragment>{content}</React.Fragment>;
  }
}
