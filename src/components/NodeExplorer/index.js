import React, { useState, useEffect } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Graph } from "react-d3-graph";

const graphConfig = {
  "automaticRearrangeAfterDropNode": false,
  "collapsible": false,
  "directed": false,
  "focusAnimationDuration": 0.75,
  "focusZoom": 2,
  "height": 400,
  "highlightDegree": 1,
  "highlightOpacity": 1,
  "linkHighlightBehavior": false,
  "maxZoom": 4,
  "minZoom": 0.5,
  "nodeHighlightBehavior": false,
  "panAndZoom": false,
  "staticGraph": false,
  "staticGraphWithDragAndDrop": false,
  "width": 800,
  "d3": {
    "alphaTarget": 0.05,
    "gravity": -100,
    "linkLength": 100,
    "linkStrength": 1
  },
  "node": {
    "color": "#d3d3d3",
    "fontColor": "black",
    "fontSize": 8,
    "fontWeight": "normal",
    "highlightColor": "SAME",
    "highlightFontSize": 8,
    "highlightFontWeight": "normal",
    "highlightStrokeColor": "SAME",
    "highlightStrokeWidth": "SAME",
    "labelProperty": "id",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": true,
    "size": 150,
    "strokeColor": "none",
    "strokeWidth": 1.5,
    "svg": "",
    "symbolType": "circle"
  },
  "link": {
    "color": "#d3d3d3",
    "fontColor": "black",
    "fontSize": 8,
    "fontWeight": "normal",
    "highlightColor": "#d3d3d3",
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
  const { nodeid } = props.match.params
  const [current, setCurrent] = useState({
    index: nodeid,
    srcData: [
      {
        tcx: 'TCX1',
        node: [
          'Chenjesu',
          'Ilwrath',
          'Mycon',
          'Spathi',
          'Umgah',
          'VUX',
          'Guardian',
        ]
      },
      {
        tcx: 'TCX2',
        node: [
          'Mycon',
          'Spathi',
          'Umgah',
          'VUX',
        ]
      },
      {
        tcx: 'TCX3',
        node: [
          'Spathi',
          'Umgah',
          'VUX',
        ]
      },
    ]
  })

  const graphData = {
    links: [],
    nodes: []
  }

  const tempIdList = []
  current.srcData.forEach(item => {
    graphData.nodes.push({
      id: item.tcx,
    })
    item.node.forEach(node => {
      graphData.links.push({
        source: item.tcx,
        target: node,
      })
      if (tempIdList.indexOf(node) === -1) {
        tempIdList.push(node)
        graphData.nodes.push({
          id: node,
          symbolType: "square",
        })
      }
    })
  })

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

  useEffect(() => {
    // TODO request api

  }, []);

  console.log(graphData)

  return (
    <Container>
      <Header size='large'>
        Node Explorer
      </Header>
      node id: {current.index}
      <Graph
        style={{ background: '#ccc' }}
        id="graph-id"
        data={graphData}
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

    </Container>
  )
}

