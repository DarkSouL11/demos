import React from "react";

import { Header, PageMeta, HintLayout } from "../../components/general";
import { mobxify } from "../../components/hoc";
import GridView from "./GridView";

function HomePage({ gameStore: store }) {
  function move(event) {
    const { keyCode } = event;

    switch (keyCode) {
      case 37:
        store.instance.move(-1);
        break;
      case 39:
        store.instance.move(1);
        break;
      default:
      //  Ignore
    }
  }

  function ui() {
    if (store.instance) {
      return (
        <div tabIndex="0" onKeyDown={move}>
          <GridView grid={store.instance} />
          <div>Score: {store.instance.score}</div>
          {store.instance.isEnded && <div className="title">Game ended!</div>}
        </div>
      );
    } else {
      return (
        <HintLayout
          message="Do you want to play tetris"
          actionLabel="Start Game"
          actionFn={() => store.start()}
        />
      );
    }
  }

  return (
    <div className="layout is-main">
      <PageMeta title="Home" />
      <Header title="Tetris" />
      {ui()}
    </div>
  );
}

export default mobxify("gameStore")(HomePage);
