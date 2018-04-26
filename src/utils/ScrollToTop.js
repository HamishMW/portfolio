import { Component } from 'react';

export default class ScrollToTop extends Component {
  componentWillReceiveProps(nextProps) {
    const { status: prevStatus } = this.props;
    const { status: nextStatus } = nextProps;

    if (prevStatus === 'entering' && nextStatus === 'entered') {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}
