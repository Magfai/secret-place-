const START = new Date("2025-04-07T00:00:00+02:00");
const ANNIVERSARY = new Date("2027-04-07T00:00:00+02:00");

export type TogetherParts = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function warsawParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: read("year"),
    month: read("month"),
    day: read("day"),
    hour: read("hour"),
    minute: read("minute"),
    second: read("second"),
  };
}

function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function diffParts(fromDate: Date, toDate: Date): TogetherParts {
  const from = warsawParts(fromDate);
  const to = warsawParts(toDate);

  let years = to.year - from.year;
  let months = to.month - from.month;
  let days = to.day - from.day;
  let hours = to.hour - from.hour;
  let minutes = to.minute - from.minute;
  let seconds = to.second - from.second;

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const previousMonth = to.month === 1 ? 12 : to.month - 1;
    const previousYear = to.month === 1 ? to.year - 1 : to.year;
    days += daysInMonth(previousYear, previousMonth);
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

export function togetherSince(now = new Date()): TogetherParts {
  return diffParts(START, now);
}

export function untilAnniversary(now = new Date()): TogetherParts {
  if (now.getTime() >= ANNIVERSARY.getTime()) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return diffParts(now, ANNIVERSARY);
}

export function isAnniversaryOpen(now = new Date()) {
  return now.getTime() >= ANNIVERSARY.getTime();
}

export function isNightHours(now = new Date()) {
  const hour = warsawParts(now).hour;
  return hour >= 0 && hour < 6;
}

export const TOGETHER_LABEL = "od 7 kwietnia 2025";
export const ANNIVERSARY_LABEL = "do 7 kwietnia 2027";
export const NIGHT_NOTE = "jesteś tutaj nawet w nocy? , idź spać słońce kocham cię ❤️";
