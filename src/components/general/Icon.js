import React from "react";
import classNames from "classnames";

function Icon({ name, className }) {
  return React.createElement("i", {
    className: classNames("material-icons", { [className]: className }),
    children: name
  });
}

export default Icon;
