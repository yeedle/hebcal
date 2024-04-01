import { Location, Zmanim, HDate } from "@hebcal/core";
import { reltativeFormat, format } from "./formatting.js";

const newYork = Location.lookup("New York");
const today = new HDate();
const sunday = today.onOrBefore(0);

const daysOfTheWeek = [0, 1, 2, 3, 4, 5, 6].map((index) => {
  const date = sunday.onOrAfter(index); // get the {index}th day of the week
  const zmanim = new Zmanim(newYork, date); // create a zmanim object for the day
  const isToday = date.deltaDays(today) === 0; // is the day of the week today?

  // get the shma and tefilla times for the day, format them based on whether it's today or not
  let shma = isToday
    ? reltativeFormat(zmanim.sofZmanShma())
    : format(zmanim.sofZmanShma());
  const tefilla = isToday
    ? reltativeFormat(zmanim.sofZmanTfilla())
    : format(zmanim.sofZmanTfilla());

  return {
    day: date.render(),
    shma,
    tefilla,
  };
});

console.table(daysOfTheWeek);
