import Grid from "../models/grid";
import { decorate, observable, action } from "mobx";

class GameStore {
  instance = null;

  start = () => {
    this.instance = new Grid();
  };
}

decorate(GameStore, {
  instance: observable,
  start: action
});

export default new GameStore();
