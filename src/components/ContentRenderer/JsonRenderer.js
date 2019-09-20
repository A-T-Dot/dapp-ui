import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

export default class JsonRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myJson: ""
    };
  }

  async componentDidMount() {
    var that = this;
    let { url } = this.props;
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        
        that.setState({
          myJson: myJson
        });
      });
  }
  render() {
    return (
      <div>
        <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(this.state.myJson, null, 2)}</pre>
      </div>
    );
  }
}
