import dotiw from "dotiw";
import { Location, Zmanim, HDate ,Sedra } from "@hebcal/core";



const colorize = (c) => `\x1B[${c}m`;
const red = colorize(31)
const green = colorize(32)
const black = colorize(0)



const newYork = Location.lookup("New York");
const today = new HDate();
const sunday = today.onOrBefore(0);
const parsha = new Sedra(today.getFullYear()).lookup(today).parsha
/**
 * Formats a timestamp as a relative time string.
 * For example, "in 2 hours 3 minutes 4 seconds" or "3 hours 4 minutes 5 seconds ago".
 * @param {Date} datetime
 * @returns {string} A string representing the relative time between now and the given date.
 */
export function reltativeFormat(datetime) {
  const now = new Date();
  const timeDifference = dotiw(now, datetime);
  const prefix = timeDifference.suffix === "later" ? "in " : "";
  const suffix = timeDifference.suffix === "ago" ? " ago" : "";
  return `${prefix}${timeDifference.hours} hours ${timeDifference.minutes} minutes ${timeDifference.seconds} seconds${suffix}`;
}

/**
 * Formats a timestamp as a string in the format "hh:mm a". For example, "09:27 AM".
 * @param {Date} datetime
 * @returns {string} A string representing the time in the format "hh:mm a".
 */
export function format(datetime) {
  const locale = "en-US";
  const dateFormatOptions = {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
  };
  return datetime.toLocaleTimeString(locale, dateFormatOptions);
}

/**
 * Gets the shma and tefilla times for the day of the week at the given index (e.g. 0 for Sunday, 1 for Monday, etc.)
 * @param {number} index
 * @returns {{day: string, shma: string, tefilla: string}} an object containing the day of the week, shma, and tefilla times for that day
 */
export function getZmanimForDay(index) {
  // first sunday of the week
  const date = sunday.onOrAfter(index); // get the {index}th day of the week
  const zmanim = new Zmanim(newYork, date); // create a zmanim object for the day
  const isToday = date.deltaDays(today) === 0; // is the day of the week today?

  // get the shma and tefilla times for the day
  const shmaTimestamp = zmanim.sofZmanShma();
  const tefillaTimestamp = zmanim.sofZmanTfilla();

  // format the shma and tefilla times based on whether it's today or not
  const shma = isToday ? Date.now()> shmaTimestamp ? red + reltativeFormat(shmaTimestamp) +   black  : green + reltativeFormat(shmaTimestamp) +black : black + format(shmaTimestamp) ;
  const tefilla = isToday ? Date.now() >tefillaTimestamp  ? red + reltativeFormat(tefillaTimestamp) +   black  : green + reltativeFormat(tefillaTimestamp) + black  :  black +format(tefillaTimestamp);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    day:  `${daysOfWeek[date.getDay()]} ${parsha}`,
    shma, shma,
    tefilla,
  };
}

