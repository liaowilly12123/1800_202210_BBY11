/**
 * Formats Date Object into "month day"
 * @param {*} date a Date object
 * @returns formattedDate 
 */
function formatDate(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // date formatted
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const formattedDate = `${month} ${day}`;

  return formattedDate;
}

/**
 * Formats Date Object into "hour:minute am/pm"
 * @param {*} date a Date object
 * @returns formattedTime
 */
function formatTime(date) {
  // convert hour from 24h to 12h format
  let hour = date.getHours();

  const ampm = hour < 12 ? 'am' : 'pm';

  hour = hour % 12;
  hour = hour ? hour : 12;

  // format minutes to have 2 digits
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${hour}:${minutes} ${ampm}`;

  return time;
}

/**
 * Redirects the user to the specified location.
 * @param {*} location location to redirect
 */
function redirect(location) {
  window.location.href = location;
}