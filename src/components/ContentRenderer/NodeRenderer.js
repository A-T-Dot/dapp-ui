import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import { nodeType, nodeTypeToText } from "../../constants/nodeType";
import JsonRender from "./JsonRenderer";

export default class NodeRenderer extends Component {
  render() {
    if (!this.props.cidStr || !this.props.nodeType) {
      return <div>Loading</div>;
    }

    let typeId = parseInt(this.props.nodeType);
    let cid = this.props.cidStr;
    // let typeId = nodeType.TXT;
    // let cid = "QmRC9s7W4a5mr3wuXDuM53CHvXKPexDaVc1342oYgp1fZQ";

    let content;
    let url = `${this.props.ipfsGatewayUrl}/ipfs/${cid}`;
    switch (typeId) {
      case nodeType.JPG:
        // jpg
        content = <img src={url} style={{maxWidth: '100%', height: '300px'}}></img>;
        break;
      case nodeType.TXT:
        // txt
        // content = (
        //   <object data={url} width="100%" height="100%">
        //     Not supported
        //   </object>
        // );
        content = <MarkdownRenderer url={url}/>;
        break;
      case nodeType.JSON:
        // json
        content = <JsonRender url={url} />;
        break;
      case nodeType.MP4:
        // mp4
        content = (
          <video width="100%" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
        break;
      case nodeType.WHITEBOARD:
        // whiteboard
        content = <JsonRender url={url} />;
        break;
      case nodeType.TCXPOINTER:
        // tcx pointer
        content = <JsonRender url={url} />;
        break;
      case nodeType.NODEPOINTER:
        // node pointer
        content = <p>node pointer</p>;
        break;
      case nodeType.MARKDOWN:
        // markdown
        content = <MarkdownRenderer url={url} />;
        break;
      default:
        content = <p>No renderer for node type</p>;
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}
