import React from "react";

import { Icon, Tappable } from "../../components/general";
import { mobxify } from "../../components/hoc";

function GameControls({ gameStore: store, toastStore }) {
  const grid = store.instance;

  function scoreUi() {
    return (
      <div className="game-score-container game-detail sep-b">
        <div className="title mgn-b">Score</div>
        <div className="game-score">
          {grid.score.toString().padStart(4, "0")}
        </div>
      </div>
    );
  }

  function controlsUi() {
    return (
      <div className="game-controls-container game-detail sep-b">
        <div className="title mgn-b">Controls</div>
        <div className="game-controls">
          <div className="game-control">
            <div className="game-control-label">Rotate</div>
            <Tappable
              className="btn btn-small"
              onClick={() => toastStore.show("Not yet implemented")}
            >
              <Icon name="arrow_upward" />
            </Tappable>
          </div>
        </div>
        <div className="game-controls">
          <div className="game-control">
            <Tappable className="btn btn-small" onClick={() => store.move(-1)}>
              <Icon name="arrow_back" />
            </Tappable>
            <div className="game-control-label">Move Left</div>
          </div>
          <div className="game-control">
            <Tappable className="btn btn-small" onClick={() => store.place()}>
              <Icon name="arrow_downward" />
            </Tappable>
            <div className="game-control-label">Quick Place</div>
          </div>
          <div className="game-control">
            <Tappable className="btn btn-small" onClick={() => store.move(1)}>
              <Icon name="arrow_forward" />
            </Tappable>
            <div className="game-control-label">Move Right</div>
          </div>
        </div>
      </div>
    );
  }

  function actionsUi() {
    let actionProps;
    if (!grid.isStarted) {
      actionProps = {
        children: "Start Game",
        className: "btn btn-small",
        onClick: () => store.start()
      };
    } else {
      actionProps = {
        children: "Restart Game",
        className: "btn btn-danger btn-small",
        onClick: () => store.retry()
      };
    }

    return (
      <div className="game-actions game-detail sep-b">
        <div className="title mgn-b">Actions</div>
        <Tappable {...actionProps} />
      </div>
    );
  }

  function statusUi() {
    let statusProps;
    if (!grid.isStarted) {
      statusProps = { children: "Not Started" };
    } else if (!grid.isEnded) {
      statusProps = { children: "In Progress", className: "primary" };
    } else {
      statusProps = { children: "Game Ended!", className: "danger" };
    }

    return (
      <div className="game-status game-detail sep-b">
        <div className="title mgn-b">Status</div>
        <div {...statusProps} />
      </div>
    );
  }

  return (
    <div className="game-details">
      {scoreUi()}
      {controlsUi()}
      {actionsUi()}
      {statusUi()}
    </div>
  );
}

export default mobxify("gameStore", "toastStore")(GameControls);
