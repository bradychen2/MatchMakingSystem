import Decimal from "decimal.js";
import Individual from "./Individual";
import PerfectMatch from "./PerfectMatch";

export default interface MatchingStrategy {
  findMatch(finder: Individual, users: Individual[]): PerfectMatch;
}

export class DistanceBased implements MatchingStrategy {
  private calculateDistance(finder: Individual, user: Individual): Decimal {
    const deltaXSquare = finder.coord.x.minus(user.coord.x).pow(2);
    const deltaYSquare = finder.coord.y.minus(user.coord.y).pow(2);
    return deltaXSquare.plus(deltaYSquare).sqrt();
  }

  public findMatch(finder: Individual, users: Individual[]): PerfectMatch {
    let farthestUser!: Individual;
    let closestUser!: Individual;
    let farthestUserId: number = Number.MAX_SAFE_INTEGER;
    let closestUserId: number = Number.MAX_SAFE_INTEGER;
    let maxDistance: Decimal = new Decimal(0);
    let minDistance: Decimal = new Decimal(Number.MAX_SAFE_INTEGER);
    users.forEach((user) => {
      if (finder !== user && user.gender !== finder.gender) {
        const distance = this.calculateDistance(finder, user);
        console.log(`${distance.round().valueOf()}`);
        if (
          // Less than or equal to
          distance.lt(minDistance) ||
          (distance.eq(minDistance) && user.id < closestUserId)
        ) {
          closestUser = user;
          closestUserId = user.id;
          minDistance = distance;
        }
        if (
          // Greater than or equal to
          distance.gt(maxDistance) ||
          (distance.eq(maxDistance) && user.id < farthestUserId)
        ) {
          farthestUser = user;
          farthestUserId = user.id;
          maxDistance = distance;
        }
      }
    });
    const closestMatch = new PerfectMatch(finder, closestUser);
    const farthestMatch = new PerfectMatch(finder, farthestUser);
    console.log(
      `${finder.name}'s perfect match is ${
        closestUser.name
      }: distance - ${minDistance.round().valueOf()}`
    );
    return finder.reverse ? farthestMatch : closestMatch;
  }
}

export class HabitBased implements MatchingStrategy {
  private intersect(finder: Individual, user: Individual) {
    const finderHabits: string[] = [];
    finder.habits.forEach((habit) => {
      finderHabits.push(habit.name);
    });
    const userHabits: string[] = [];
    user.habits.forEach((habit) => {
      userHabits.push(habit.name);
    });
    console.log(
      `${finder.name} habits: ${JSON.stringify(finderHabits)}; ${
        user.name
      } habits: ${JSON.stringify(userHabits)}`
    );
    return new Set(
      [...finderHabits].filter((habit) => userHabits.includes(habit))
    );
  }

  public findMatch(finder: Individual, users: Individual[]): PerfectMatch {
    let mostIntersectUser!: Individual;
    let leastIntersectUser!: Individual;
    let mostIntersectUserId: number = Number.MAX_SAFE_INTEGER;
    let leastIntersectUserId: number = Number.MAX_SAFE_INTEGER;
    let mostIntersectSize = 0;
    let minIntersectSize = Number.MAX_SAFE_INTEGER;
    users.forEach((user) => {
      if (finder !== user && user.gender !== finder.gender) {
        const intersectSize = this.intersect(finder, user).size;
        console.log(`matching size: ${intersectSize}`);
        if (
          intersectSize > mostIntersectSize ||
          (intersectSize === mostIntersectSize && user.id < mostIntersectUserId)
        ) {
          mostIntersectUser = user;
          mostIntersectUserId = user.id;
          mostIntersectSize = intersectSize;
        }
        if (
          intersectSize < minIntersectSize ||
          (intersectSize === minIntersectSize && user.id < leastIntersectUserId)
        ) {
          leastIntersectUser = user;
          leastIntersectUserId = user.id;
          minIntersectSize = intersectSize;
        }
      }
    });
    const mostIntersectMatch = new PerfectMatch(finder, mostIntersectUser);
    const leastIntersectMatch = new PerfectMatch(finder, leastIntersectUser);
    console.log(
      `${finder.name}'s perfect match is ${mostIntersectUser.name}: matching size - ${mostIntersectSize}`
    );
    return finder.reverse ? leastIntersectMatch : mostIntersectMatch;
  }
}
