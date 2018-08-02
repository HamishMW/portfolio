import React, { Component } from 'react';

const asyncComponent = (importComponent, props) => {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const ComponentItem = this.state.component;
      return ComponentItem ? <ComponentItem {...this.props} {...props} /> : null;
    }
  }

  return AsyncComponent;
}

export default asyncComponent;
