import React, { useState, useEffect } from "react";
import { Container, Header, Grid, Image, Card, Search } from "semantic-ui-react";
import Draggable from 'react-draggable'; 


export class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0
      },
      controlledPosition: {
        x: -400,
        y: 200
      }
    };
  }

  eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
  };

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
  };
  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };


    return (
      <Grid style={{ height: "80vh" }}>
        <Grid.Row columns={3} style={{ height: "100%" }}>
          <Grid.Column
            width={3}
            color="grey"
            style={{ maxHeight: "100%", overflow: "auto" }}
          >
            <Search style={{ marginBottom: "1rem" }} />
            <Card.Group itemsPerRow={1} centered>
              <Card fluid header="Option 1" />
              <Card fluid header="Option 2" />
              <Card fluid header="Option 3" />
              <Card fluid header="Option 2" />
              <Card fluid header="Option 3" />
              <Card fluid header="Option 2" />
              <Card fluid header="Option 3" />
              <Card fluid header="Option 3" />
              <Card fluid header="Option 2" />
              <Card fluid header="Option 3" />
            </Card.Group>
          </Grid.Column>
          <Grid.Column
            width={10}
            color="grey"
            style={{
              maxHeight: "100%",
              overflow: "auto",
              position: "relative",
              padding: '0px'
            }}
          >
            <div className="bg-grid" style={{ height: "3000px", width: "3000px", padding: "10px" }}>
              <Draggable bounds="parent" {...dragHandlers}>
                <div style={{ width: "300px", height: "300px" }}>
                  I also can only be moved within my offsetParent.
                  <br />
                  <br />
                  Both parent padding and child margin work properly.
                </div>
              </Draggable>
            </div>
          </Grid.Column>
          <Grid.Column
            width={3}
            color="grey"
            style={{ maxHeight: "100%", overflow: "auto" }}
          >
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}