import dotiw from "dotiw";

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
