import React, { Component } from 'react';
import autosize from 'autosize';

export default class TextArea extends Component {
  componentDidMount() {
    autosize(this.textarea);
  }

  render() {
    const { className, allowResize, ...props } = this.props;

    return (
      <textarea
        {...props}
        ref={node => this.textarea = node}
        className={className}
        style={{resize: allowResize ? null : 'none'}}
      />
    );
  }
}
