import { getZmanimForDay } from "./utils.js";

const daysOfTheWeek = [0, 1, 2, 3, 4, 5, 6].map(getZmanimForDay);

function lineInConsole(){ console.log('-'.repeat(110))}

const addSpaces = (str) => {
    const spacesToAdd = Math.max(0, 38- str.length);
    return str + " ".repeat(spacesToAdd);
  };
lineInConsole()
console.log(addSpaces(`Day`) + addSpaces(`Sof zman shma`) +addSpaces(`sof zmen tafile` ))
lineInConsole()
daysOfTheWeek.forEach((day)=>console.log(addSpaces( `${day.day}`)  + addSpaces(`${day.shma}`)  + addSpaces(`${day.tefilla}` )))
lineInConsole()

