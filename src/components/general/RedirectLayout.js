import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Tappable from "./Tappable";

function RedirectLayout({ message, linkTitle, linkTo }) {
  return (
    <div className="layout">
      <div className="layout-content is-centered pad">
        <p>{message}</p>
        {linkTitle && linkTo && (
          <Tappable className="btn mgn-t" component={Link} to={linkTo}>
            {linkTitle}
          </Tappable>
        )}
      </div>
    </div>
  );
}

RedirectLayout.propTypes = {
  message: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  linkTitle: PropTypes.string
};

export default RedirectLayout;
