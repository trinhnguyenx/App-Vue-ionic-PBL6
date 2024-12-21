const date = '2024-12-21T11:21:43.860523Z';

const handleDateTime = (dateTimeString) => {
    const parsedDate = new Date(dateTimeString);
    const localDate = parsedDate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    return localDate;
  };
  const handleDate = (dateTimeString) => {
    const datetime = handleDateTime(dateTimeString);
    return datetime.split(" ")[1];
  };
  const handleTime = (dateTimeString) => {
    const datetime = handleDateTime(dateTimeString);
    return datetime.split(" ")[0];
  };

  console.log(handleTime(date))