import { Component } from 'react';

export default class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { status: prevStatus } = prevProps;
    const { status: nextStatus } = this.props;

    if (prevStatus === 'entering' && nextStatus === 'entered') {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}
