export const getIsoDateInfo = (
  dateString: string
): { dayOfWeek: string; month: string; dateNumber: string } => {
  const date = new Date(dateString);

  const dayOfWeek = date.getDay();

  const month = date.getMonth();

  const dateNumber = date.getDate().toString();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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

  const dayOfWeekName = daysOfWeek[dayOfWeek];
  const monthName = months[month];

  return { dayOfWeek: dayOfWeekName, month: monthName, dateNumber };
};
