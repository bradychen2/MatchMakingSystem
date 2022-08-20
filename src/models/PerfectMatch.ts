import Individual from "./Individual";

export default class PerfectMatch {
  private _finder: Individual;
  private _match: Individual;

  public get finder(): Individual {
    return this._finder;
  }

  public get match(): Individual {
    return this._match;
  }

  constructor(finder: Individual, match: Individual) {
    this._finder = finder;
    this._match = match;
  }
}
