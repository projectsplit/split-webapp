import { useEffect, useState } from 'react'
import { StyledDateTimePicker } from './DateTimePicker.styled'
import DayPicker from './DayPicker/DayPicker'
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx'
import ScrollPicker from '../ScrollPicker/ScrollPicker'
import { isNow, round, toLuxon, toUtcString } from '../../utils'
import { DateTime as LuxonDateTime } from 'luxon'
import { DateTimePickerProps } from '../../interfaces'

const DateTimePicker = ({ selectedDateTime, setSelectedDateTime, realtimeUpdate, setRealtimeUpdate, timeZoneId }: DateTimePickerProps) => {

  const MINUTE_STEP = 1
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false)

  const hours = Array.from({ length: 24 }, (_, i) => LuxonDateTime.local().set({ hour: i }).toFormat('HH'))
  const minutes = Array.from({ length: 60 / MINUTE_STEP }, (_, i) => LuxonDateTime.local().set({ minute: i * MINUTE_STEP }).toFormat('mm'))

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (realtimeUpdate) {
      interval = setInterval(() => {
        setSelectedDateTime(prev => {
          const now = LuxonDateTime.utc().setZone(timeZoneId)
          const updatedDateTime = toLuxon(prev, timeZoneId).set({
            hour: now.hour,
            minute: now.minute,
            second: now.second,
          })

          return toUtcString(updatedDateTime);
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [realtimeUpdate])

  useEffect(() => {
    if (!realtimeUpdate) setRealtimeUpdate(isNow(selectedDateTime))
  }, [selectedDateTime])

  const onTimeClick = () => {
    setShowTimePicker(prev => !prev)
  }

  const closestMinuteIndex = (dateTimeISO: string) => {
    const dt = toLuxon(dateTimeISO, timeZoneId)
    const closestMinute = round(dt.minute, MINUTE_STEP)
    return closestMinute / MINUTE_STEP
  }

  const onNowClick = () => {
    setSelectedDateTime(toUtcString(LuxonDateTime.utc().setZone(timeZoneId)))
    setRealtimeUpdate(true)
    setShowTimePicker(false)
  }

  const onHourChange = (i: number) => {
    setSelectedDateTime((prev) => toUtcString(toLuxon(prev, timeZoneId).set({ hour: i })))
    setRealtimeUpdate(false)
  }

  const onMinuteChange = (i: number) => {
    setSelectedDateTime((prev) => toUtcString(toLuxon(prev, timeZoneId).set({ minute: i * MINUTE_STEP })))
    setRealtimeUpdate(false)
  }

  return (
    <StyledDateTimePicker>
      <div className='top-menu'>
        <div className='month-year'>
          <RxChevronLeft className='button' onClick={() => setSelectedDateTime(prev => toUtcString(toLuxon(prev, timeZoneId).minus({ months: 1 })))} />
          <div className='text'>
            {toLuxon(selectedDateTime, timeZoneId).toFormat('MMM')}
          </div>
          <RxChevronRight className='button' onClick={() => setSelectedDateTime(prev => toUtcString(toLuxon(prev, timeZoneId).plus({ months: 1 })))} />
        </div>
        <div className='month-year'>
          <RxChevronLeft className='button' onClick={() => setSelectedDateTime(prev => toUtcString(toLuxon(prev, timeZoneId).minus({ years: 1 })))} />
          <div className='text'>
            {toLuxon(selectedDateTime, timeZoneId).year}
          </div>
          <RxChevronRight className='button' onClick={() => setSelectedDateTime(prev => toUtcString(toLuxon(prev, timeZoneId).plus({ years: 1 })))} />
        </div>
      </div>
      <DayPicker selectedDateTime={selectedDateTime} setSelectedDateTime={setSelectedDateTime} timeZoneId={timeZoneId} />
      <div className='bottom-menu'>
        <div
          className={`button ${isNow(selectedDateTime) ? 'active' : ''}`}
          onClick={onNowClick}
        >
          Now
        </div>
        <div className='time' onClick={onTimeClick}>{toLuxon(selectedDateTime, timeZoneId).toFormat('HH:mm')}</div>
        <div className='timezone'>{toLuxon(selectedDateTime, timeZoneId).toFormat('ZZ')}</div>
      </div>
      {showTimePicker && <div className='time-picker'>
        <ScrollPicker items={hours} selectedIndex={toLuxon(selectedDateTime, timeZoneId).hour} setSelectedIndex={(i: number) => onHourChange(i)} />
        <ScrollPicker items={minutes} selectedIndex={closestMinuteIndex(selectedDateTime)} setSelectedIndex={(i: number) => onMinuteChange(i)} />
      </div>}
    </StyledDateTimePicker>
  )
}

export default DateTimePicker