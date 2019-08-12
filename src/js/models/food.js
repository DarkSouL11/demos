class Food {
  constructor(weight, position) {
    this._weight = weight;
    this._position = position;
  }

  /**
   * Override in subclasses to do some clean up when food is eaten by snake
   */
  clear() {}

  get weight() {
    return this._weight;
  }

  get position() {
    return this._position;
  }
}

export default Food;
