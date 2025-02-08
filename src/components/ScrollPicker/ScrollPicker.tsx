import { useEffect, useRef, useState } from 'react'
import { ScrollPickerProps } from '../../types'
import { closestMultiple } from '../../utils'
import StyledScrollPicker from './ScrollPicker.styled'

const ScrollPicker = ({ items, selectedIndex, setSelectedIndex }: ScrollPickerProps) => {

  const [itemHeight, setItemHeight] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  const visibleItemsCount = Math.floor(containerHeight / itemHeight)
  const itemsBeforeCenterItem = visibleItemsCount % 2 === 0 ? (visibleItemsCount / 2) - 1 : Math.floor(visibleItemsCount / 2)
  const heightBeforeCenterItem = itemsBeforeCenterItem * itemHeight
  const almostHalfItemHeight = Math.floor(itemHeight / 2) - 2
  const upperBound = heightBeforeCenterItem + almostHalfItemHeight
  const lowerBound = heightBeforeCenterItem - (items.length - 1) * itemHeight - almostHalfItemHeight

  const [isDragging, setIsDragging] = useState(false)
  const [translateY, setTranslateY] = useState(0)

  const centerHeight = heightBeforeCenterItem - translateY
  const centerIndex = Math.round(centerHeight / itemHeight)

  useEffect(() => {
    if (itemRef.current) {
      setItemHeight(itemRef.current.getBoundingClientRect().height)
    }
    if (containerRef.current) {
      setContainerHeight(containerRef.current.getBoundingClientRect().height)
    }
  }, [])

  useEffect(() => {
    setTranslateY(-itemHeight * (selectedIndex - itemsBeforeCenterItem))
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [itemHeight])

  useEffect(() => {
    if (itemHeight > 0 && centerIndex >= 0 && centerIndex < items.length) {
      setSelectedIndex(centerIndex)
    }
  }, [itemHeight, translateY])


  const handleGrab = (): void => {
    setIsDragging(true)
  }

  const calcNewTranslateY = (prevTranslateY: number, eventY: number): number => {
    let newTranslateY = prevTranslateY + eventY

    if (newTranslateY > upperBound) newTranslateY = upperBound
    if (newTranslateY < lowerBound) newTranslateY = lowerBound

    return newTranslateY
  }

  const onPointerMove = (event: any): void => {
    if (!isDragging) return
    setTranslateY(prev => calcNewTranslateY(prev, event.movementY))
  }

  const onPointerUp = () => {
    setIsDragging(false)
    setTranslateY(prev => closestMultiple(prev, itemHeight))
  }

  const onScroll = (event: React.WheelEvent) => {
    if (event.deltaY > 0 && centerIndex < items.length - 1) setTranslateY(prev => prev - itemHeight)
    if (event.deltaY < 0 && centerIndex > 0) setTranslateY(prev => prev + itemHeight)
  }

  return (
    <StyledScrollPicker
      ref={containerRef}
      onPointerDown={handleGrab}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onWheel={onScroll}
    >
      {items.map((item, i) => (
        <div
          ref={i === 0 ? itemRef : null}
          key={i}
          className={`item${centerIndex === i ? ' selected' : ''}`}
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {item}
        </div>
      ))}
    </StyledScrollPicker>
  )
}

export default ScrollPicker
