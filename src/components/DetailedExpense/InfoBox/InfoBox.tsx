import React from 'react'
import { StyledInfoBox } from './InfoBox.Styled'

export default function InfoBox({children}:any) {
  return (
    <StyledInfoBox>{children}</StyledInfoBox>
  )
}
