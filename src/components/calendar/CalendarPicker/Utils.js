/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */

export const Utils = {
  START_DATE: 'START_DATE',
  END_DATE: 'END_DATE',
  WEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  // MONTHS: [
  //   'January', 'February', 'March', 'April', 'May', 'June', 'July',
  //   'August', 'September', 'October', 'November', 'December'
  // ],
  MONTHS: [
    '1월', '2월', '3월', '4월', '5월', '6월', '7월',
    '8월', '9월', '10월', '11월', '12월'
  ],
  MAX_ROWS: 7,
  MAX_COLUMNS: 7,
  FIRST_DAY_OFFSETS: [0, -1, 5, 4, 3, 2, 1],
  getDaysInMonth: function(month, year) {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
  },
  isSameMonthAndYear: function(date, month, year) {
    if (date) {
      return date.month() === month && date.year() === year;
    }
    return false;
  },
  // Test whether objects' values are different.
  // `exclusions` param ignores provided keys.
  // Returns array of keys that are different (empty array means identical).
  // 이새낀 뭘하는거지?
  // shallowDiff: function(a, b, exclusions = []) {
  //   const diffs = [];
  //   for (let key of Object.keys(a)) {
  //     if (exclusions.includes(key)) {
  //       // console.log("includes")
  //       // console.log(key)
  //       continue;
  //     }
  //     if (a[key] !== b[key]) {
  //       // console.log("key")
  //       // console.log(key)
  //       diffs.push(key);
  //     }
  //   }
  //   return diffs;
  // },
  shallowDiff: function(a, b, exclusions) {
    for (let key of Object.keys(a)) {
      if (exclusions === key) {
        continue;
      }
      if (a[key] !== b[key]) {
        return true;
      }
    }
    return false;
  },
  // Robust compare Moment dates.
  // compareDates: function(a, b, granularity) {
  compareDates: function(a, b) {
    // Allow for falsy (null & undefined) equality.
    if (!a && !b) {
      return true;
    }
    // return !!a && !!b && a.isSame(b, granularity);
    return !!a && !!b && a===b;
  },
  getWeekdays: function(firstDay = 0) {
    let from = firstDay;
    const weekdays = [];
    for (let i = 0; i < Utils.WEEKDAYS.length; i++) {
      weekdays.push(Utils.WEEKDAYS[from]);
      from = from >= Utils.WEEKDAYS.length - 1 ? 0 : from + 1;
    }
    return weekdays;
  },
  getISOWeekdaysOrder: function(firstDay = 0) {
    let from = firstDay === 0 ? 7 : firstDay;
    const order = [];
    for (let i = 0; i < Utils.WEEKDAYS.length; i++) {
      order.push(from);
      from = from >= Utils.WEEKDAYS.length ? 1 : from + 1;
    }
    return order;
  },
};
