import { getZmanimForDay } from "./utils.js";


const daysOfTheWeek = [0, 1, 2, 3, 4, 5, 6].map(getZmanimForDay);

console.table(daysOfTheWeek);
