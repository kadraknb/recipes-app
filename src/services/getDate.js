function getCurrentDate(separator = '/') {
  const ten = 10;
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${date}${separator}${month < ten
    ? `0${month}` : `${month}`}${separator}${year}`;
}

export default getCurrentDate;
