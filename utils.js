import dotiw from "dotiw";
import { Location, Zmanim, HDate } from "@hebcal/core";

const newYork = Location.lookup("New York");
const today = new HDate();
const sunday = today.onOrBefore(0);

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
  const shmaGRATimestamp = zmanim.sofZmanShma();
  const tefillaGRATimestamp = zmanim.sofZmanTfilla();
  const shmaMGATimestamp = zmanim.sofZmanShmaMGA();
  const tefillaMGATimestamp = zmanim.sofZmanTfillaMGA();

  // format the shma and tefilla times based on whether it's today or not
  const shmaGRA = isToday ? reltativeFormat(shmaGRATimestamp) : format(shmaGRATimestamp);
  const tefillaGRA = isToday
    ? reltativeFormat(tefillaGRATimestamp)
    : format(tefillaGRATimestamp);
    const shmaMGA = isToday ? reltativeFormat(shmaMGATimestamp) : format(shmaMGATimestamp);
    const tefillaMGA = isToday
      ? reltativeFormat(tefillaMGATimestamp)
      : format(tefillaMGATimestamp);

  return {
    day: date.render(),
    shmaGRA,
    tefillaGRA,
    shmaMGA,
    tefillaMGA,
  };
}
