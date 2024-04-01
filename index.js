import { Location, Zmanim, HDate } from "@hebcal/core";
import { reltativeFormat, format, getZmaninForDay } from "./utils.js";

const newYork = Location.lookup("New York");
const today = new HDate();
const sunday = today.onOrBefore(0); // first sunday of the week

const daysOfTheWeek = [0, 1, 2, 3, 4, 5, 6].map(getZmaninForDay);

console.table(daysOfTheWeek);
