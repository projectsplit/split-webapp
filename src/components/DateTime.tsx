import { useEffect, useRef, useState } from 'react'
import { DateTimeProps } from '../types'
import DateTimePicker from './DateTimePicker/DateTimePicker'
import { styled } from 'styled-components'
import { DateTime as LuxonDateTime } from 'luxon'
import { toLuxon, toUtcString } from '../utils'

export const DateTime = ({ selectedDateTime, setSelectedDateTime, timeZoneId }: DateTimeProps) => {

  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [realtimeUpdate, setRealtimeUpdate] = useState<boolean>(true)
  const ref = useRef<HTMLDivElement>(null)

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
    window.addEventListener('mousedown', (e) => closeTimePicker(e))

    return () => {
      window.removeEventListener('mousedown', closeTimePicker)
    }
  }, [])

  const closeTimePicker = (event: any) => {
    if (!ref.current) return
    if (ref.current.contains(event.target)) return
    setShowPicker(false)
  }

  return (
    <StyledDateTime ref={ref}>
      <div className='main' onClick={_ => setShowPicker(!showPicker)}>
        {/* <HiClock className='icon' /> */}
        <div className='text'>{toLuxon(selectedDateTime, timeZoneId).toFormat('ccc, dd MMM yyyy HH:mm')}</div>
      </div>
      <div className='meta'>
        <span className='description'>Time {`(${timeZoneId})`}</span>
      </div>
      {showPicker &&
        <DateTimePicker
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
          realtimeUpdate={realtimeUpdate}
          setRealtimeUpdate={setRealtimeUpdate}
          timeZoneId={timeZoneId}
        />}
    </StyledDateTime>
  )
}

const StyledDateTime = styled.div`
  color: ${({ theme }) => theme.secondaryTextColor};
  display: flex;
  flex-direction: column;
  
  .main {
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.lineColor};
    border-radius: 8px;
    padding: 0.5em 1em;
    gap: 10px;
    white-space: nowrap;
    text-overflow: clip;
    overflow: hidden;
    cursor: pointer;
    
    .icon {
    }
    
    .text {
      color: ${({ theme }) => theme.textActiveColor};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .meta {
    display: flex;
    justify-content: space-between;
    padding: 0px 4px; 
    font-size: 12px;

    .description {
      color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    }

    .error {
      color: ${({ theme }) => theme.errorColor};
      font-weight: 400;
    }
  }  
`