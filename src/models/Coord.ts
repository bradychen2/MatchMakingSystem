import Decimal from "decimal.js";

export default class Coord {
  private _x: Decimal;
  private _y: Decimal;

  constructor(x: Decimal, y: Decimal) {
    this.x = x;
    this.y = y;
  }

  public getXValue(): string {
    return this._x.valueOf();
  }
  public get x(): Decimal {
    return this._x;
  }
  public set x(value: Decimal) {
    this._x = value;
  }

  public getYValue(): string {
    return this._y.valueOf();
  }
  public get y(): Decimal {
    return this._y;
  }
  public set y(value: Decimal) {
    this._y = value;
  }
}
