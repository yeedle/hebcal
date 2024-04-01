import { getZmanimForDay, renderToday } from "./utils.js";
import readline from "readline-sync";

const rules = ["Gra", "MGA", "MGA 16.1"];
const index = readline.keyInSelect(rules, "select your minhag");
const rule = rules[index]


const daysOfTheWeek = [0, 1, 2, 3, 4, 5, 6].map(day => getZmanimForDay(day, rule));


console.table(daysOfTheWeek);
renderToday(rule)
