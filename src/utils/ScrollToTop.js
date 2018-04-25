import { Component } from 'react';

export default class ScrollToTop extends Component {
  componentWillReceiveProps(nextProps) {

    if (this.props.status === 'entering' && nextProps.status === 'entered') {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}
