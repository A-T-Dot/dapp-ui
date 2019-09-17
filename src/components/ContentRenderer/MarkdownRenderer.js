import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

export default class MarkdownRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  async componentDidMount() {
    var that = this;
    let { url } = this.props;
    fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(function(md) {
        that.setState({
          input: md
        });
      });
  }
  render() {
    return <ReactMarkdown source={this.state.input} />;
  }
}

MarkdownRenderer.propTypes = {
  url: PropTypes.string
}