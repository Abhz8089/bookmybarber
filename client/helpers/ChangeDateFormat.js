function convertToISO8601(inputDateString) {
  const inputDate = new Date(inputDateString);

  // Get the year, month, day, and time components
  const year = inputDate.getUTCFullYear();
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(inputDate.getUTCDate()).padStart(2, "0");
  const time = inputDate.toISOString().split("T")[1];

  // Combine the components to create the desired format
  const outputDateString = `${year}-${month}-${day}T${time}+00:00`;

  return outputDateString;
}
export {convertToISO8601}