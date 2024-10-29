const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getFormattedDate = (date: string) => {
  const dateValue = new Date(date);
  const formattedDate = `${
    MONTHS[dateValue.getMonth()]
  } ${dateValue.getDate()}, ${dateValue.getFullYear()}`;

  return formattedDate;
};
