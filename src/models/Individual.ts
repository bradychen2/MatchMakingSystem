import Decimal from "decimal.js";
import Coord from "./Coord";
import Habit from "./Habit";
import PerfectMatch from "./PerfectMatch";

enum Gender {
  "MALE" = 0,
  "FEMALE" = 1,
}

export type GenderType = keyof typeof Gender;

export default class Individual {
  private _id: number;
  private _name: string;
  private _gender: GenderType;
  private _age: number;
  private _intro = "";
  private _coord: Coord;
  private _habits: Set<Habit>;
  private _perfectMatch: PerfectMatch;
  private _reverse = false;

  constructor(userInfo: {
    id: number;
    name: string;
    gender: GenderType;
    age: number;
    habits: string[];
    xValue: number;
    yValue: number;
  }) {
    this._id = userInfo.id;
    this.name = userInfo.name;
    this._gender = userInfo.gender;
    if (userInfo.age < 18)
      throw Error("Plz come back in the future when you are over 18");
    this._age = userInfo.age;
    this.setHabits(userInfo.habits);
    this.setCoord(userInfo.xValue, userInfo.yValue);
  }

  public get reverse(): boolean {
    return this._reverse;
  }
  public set reverse(value: boolean) {
    this._reverse = value;
  }

  public get perfectMatch(): PerfectMatch {
    return this._perfectMatch;
  }
  public set perfectMatch(perfectMatch: PerfectMatch) {
    this._perfectMatch = perfectMatch;
  }

  public get habits(): Set<Habit> {
    return this._habits;
  }
  public setHabits(habitsStrings: string[]) {
    const habits = [...new Set(habitsStrings)].map((habitString) => {
      return new Habit(habitString);
    });
    this._habits = new Set(habits);
  }
  public get habitsString(): string {
    let habitsString = "";
    this._habits.forEach((habit) => {
      if (habitsString !== "") {
        habitsString += `, ${habit.name}`;
      } else {
        habitsString += habit.name;
      }
    });
    return habitsString;
  }
  public addHabit(habit: Habit) {
    this._habits.add(habit);
  }

  public get coord(): Coord {
    return this._coord;
  }
  public setCoord(xValue: number, yValue: number) {
    this._coord = new Coord(new Decimal(xValue), new Decimal(yValue));
  }

  public get intro() {
    return this._intro;
  }
  public set intro(content) {
    if (content.length > 200) throw Error("intro cannot be over 200 chars");
    this._intro = content;
  }

  public get name(): string {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  public get age(): number {
    return this._age;
  }

  public get gender(): GenderType {
    return this._gender;
  }

  public get id(): number {
    return this._id;
  }
}
