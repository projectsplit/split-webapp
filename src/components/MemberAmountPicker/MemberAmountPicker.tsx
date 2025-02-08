import { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi'
import { StyledMemberAmountPicker } from './MemberAmountPicker.styled'
import { MemberAmountPickerProps, PickerMember } from '../../types'
import currency from 'currency.js'

const split = (amount: number, denominator: number): string[] =>
  currency(amount).distribute(denominator).map(c => c.value.toFixed(2).toString())

export const MemberAmountPicker = ({ memberAmounts, setMemberAmounts, totalAmount }: MemberAmountPickerProps) => {

  // const memberData: FormMember[] = [
  //   { id: 'c43e1df2-5f6f-461f-9146-d087a55248e1', order: 0, name: 'Kristipatuti', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea64', order: 0, name: 'Mont', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea61', order: 0, name: 'Kont', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea65', order: 0, name: 'Mari', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea66', order: 0, name: 'Luig', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea67', order: 0, name: 'Koji', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea68', order: 0, name: 'Wasi', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea69', order: 0, name: 'Pjot', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea6a', order: 0, name: 'Lent', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea6b', order: 0, name: 'Mimi', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea6c', order: 0, name: 'Pipi', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea6d', order: 0, name: 'Lelo', amount: '', locked: false, selected: false },
  //   { id: '50d3c88a-c31b-4194-ade2-93866b90ea6e', order: 0, name: 'Miou', amount: '', locked: false, selected: false }
  // ]

  const clickOutsideListener = (event: MouseEvent) => {
    if (dropdownRef.current
      && !dropdownRef.current.contains(event.target as Node)
      && mainRef.current
      && !mainRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    // const members: Record<string, PickerMember> = {}
    // memberData.forEach(m => {
    //   members[m.id] = { id: m.id, name: m.name, amount: m.amount, locked: m.locked, selected: m.selected, order: m.order }
    // })
    // setFormMembers(members)

    document.addEventListener('mousedown', clickOutsideListener)
    return () => {
      document.removeEventListener('mousedown', clickOutsideListener)
    }
  }, [])

  // const [formMembers, setFormMembers] = useState<Record<string, PickerMember>>({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const renderCounter = useRef<number>(0)
  renderCounter.current++

  const recalculateAmounts = (formMembers: Record<string, PickerMember>): Record<string, PickerMember> => {
    const lockedSelectedMembers = Object.values(formMembers).filter(m => m.selected && m.locked)
    const unlockedSelectedMembers = Object.values(formMembers).filter(m => m.selected && !m.locked)
    const lockedAmount = lockedSelectedMembers.map(m => Number(m.amount)).reduce((total, a) => total + a, 0)
    const splitArray = split(totalAmount - lockedAmount, unlockedSelectedMembers.length)

    return Object.entries(formMembers).reduce((acc, [id, m]) => {
      if (m.selected && !m.locked) {
        acc[id] = { ...m, amount: splitArray.shift() || '' }
      } else {
        acc[id] = m
      }
      return acc
    }, {} as Record<string, PickerMember>)
  }

  const selectMember = (selectedId: string): void => {

    let newFormMembers = { ...memberAmounts }

    if (newFormMembers[selectedId]) {
      newFormMembers[selectedId] = {
        ...newFormMembers[selectedId],
        selected: true,
        order: renderCounter.current
      }
      newFormMembers = recalculateAmounts(newFormMembers)
      setMemberAmounts(newFormMembers)
    }
  }

  const deselectMember = (id: string): void => {
    let newFormMembers = { ...memberAmounts }

    if (newFormMembers[id]) {
      newFormMembers[id] = {
        ...newFormMembers[id],
        selected: false,
        amount: '',
        locked: false
      }
      newFormMembers = recalculateAmounts(newFormMembers)
      setMemberAmounts(newFormMembers)
    }
  }

  const toggleLock = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string): void => {
    e.stopPropagation()

    let newFormMembers = { ...memberAmounts }

    if (newFormMembers[id]) {
      newFormMembers[id] = {
        ...newFormMembers[id],
        locked: !newFormMembers[id].locked
      }
      newFormMembers = recalculateAmounts(newFormMembers)
      setMemberAmounts(newFormMembers)
    }
  }

  const selectAll = (): void => {

    const newFormMembers: Record<string, PickerMember> = Object.entries(memberAmounts).reduce((acc, [id, member]) => {
      acc[id] = { ...member, selected: true, order: renderCounter.current }
      return acc
    }, {} as Record<string, PickerMember>)

    const recalculatedFormMembers = recalculateAmounts(newFormMembers)
    setMemberAmounts(recalculatedFormMembers)
  }

  const selectNone = (): void => {
    const newFormMembers: Record<string, PickerMember> = Object.entries(memberAmounts).reduce((acc, [id, member]) => {
      acc[id] = { ...member, selected: false, amount: '', locked: false }
      return acc
    }, {} as Record<string, PickerMember>)

    setMemberAmounts(newFormMembers)
  }

  const changeAmount = (id: string, amount: string): void => {

    const p = memberAmounts[id]
    setMemberAmounts({
      ...memberAmounts,
      [id]: { ...p, amount: amount.substring(1) }
    })
  }

  const selectedCount = Object.values(memberAmounts).filter(p => p.selected).length
  const allCount = Object.values(memberAmounts).length
  const allSelected = selectedCount == allCount

  return (
    <StyledMemberAmountPicker>
      <div className='main' onClick={() => setIsMenuOpen(!isMenuOpen)} ref={mainRef}>
        <div className='text'>
          {selectedCount > 0 ? selectedCount + ' selected' : 'Select...'}
        </div>
        <FiChevronDown className='icon' />
      </div>
      {isMenuOpen && <div className='dropdown' ref={dropdownRef}>
        {allSelected && <div className='available option' onClick={e => selectNone()}>
          <div className='select-all'>{allSelected ? 'Clear' : 'Select all'}</div>
        </div>}
        {!allSelected && <div className='available option' onClick={e => selectAll()}>
          <div className='select-all'>Select all</div>
        </div>}
        {Object.entries(memberAmounts)
          .filter(([_, p]) => p.selected)
          .sort(([_A, pA], [_B, pB]) => Number(pB.locked) - Number(pA.locked) || pA.order - pB.order)
          .map(([id, p]) =>
            <div key={id} className='selected option' onClick={() => deselectMember(id)}>
              <div className='text'>{p.name}</div>
              <div className='right'>
                <input
                  className='amount'
                  inputMode='decimal'
                  value={'€' + p.amount}
                  onChange={e => changeAmount(id, e.target.value)}
                  onClick={e => e.stopPropagation()}
                />
                <div onClick={e => toggleLock(e, id)}>
                  {p.locked ? <HiLockClosed className='locked-icon' /> : <HiLockOpen className='unlocked-icon' />}
                </div>
              </div>
            </div>
          )}
        {Object.entries(memberAmounts).filter(([id, p]) => !p.selected).map(([id, member]) =>
          <div key={id} className='available option' onClick={e => selectMember(id)}>
            <div className='text'>{member.name}</div>
          </div>
        )}
      </div>}
    </StyledMemberAmountPicker>
  )
}
