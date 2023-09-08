function convertDateFormat(inputDateString) {
  const inputDate = new Date(inputDateString);

  const year = inputDate.getUTCFullYear();
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(inputDate.getUTCDate()).padStart(2, "0");
  const hours = String(inputDate.getUTCHours()).padStart(2, "0");
  const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(inputDate.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(inputDate.getUTCMilliseconds()).padStart(3, "0");

  const outputDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  return outputDateString;
}

export { convertDateFormat };