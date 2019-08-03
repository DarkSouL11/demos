import React from "react";
import PropTypes from "prop-types";

import Tappable from "./Tappable";

function HintLayout({ message, actionLabel, actionFn }) {
  return (
    <div className="layout">
      <div className="layout-content is-centered pad">
        <p>{message}</p>
        {actionLabel &&
          actionFn && (
            <Tappable className="btn mgn-t" onClick={actionFn}>
              {actionLabel}
            </Tappable>
          )}
      </div>
    </div>
  );
}

HintLayout.defaultProps = {
  actionLabel: "Try Again"
};

HintLayout.propTypes = {
  message: PropTypes.string.isRequired,
  actionFn: PropTypes.func,
  actionLabel: PropTypes.string
};

export default HintLayout;
