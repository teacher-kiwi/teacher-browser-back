export const setKrTime = (date) => {
  const curr = new Date(date)
  const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000
  const kr_curr = new Date(utc + (KR_TIME_DIFF)).setHours(0, 0, 0, 0)
  return kr_curr
}