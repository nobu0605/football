import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

export function utcToJstDate(date: string) {
  return dayjs(date).tz().format('YYYY-MM-DD HH:mm')
}
