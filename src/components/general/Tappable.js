import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Tappable({ className, component, disabled, ...remainingProps }) {
  return React.createElement(component || "a", {
    className: classNames("tappable", { disabled }, { [className]: className }),
    ...remainingProps
  });
}

Tappable.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default Tappable;
