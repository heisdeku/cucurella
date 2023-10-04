export function formatDateTime(inputDateTime: Date) {
  const inputDate = new Date(inputDateTime);
  const currentDate = new Date();

  // Check if the input date is today
  const isToday =
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear();

  // Get hours and minutes in 12-hour format
  const hours = inputDate.getHours() % 12 || 12;
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');
  const meridiem = inputDate.getHours() >= 12 ? 'pm' : 'am';

  if (isToday) {
    return `Today • ${hours}:${minutes}${meridiem}`;
  } else {
    const formattedDate = inputDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return `${formattedDate} at ${hours}:${minutes}${meridiem}`;
  }
}

export function formatDate(date: Date) {
  const currentDate = new Date();
  const inputDate = new Date(date);

  // Calculate the difference in days
  const diffTime = Math.abs(
    ((Number(currentDate) as number) - Number(inputDate)) as number,
  );
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // If the difference is 0, it's "Today"
  if (diffDays === 0) {
    return 'Today';
  }
  // If the difference is 1, it's "Yesterday"
  else if (diffDays === 1) {
    return 'Yesterday';
  }
  // Otherwise, format the date as "Month, Day, Year" (e.g., "July 28, 2018")
  else {
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    //@ts-ignore
    return inputDate.toLocaleDateString(undefined, options);
  }
}

export function getSevenDaysRange() {
  const today = new Date();
  const previousDays = new Date();
  previousDays.setDate(today.getDate() - 7);

  const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
  const dateOptions = {month: 'long', day: 'numeric'};

  const formattedStartDate = previousDays.toLocaleDateString(
    undefined,
    //@ts-ignore
    options,
  );
  //@ts-ignore
  const formattedEndDate = today.toLocaleDateString(undefined, options);

  const startDate = previousDays.toLocaleDateString(
    undefined,
    //@ts-ignore
    dateOptions,
  );
  //@ts-ignore
  const endDate = today.toLocaleDateString(undefined, dateOptions);

  return {
    start: formattedStartDate,
    end: formattedEndDate,
    word: `${startDate} - ${endDate}`,
  };
}

export function getDaysRange(range: 'week' | 'month') {
  const today = new Date();
  const previousDays = new Date();
  const timeRange = range === 'week' ? 7 : 30;
  previousDays.setDate(today.getDate() - timeRange);

  const dateOptions = {month: 'long', day: 'numeric'};

  function convertDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const formattedStartDate = convertDate(previousDays);
  //@ts-ignore
  const formattedEndDate = convertDate(today);

  const startDate = previousDays.toLocaleDateString(
    undefined,
    //@ts-ignore
    dateOptions,
  );
  //@ts-ignore
  const endDate = today.toLocaleDateString(undefined, dateOptions);

  return {
    start: formattedStartDate,
    end: formattedEndDate,
    word: `${startDate} - ${endDate}`,
  };
}

export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Function to check if two dates are in the same week
export function isSameWeek(date1: Date, date2: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    Math.abs((Number(date1) - Number(date2)) / oneDay),
  );
  return diffDays <= 7;
}

export function calculateDaysLeft(targetDate: Date) {
  const now = new Date();
  const difference = new Date(targetDate)?.getTime() - now.getTime();
  const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
  return daysLeft;
}
