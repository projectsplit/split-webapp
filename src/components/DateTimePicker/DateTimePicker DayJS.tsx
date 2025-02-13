import { useEffect, useState } from 'react'
import { StyledDateTimePicker } from './DateTimePicker.styled'
import DayPicker from './DayPicker/DayPicker'
import dayjs, { Dayjs } from 'dayjs'
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx'
import ScrollPicker from '../ScrollPicker/ScrollPicker'

import { isNow, round } from '../../utils'
import { DateTimePickerProps } from '../../interfaces'

const DateTimePicker = ({ selectedDateTime, setSelectedDateTime, realtimeUpdate, setRealtimeUpdate }: DateTimePickerProps) => {

  const MINUTE_STEP = 1
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false)

  const hours = Array.from({ length: 24 }, (_, i) => dayjs().hour(i).format('HH'))
  const minutes = Array.from({ length: 60 / MINUTE_STEP }, (_, i) => dayjs().minute(i * MINUTE_STEP).format('mm'))

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (realtimeUpdate) {
      interval = setInterval(() => {
        setSelectedDateTime(prev => {
          const now = dayjs()
          return prev.set('hours', now.hour()).set('minutes', now.minute()).set('seconds', now.second())
        }
        )
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

  const closestMinuteIndex = (dateTime: Dayjs) => {
    const minute = dateTime.minute()
    const closestMinute = round(minute, MINUTE_STEP)
    return closestMinute / MINUTE_STEP
  }

  const onNowClick = () => {
    setSelectedDateTime(dayjs())
    setRealtimeUpdate(true)
    setShowTimePicker(false)
  }

  const onHourChange = (i: number) => {
    setSelectedDateTime(prev => prev.set('hour', i))
    setRealtimeUpdate(false)
  }

  const onMinuteChange = (i: number) => {
    setSelectedDateTime(prev => prev.set('minute', i * MINUTE_STEP))
    setRealtimeUpdate(false)
  }

  return (
    <StyledDateTimePicker>
      <div className='top-menu'>
        <div className='month-year'>
          <RxChevronLeft className='button' onClick={() => setSelectedDateTime(prev => prev.add(-1, 'month'))} />
          <div className='text'>
            {selectedDateTime.format('MMM')}
          </div>
          <RxChevronRight className='button' onClick={() => setSelectedDateTime(prev => prev.add(1, 'month'))} />
        </div>
        <div className='month-year'>
          <RxChevronLeft className='button' onClick={() => setSelectedDateTime(prev => prev.add(-1, 'year'))} />
          <div className='text'>
            {selectedDateTime.year()}
          </div>
          <RxChevronRight className='button' onClick={() => setSelectedDateTime(prev => prev.add(1, 'year'))} />
        </div>
      </div>
      <DayPicker selectedDateTime={selectedDateTime} setSelectedDateTime={setSelectedDateTime} />
      <div className='bottom-menu'>
        <div
          className={`button ${isNow(selectedDateTime) ? 'active' : ''}`}
          onClick={onNowClick}
        >
          Now
        </div>
        <div className='time' onClick={onTimeClick}>{selectedDateTime.format('HH:mm')}</div>
        <div className='timezone'>{selectedDateTime.format('Z')}</div>
      </div>
      {showTimePicker && <div className='time-picker'>
        <ScrollPicker items={hours} selectedIndex={selectedDateTime.hour()} setSelectedIndex={(i: number) => onHourChange(i)} />
        <ScrollPicker items={minutes} selectedIndex={closestMinuteIndex(selectedDateTime)} setSelectedIndex={(i: number) => onMinuteChange(i)} />
      </div>}
    </StyledDateTimePicker>
  )
}

export default DateTimePicker