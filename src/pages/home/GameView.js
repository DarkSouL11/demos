import React from "react";
import compose from "lodash/fp/compose";

import { lifecycle, mobxify } from "../../components/hoc";
import gameStore from "../../stores/gameStore";

const defaultColor = "#f2f2f2";

const colors = [
  "#69A2B0",
  "#659157",
  "#E05263",
  "#477998",
  "#663F46",
  "#7692FF"
];

const gameEventsHandler = event => {
  const store = gameStore;
  if (!store.instance) return;

  const { keyCode } = event;
  switch (keyCode) {
    // Left arrow
    case 37:
      store.move(-1);
      break;
    case 38:
      store.rotate();
      break;
    // Right arrow
    case 39:
      store.move(1);
      break;
    // Down arrow
    case 40:
      store.place();
      break;
    default:
    // Ignore
  }
};

function GameView({ gameStore: store }) {
  const grid = store.instance;
  const matrix = grid.matrixWithShapes;

  return (
    <div className="game-grid">
      {matrix.map((row, rowIndex) => (
        <div key={`row/${rowIndex}`} className="game-grid-row">
          {row.map((item, colIndex) => (
            <div
              key={`col/${colIndex}`}
              style={{
                backgroundColor:
                  item > -1 ? colors[item % colors.length] : defaultColor
              }}
              className="game-grid-col"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const hoc = compose(
  lifecycle({
    componentDidMount() {
      document.addEventListener("keydown", gameEventsHandler);
    },

    componentWillUnmount() {
      document.removeEventListener("keydown", gameEventsHandler);
    }
  }),
  mobxify("gameStore")
);

export default hoc(GameView);
