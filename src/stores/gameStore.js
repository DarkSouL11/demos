import Grid from "../models/grid";
import { decorate, observable, action } from "mobx";

class GameStore {
  instance = new Grid();

  start = () => {
    this.instance.start();
  };

  retry = () => this.instance.restart();

  rotate = () => this.instance.rotate();

  move = step => this.instance.move(step);

  place = () => this.instance.quickPlace();
}

decorate(GameStore, {
  instance: observable,
  start: action
});

export default new GameStore();
