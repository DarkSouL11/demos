import React, { Component } from "react";
import forOwn from "lodash/forOwn";

/**
 * A higher order component for using React lifecycle hooks with
 * functional components.
 */
const lifecycle = hooks => BaseComponent => {
  class WrapperComponent extends Component {
    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  forOwn(hooks, (v, k) => (WrapperComponent.prototype[k] = v));

  return WrapperComponent;
};

export default lifecycle;
