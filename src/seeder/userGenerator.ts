import Individual, { GenderType } from "../models/Individual";
import { faker } from "@faker-js/faker";

export default function userGenerator(userCount: number): Individual[] {
  const userList: Individual[] = [];
  let id = 1;
  const habitsPool = [
    "籃球",
    "登山",
    "健身",
    "音樂",
    "閱讀",
    "電影",
    "旅行",
    "品酒",
    "語文",
    "投資",
    "繪畫",
    "跳舞",
    "棒球",
  ];
  const gender = ["MALE", "FEMALE"];
  while (userCount > 0) {
    userList.push(
      new Individual({
        id: id,
        name: faker.name.fullName(),
        gender: gender[faker.datatype.number({ min: 0, max: 1 })] as GenderType,
        age: faker.datatype.number({ min: 18, max: 40 }),
        habits: [
          habitsPool[Math.floor(Math.random() * habitsPool.length)],
          habitsPool[Math.floor(Math.random() * habitsPool.length)],
          habitsPool[Math.floor(Math.random() * habitsPool.length)],
        ],
        xValue: faker.datatype.number({ min: -100, max: 100 }),
        yValue: faker.datatype.number({ min: -100, max: 100 }),
      })
    );
    id += 1;
    userCount -= 1;
  }
  return userList;
}
