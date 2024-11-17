export function calculateDaysBetween(start: string, end: string) {
  const startDate: any = new Date(start);
  const endDate: any = new Date(end);

  // Lấy số miliseconds giữa 2 ngày
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const timeDifference = endDate - startDate;

  // Chuyển đổi sự chênh lệch thời gian từ milliseconds sang ngày
  const daysDifference = timeDifference / millisecondsPerDay;

  return daysDifference;
}