import React, { useState, useEffect } from 'react';
import { Container, Header, Segment, Label, Button, Grid, List } from 'semantic-ui-react';
import { Graph } from "react-d3-graph";
import NodeRenderer from '../ContentRenderer/NodeRenderer';
import axios from "../../api/axios";
import Ipfs from "../../utils/Ipfs";
import { nodeTypeToText } from "../../constants/nodeType";
import LikeModalButton from "../Modals/LikeModalButton"
import AdmireModalButton from '../Modals/AdmireModalButton';
import GrantModalButton from "../Modals/GrantModalButton";

const graphConfig = {
  "automaticRearrangeAfterDropNode": false,
  "collapsible": false,
  "directed": true,
  "focusAnimationDuration": 0.75,
  "focusZoom": 2,
  "height": 600,
  "highlightDegree": 1,
  "highlightOpacity": 1,
  "linkHighlightBehavior": false,
  "maxZoom": 4,
  "minZoom": 0.5,
  "nodeHighlightBehavior": false,
  "panAndZoom": false,
  "staticGraph": false,
  "staticGraphWithDragAndDrop": false,
  "width": 1120,
  "d3": {
    "alphaTarget": 0.05,
    "gravity": -100,
    "linkLength": 100,
    "linkStrength": 1
  },
  "node": {
    "color": "#2185d0",
    "fontColor": "black",
    "fontSize": 8,
    "fontWeight": "normal",
    "highlightColor": "SAME",
    "highlightFontSize": 8,
    "highlightFontWeight": "normal",
    "highlightStrokeColor": "SAME",
    "highlightStrokeWidth": "SAME",
    "labelProperty": "cid",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": true,
    "size": 300,
    "strokeColor": "none",
    "strokeWidth": 1.5,
    "svg": "",
    "symbolType": "circle"
  },
  "link": {
    "color": "#555",
    "fontColor": "black",
    "fontSize": 8,
    "fontWeight": "normal",
    "highlightColor": "#555",
    "highlightFontSize": 8,
    "highlightFontWeight": "normal",
    "labelProperty": "label",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": false,
    "semanticStrokeWidth": false,
    "strokeWidth": 1.5
  }
};

export function NodeExplorer (props) {
  const { cid } = props.match.params;

  let nodeid = Ipfs.getContentHashStrfromCIDStr(cid);
  console.log(nodeid);

  const [state, setState] = useState({
    index: nodeid,
    graphData: {
      links: [],
      nodes: [{id: nodeid}]
    },
    node: null
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(`/api/v1/explorer/${nodeid}`);
        let { data, error } = response;
        if (error) {
          console.log(error);
          return;
        }
        console.log(data);
        let nodes = data.nodes.map((node, index) => {
          return {
            id: node.nodeId,
            symbolType: index == 0 ? "circle" : "square",
            color: index == 0 ? "#D62324" : "#1D7ACA",
            cid: Ipfs.getCIDv0fromContentHashStr(node.nodeId).toString()
          };
        });

        setState({
          graphData: {
            links: data.links,
            nodes
          },
          node: data.nodes[0],
        });
        console.log(state)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []); 

  // const tempIdList = []
  // current.srcData.forEach(item => {
  //   graphData.nodes.push({
  //     id: item.tcx,
  //   })
  //   item.node.forEach(node => {
  //     graphData.links.push({
  //       source: item.tcx,
  //       target: node,
  //     })
  //     if (tempIdList.indexOf(node) === -1) {
  //       tempIdList.push(node)
  //       graphData.nodes.push({
  //         id: node,
  //         symbolType: "square",
  //       })
  //     }
  //   })
  // })

  // graph event callbacks
  const onClickGraph = function () {
  };

  const onClickNode = function (nodeId) {
  };

  const onDoubleClickNode = function (nodeId) {
  };

  const onRightClickNode = function (event, nodeId) {
  };

  const onMouseOverNode = function (nodeId) {
  };

  const onMouseOutNode = function (nodeId) {
  };

  const onClickLink = function (source, target) {
  };

  const onRightClickLink = function (event, source, target) {
  };

  const onMouseOverLink = function (source, target) {
  };

  const onMouseOutLink = function (source, target) {
  };

  const onNodePositionChange = function (nodeId, x, y) {
  };

  const handleLike = async function() {

  };

  const handleAdmire = async function() {

  };

  const handleGrant = async function() {
    
  };
  
  const handleReport = async function() {

  };





  useEffect(() => {
    // TODO request api

  }, []);


  return (
    <Container>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Button.Group floated="right">
                <LikeModalButton/>
                <AdmireModalButton/>
                <GrantModalButton/>
                <Button basic color="blue">
                  Report
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="justified">
              <div className="justify-center">
                <Header size="large">Node Explorer</Header>
                <Label style={{ marginBottom: "20px" }}>
                  <Label.Detail>{cid}</Label.Detail>
                </Label>
                <NodeRenderer
                  cidStr={cid}
                  nodeType={state.node && state.node.nodeType}
                  ipfsGatewayUrl={"http://localhost:8080"}
                />
                <List>
                  <List.Item>
                    <List.Icon name="file" />
                    <List.Content>
                      {(state.node && nodeTypeToText[state.node.nodeType]) ||
                        "0"}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="linkify" />
                    <List.Content>
                      {(state.node && state.node.sources.length) || "0"} cited
                      sources
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="external alternate" />
                    <List.Content>
                      referred by{" "}
                      {(state.node && state.node.referredBy.length) || "0"}{" "}
                      nodes
                    </List.Content>
                  </List.Item>
                </List>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ marginBottom: "10px" }}>
        <Graph
          id="graph-id"
          data={state.graphData}
          config={graphConfig}
          onClickNode={onClickNode}
          onRightClickNode={onRightClickNode}
          onClickGraph={onClickGraph}
          onClickLink={onClickLink}
          onRightClickLink={onRightClickLink}
          onMouseOverNode={onMouseOverNode}
          onMouseOutNode={onMouseOutNode}
          onMouseOverLink={onMouseOverLink}
          onMouseOutLink={onMouseOutLink}
          onNodePositionChange={onNodePositionChange}
        />
      </Segment>
    </Container>
  );
}

