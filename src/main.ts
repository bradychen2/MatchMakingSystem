import { DistanceBased, HabitBased } from "./models/MatchingStrategy";
import MatchingSystem from "./models/MatchingSystem";
import userGenerator from "./seeder/userGenerator";

const main = () => {
  const matchingSystemHabit = new MatchingSystem(new HabitBased());
  const userList_1 = userGenerator(5);
  userList_1.forEach((user) => {
    matchingSystemHabit.addUsers(user);
  });
  const allUsers = matchingSystemHabit.users;
  allUsers.forEach((user) => {
    matchingSystemHabit.findMatch(user);
  });

  // const matchingSystemDistance = new MatchingSystem(new DistanceBased());
  // const userList_2 = userGenerator(5);
  // userList_2.forEach((user) => {
  //   matchingSystemDistance.addUsers(user);
  // });
  // const allUsers = matchingSystemDistance.users;
  // allUsers.forEach((user) => {
  //   matchingSystemDistance.findMatch(user);
  // });
};

main();
