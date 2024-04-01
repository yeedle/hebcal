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
  const shmaTimestamp = zmanim.sofZmanShma();
  const tefillaTimestamp = zmanim.sofZmanTfilla();
  const shma = isToday ? reltativeFormat(shmaTimestamp) : format(shmaTimestamp);
  const tefilla = isToday
    ? reltativeFormat(tefillaTimestamp)
    : format(tefillaTimestamp);

  return {
    day: date.renderGematriya(),
    shma,
    tefilla,
  };
});

console.table(daysOfTheWeek);
