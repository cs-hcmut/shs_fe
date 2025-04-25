import dayjs from "dayjs";
import { Stats_Log } from "src/types/stats/stats.type";

export function getAverageValuesByDayThisMonth(data: Stats_Log[]): number[] {
  // Sort data from oldest to newest for sequential processing
  const sortedData = [...data].sort(
    (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
  );

  // Get current date info
  const now = dayjs();
  const currentYear = now.year();
  const currentMonth = now.month();
  const currentDay = now.date();

  // Calculate number of days to process (from 1st of month to current day)
  const daysInMonth = currentDay;

  // Initialize result array
  const result: number[] = [];

  // Process each day in the month until today
  let previousDayAverage: number | null = null;

  for (let day = 1; day <= daysInMonth; day++) {
    // Create date for this day

    // Filter data points for this day
    const dayData = sortedData.filter((item) => {
      const itemDate = dayjs(item.createdAt);
      return (
        itemDate.year() === currentYear &&
        itemDate.month() === currentMonth &&
        itemDate.date() === day
      );
    });

    if (dayData.length > 0) {
      // Calculate average for this day
      const sum = dayData.reduce((acc, item) => acc + item.value, 0);
      const average = Math.round(sum / dayData.length);
      result.push(average);
      previousDayAverage = average;
    } else if (previousDayAverage !== null) {
      // No data for this day, use previous day's average
      result.push(previousDayAverage);
    } else {
      // No previous data available, use 0 or another default value
      result.push(0);
    }
  }

  return result;
}

// ! get stats for the week
function getAverageValuesByDayThisWeek(data: Stats_Log[]): number[] {
  // Sort data from oldest to newest for sequential processing
  const sortedData = [...data].sort(
    (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
  );

  // Get current date info
  const now = dayjs();
  const currentDay = now.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Calculate the date of the first day of the week (Sunday)
  const firstDayOfWeek = now.subtract(currentDay, "day").startOf("day");

  // Initialize result array (will have elements for days up to today)
  const result: number[] = [];

  // Process each day in the week until today
  let previousDayAverage: number | null = null;

  for (let dayOffset = 0; dayOffset <= currentDay; dayOffset++) {
    // Create date for this day
    const currentDate = firstDayOfWeek.add(dayOffset, "day");

    // Filter data points for this day
    const dayData = sortedData.filter((item) => {
      const itemDate = dayjs(item.createdAt);
      return (
        itemDate.year() === currentDate.year() &&
        itemDate.month() === currentDate.month() &&
        itemDate.date() === currentDate.date()
      );
    });

    if (dayData.length > 0) {
      // Calculate average for this day
      const sum = dayData.reduce((acc, item) => acc + item.value, 0);
      const average = Math.round(sum / dayData.length);
      result.push(average);
      previousDayAverage = average;
    } else if (previousDayAverage !== null) {
      // No data for this day, use previous day's average
      result.push(previousDayAverage);
    } else {
      // No previous data available, use 0 or another default value
      result.push(0);
    }
  }

  return result;
}

// ! get stats for a day
function getAverageValuesByHourToday(data: Stats_Log[]): number[] {
  // Sort data from oldest to newest for sequential processing
  const sortedData = [...data].sort(
    (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
  );

  // Get current date info
  const now = dayjs();
  const currentYear = now.year();
  const currentMonth = now.month();
  const currentDay = now.date();
  const currentHour = now.hour();

  // Initialize result array
  const result: number[] = [];

  // Process each hour in the day until now
  let previousHourAverage: number | null = null;

  for (let hour = 0; hour <= currentHour; hour++) {
    // Filter data points for this hour
    const hourData = sortedData.filter((item) => {
      const itemDate = dayjs(item.createdAt);
      return (
        itemDate.year() === currentYear &&
        itemDate.month() === currentMonth &&
        itemDate.date() === currentDay &&
        itemDate.hour() === hour
      );
    });

    if (hourData.length > 0) {
      // Calculate average for this hour
      const sum = hourData.reduce((acc, item) => acc + item.value, 0);
      const average = Math.round(sum / hourData.length);
      result.push(average);
      previousHourAverage = average;
    } else if (previousHourAverage !== null) {
      // No data for this hour, use previous hour's average
      result.push(previousHourAverage);
    } else {
      // No previous data available, use 0 or another default value
      result.push(0);
    }
  }

  return result;
}

const StatsUtils = {
  getAverageValuesByDayThisMonth,
  getAverageValuesByDayThisWeek,
  getAverageValuesByHourToday,
};

export default StatsUtils;
