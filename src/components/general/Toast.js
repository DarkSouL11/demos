import React from "react";
import PropTypes from "prop-types";

import { mobxify } from "../hoc";
import { ToastStore } from "../../stores/toastStore";

// Single component controlled by `toastStore`
function Toast({ toastStore }) {
  if (!toastStore.content) return null;

  return (
    <div className="toast">
      <div className="toast-content">{toastStore.content}</div>
    </div>
  );
}

Toast.propTypes = {
  toastStore: PropTypes.instanceOf(ToastStore)
};

export default mobxify("toastStore")(Toast);
