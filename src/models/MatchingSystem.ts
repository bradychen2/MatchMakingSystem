import Individual from "./Individual";
import MatchingStrategy from "./MatchingStrategy";

export default class MatchingSystem {
  private _users: Individual[] = [];
  private _strategy: MatchingStrategy;

  constructor(strategy: MatchingStrategy) {
    this.strategy = strategy;
  }

  public get users(): Individual[] {
    return this._users;
  }
  public addUsers(user: Individual) {
    this._users.push(user);
  }

  public get strategy(): MatchingStrategy {
    return this._strategy;
  }
  public set strategy(value: MatchingStrategy) {
    this._strategy = value;
  }

  public findMatch(finder: Individual): void {
    finder.perfectMatch = this.strategy.findMatch(finder, this.users);
  }
}
