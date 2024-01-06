function FormatDate(inputDate: string): string {
  const inputDateTime = new Date(inputDate);
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const dayOfMonth = inputDateTime.getDate();
  const monthName = monthNames[inputDateTime.getMonth()];
  const hours = String(inputDateTime.getHours()).padStart(2, '0');
  const minutes = String(inputDateTime.getMinutes()).padStart(2, '0');
  const formattedDate = `${dayOfMonth} of ${monthName} at ${hours}:${minutes}`;
  return formattedDate;
}
export default FormatDate;