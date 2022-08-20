export default class Habit {
  private _name: string;

  constructor(name: string) {
    this.name = name;
  }

  public get name(): string {
    return this._name;
  }
  public set name(name: string) {
    if (name.length > 10)
      throw Error("the name of habit should not be longer than 10 chars");
    this._name = name;
  }
}
