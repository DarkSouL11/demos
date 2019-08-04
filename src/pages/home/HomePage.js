import React from "react";

import { Header, PageMeta } from "../../components/general";
import { mobxify } from "../../components/hoc";
import GameView from "./GameView";
import GameControls from "./GameControls";

function HomePage({ gameStore: store }) {
  return (
    <div className="layout is-main">
      <PageMeta title="Home" />
      <Header title="Tetris" />
      <div className="layout-content">
        <div className="game">
          <GameView />
          <GameControls />
        </div>
      </div>
    </div>
  );
}

export default mobxify("gameStore")(HomePage);
