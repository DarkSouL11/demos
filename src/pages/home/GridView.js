import React from "react";
import { observer } from "mobx-react";

function GridView({ grid }) {
  const matrix = grid.matrixWithShapes;

  return (
    <div className="game">
      {matrix.map((row, rowIndex) => (
        <div key={`row/${rowIndex}`} className="game-row">
          {row.map((item, colIndex) => (
            <div key={`col/${colIndex}`} className="game-box">
              {item > -1 ? item : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default observer(GridView);
