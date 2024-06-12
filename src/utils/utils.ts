/* 날짜 포맷 */
export function dateDot(date: string) {
  date = date.substring(0, 10);
  const dotDate =
    date.substring(0, 4) +
    '.' +
    date.substring(5, 7) +
    '.' +
    date.substring(8, 10);
  return dotDate;
}

export function dateBar(date: string) {
  date = date.substring(0, 10);
  const dotDate =
    date.substring(0, 4) +
    '-' +
    date.substring(5, 7) +
    '-' +
    date.substring(8, 10);
  return dotDate;
}

/* 한국 날짜/시간 구하기 */
export function getKoreaDate() {
  return new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000,
  ).toISOString();
}

/* 요일 구하기 */
export function getDayOfWeek(date: string) {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[new Date(date).getDay()];
  return dayOfWeek;
}

/* 날짜 시간 포맷 */
export function dateTimeKoreanFormat(date: string) {
  const onlyDate = date.substring(0, 10);
  const dayOfWeek = getDayOfWeek(onlyDate);
  const dates = onlyDate.split('-').map((date) => Number(date));
  const onlyTime = date.substring(11, 16).split(':');
  const dateFormat = `${dates[1]}월 ${dates[2]}일 (${dayOfWeek}) ${Number(onlyTime[0]) < 12 ? '오전' : '오후'} ${Number(onlyTime[0])}:${onlyTime[1]}`;
  return dateFormat;
}

export function getTimeDotPMAMFormat(time: string) {
  const times = time.split(':');
  return `${Number(times[0]) < 12 ? 'AM' : 'PM'} ${times[0]}:${times[1]}`;
}

/* 숫자 콤마 포맷  */
export function numComma(text: string) {
  text = text.toString().replace(/,/g, '');

  return text.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* 숫자 제외 포맷 */
export function onlyNum(text: string) {
  text = text.toString().replace(/[^0-9]/g, '');

  return text;
}
