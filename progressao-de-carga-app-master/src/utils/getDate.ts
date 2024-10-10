export const getDate = () => {
  let date = new Date(),
    day = date.getDate().toString().padStart(2, '0'),
    month = (date.getMonth() + 1).toString().padStart(2, '0'),
    year = date.getFullYear(),
    hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ,
    minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return `${day}/${month}/${year} - ${hour}:${minute}`;
}