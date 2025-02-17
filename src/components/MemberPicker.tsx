import { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi'
import { PickerMember } from '../types'
import currency from 'currency.js'
import styled, { keyframes } from 'styled-components'
import AutoWidthInput from './AutoWidthInput'
import { MemberPickerProps } from '../interfaces'

const MemberPicker = ({
  memberAmounts,
  setMemberAmounts,
  totalAmount,
  description,
  error }: MemberPickerProps) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const renderCounter = useRef<number>(0)
  renderCounter.current++

  const clickOutsideListener = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      && mainRef.current && !mainRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideListener)
    return () => {
      document.removeEventListener('mousedown', clickOutsideListener)
    }
  }, [])

  useEffect(() => {
    setMemberAmounts(recalculateAmounts(memberAmounts))
    return () => {
    }
  }, [totalAmount])

  const recalculateAmounts = (formMembers: PickerMember[]): PickerMember[] => {
    const lockedSelectedMembers = formMembers.filter(m => m.selected && m.locked)
    const unlockedSelectedMembers = formMembers.filter(m => m.selected && !m.locked)
    const lockedAmount = lockedSelectedMembers.map(m => Number(m.amount)).reduce((total, a) => total + a, 0)
    const splitArray = split(totalAmount - lockedAmount, unlockedSelectedMembers.length)

    return formMembers.map((m) => {
      if (m.selected && !m.locked) {
        return { ...m, amount: splitArray.shift() || '' }
      } else {
        return m
      }
    })
  }

  const selectMember = (selectedId: string): void => {
    const newFormMembers = memberAmounts.map(m => {
      if (m.id === selectedId) {
        return { ...m, selected: true, order: renderCounter.current }
      }
      return m
    })
    setMemberAmounts(recalculateAmounts(newFormMembers))
  }

  const deselectMember = (id: string): void => {
    const newFormMembers = memberAmounts.map(m => {
      if (m.id === id) {
        return { ...m, selected: false, amount: '', locked: false }
      }
      return m
    })
    setMemberAmounts(recalculateAmounts(newFormMembers))
  }

  const toggleLock = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string): void => {
    e.stopPropagation()

    const newFormMembers = memberAmounts.map(m => {
      if (m.id === id) {
        return { ...m, locked: !m.locked }
      }
      return m
    })
    setMemberAmounts(recalculateAmounts(newFormMembers))
  }

  const selectAll = (_: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const newFormMembers = memberAmounts.map(m => ({
      ...m,
      selected: true,
      order: renderCounter.current
    }))
    setMemberAmounts(recalculateAmounts(newFormMembers))
  }

  const selectNone = (): void => {
    const newFormMembers = memberAmounts.map(m => ({
      ...m,
      selected: false,
      amount: '',
      locked: false
    }))
    setMemberAmounts(newFormMembers)
  }

  const changeAmount = (id: string, amount: string): void => {
    const updatedMembers = memberAmounts.map(m => {
      if (m.id === id) {
        return { ...m, amount, locked: true }
      }
      return m
    })
    setMemberAmounts(recalculateAmounts(updatedMembers))
  }

  const handleInputBlur = (id: string) => {
    const updatedMembers = memberAmounts.map(m => {
      if (m.id === id) {
        const isZero = Number(m.amount) === 0
        return {
          ...m,
          amount: isZero ? "0.00" : m.amount,
          locked: isZero ? false : m.locked
        }
      }
      return m
    })
    setMemberAmounts(recalculateAmounts(updatedMembers))
  }

  const selectedCount = memberAmounts.filter(m => m.selected).length

  const handleMainClick = () => {
    setMemberAmounts(recalculateAmounts(memberAmounts))
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <StyledMemberPicker
      $isOpen={isMenuOpen}
      $hasError={!!error}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleMainClick()
        }
      }}>
      <div className='main' onClick={handleMainClick} ref={mainRef}>
        <div className='text'>
          {selectedCount > 0 ? selectedCount + ' selected' : 'Select...'}
        </div>
        <FiChevronDown className='icon' />
      </div>
      {isMenuOpen && <div className='dropdown' ref={dropdownRef}>
        <div className='buttons'>
          {<div className='clear-button' onClick={selectNone}>Clear</div>}
          {<div className='select-all-button' onClick={selectAll}>Select all</div>}
        </div>
        <hr className="line" />
        <div className="member-list">
          {memberAmounts.filter(m => m.selected)
            .map((m) =>
              <div key={m.id} className='selected option' onClick={() => deselectMember(m.id)}>
                <div className='text'>{m.name}</div>
                <div className='right'>
                  <div>
                    {"€"}
                    <AutoWidthInput
                      className='amount-input'
                      inputMode='decimal'
                      value={m.amount}
                      onBlur={_ => handleInputBlur(m.id)}
                      onChange={e => changeAmount(m.id, e.target.value)}
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                  <div onClick={e => toggleLock(e, m.id)}>
                    {m.locked ? <HiLockClosed className='locked-icon' /> : <HiLockOpen className='unlocked-icon' />}
                  </div>
                </div>
              </div>
            )}
          {memberAmounts.filter(m => !m.selected).map((m) =>
            <div key={m.id} className='available option' onClick={_ => selectMember(m.id)}>
              <div className='text'>{m.name}</div>
            </div>
          )}
        </div>
      </div>}
      <div className="meta">
        {description && <span className="description">{description}</span>}
        {error && <span className="error">{error}</span>}
      </div>
    </StyledMemberPicker>
  )
}

export default MemberPicker;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const StyledMemberPicker = styled.div<{ $hasError?: boolean, $isOpen?: boolean }>`
  color: ${({ theme }) => theme.secondaryTextColor};
  display: flex;
  flex-direction: column;
  position: relative;
  
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${({ theme, $hasError, $isOpen }) => ($hasError ? theme.errorColor : $isOpen ? theme.highlightColor : theme.lineColor)};
    border-radius: 8px;
    padding: 0.5em 1em;
    white-space: nowrap;
    cursor: pointer;
    text-overflow: clip;
    overflow: hidden;
    
    .icon {
      &:hover {
        color: #DDDDDD;
      }
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
  
  .dropdown {
    background-color: ${({ theme }) => theme.backgroundcolor};
    color: ${({ theme }) => theme.textActiveColor};
    border-color: ${({ theme }) => theme.lineColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    max-height: 300px;
    top: calc(100% - 12px);
    
    .member-list {
      overflow: auto;
    }
    
    .selected {
      background-color: ${({ theme }) => theme.backgroundcolor};
      color: ${({ theme }) => theme.textActiveColor};
    }
    
    .available {
      color: ${({ theme }) => theme.secondaryTextColor};
    }
    
    .buttons {
      display: flex;
      padding: 0.5em 1em;
      align-items: center;
      
      .select-all-button {
        margin-left: auto;
        color: ${({ theme }) => theme.secondaryTextColor};
      }
      
      .clear-button {
        margin-right: auto;
        color: ${({ theme }) => theme.secondaryTextColor};
      }
    }
    
    .option {
      animation: ${fadeIn} 0.15s linear;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      box-sizing: content-box;
      
      .right {
        display: flex;
        flex-direction: row;
        justify-items: end;
        align-items: center;
        gap: 10px;
        
        .currency {
          color: #777777;
        }
        
        .amount-input {
          background-color: ${({ theme }) => theme.backgroundcolor};
          color: ${({ theme }) => theme.textActiveColor};
          border-color: ${({ theme }) => theme.lineColor};
          border-style: none;
          border-width: 1px;
          border-radius: 5px;
          text-align: right;
          width: 100px;
          outline: solid;
          outline-width: 1px;
          outline-color: transparent;
          font-size: 16px;
        }
        
        .locked-icon{
          color: ${({ theme }) => theme.primaryTextColor};
        }
        
        .unlocked-icon{
          color: ${({ theme }) => theme.lineColor};
        }
      }
    }
  }
`

const split = (amount: number, denominator: number): string[] => currency(amount).distribute(denominator).map(c => c.value.toFixed(2).toString())