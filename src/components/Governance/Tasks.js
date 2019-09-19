import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Search,
  Button,
  Card,
  Grid,
  List,
  Item
} from "semantic-ui-react";
import axios from "../../api/axios";
import Ipfs from "../../utils/Ipfs";

function Task(props) {
  let task = props.task;
  let cid = Ipfs.getCIDv0fromContentHashStr(task.nodeId).toString();
  if (task.status == 0) {
    // proposed
    return (
      <Item>
        <Item.Content style={{ width: "100%" }}>
          <Item.Header>New Proposal </Item.Header>
          <Item.Description className="break-word">
            A proposal has been made from {task.proposer} to add
            <Link to={`/node/${cid}`}>
              {cid}
            </Link>
            to TCX#
            {task.tcxId}
          </Item.Description>
          <Button.Group floated="right">
            <Button primary>Challenge</Button>
          </Button.Group>
        </Item.Content>
      </Item>
    );
  } else if (task.status == 1) {
    // challenged
    // voting process
    return (
      <Item>
        <Item.Content style={{ width: "100%" }}>
          <Item.Header>Vote now!</Item.Header>
          <Item.Description className="break-word">
            {task.challenger} challenged
            <Link to={`/node/${cid}`}>{cid}</Link> from being added
            to TCX#
            {task.tcxId}
          </Item.Description>
          <Button.Group floated="right">
            <Button>Yes</Button>
            <Button.Or />
            <Button positive>No</Button>
          </Button.Group>
        </Item.Content>
      </Item>
    );
  } else if (task.status == 3) {
    // accepted
    // TODO: show claim if winner side, changed status to 2
    return (
      <Item>
        <Item.Content style={{ width: "100%" }}>
          <Item.Header>Content Accepted</Item.Header>
          <Item.Description className="break-word">
            {task.proposer}'s proposal to add
            <Link to={`/node/${cid}`}>{cid}</Link> to TCX#
            {task.tcxId} has been accepted
          </Item.Description>
          <Button.Group floated="right">
            <Button positive>Claim Reward</Button>
          </Button.Group>
        </Item.Content>
      </Item>
    );
  } else if (task.status == 4) {
    // resolved
    // TODO: show claim if winner side

    return (
      <Item>
        <Item.Content style={{ width: "100%" }}>
          <Item.Header>Content Rejected</Item.Header>
          <Item.Description className="break-word">
            {task.proposer}'s proposal to add
            <Link to={`/node/${cid}`}>{cid}</Link> to TCX#
            {task.tcxId} has been rejected
          </Item.Description>
          <Button.Group floated="right">
            <Button color="red">Claim Reward</Button>
          </Button.Group>
        </Item.Content>
      </Item>
    );
  }
}

function Tasks(props) {
  let { tasks } = props;
  if (tasks.length == 0) {
    return <div>No tasks</div>;
  }
  return (
    <Item.Group divided style={{width: '100%'}}>
      {tasks.map((task, index) => {
        return <Task key={index} task={task} />;
      })}
    </Item.Group>
  );
  tasks.map(task => {
    return;
  });
}

export default Tasks;