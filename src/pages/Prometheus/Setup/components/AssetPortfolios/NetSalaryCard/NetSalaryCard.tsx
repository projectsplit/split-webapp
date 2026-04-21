import { useState } from 'react';
import { MdPayments } from 'react-icons/md';
import { MoneyInput } from '../../../shared/MoneyInput/MoneyInput';
import { ToggleSwitch } from '../../../shared/ToggleSwitch/ToggleSwitch';
import {
  CardWrapper,
  CardHeader,
  HeaderLeft,
  IconBox,
  Title,
  Subtitle,
} from './NetSalaryCard.styled';

export const NetSalaryCard = () => {
  const [amount, setAmount] = useState('12500');
  const [enabled, setEnabled] = useState(true);

  return (
    <CardWrapper>
      <CardHeader>
        <HeaderLeft>
          <IconBox>
            <MdPayments />
          </IconBox>
          <div>
            <Title>Annual Salary</Title>
            <Subtitle>Post-Tax</Subtitle>
          </div>
        </HeaderLeft>
        <ToggleSwitch
          checked={enabled}
          onChange={setEnabled}
          ariaLabel="Toggle Annual Salary"
        />
      </CardHeader>

      <MoneyInput
        value={amount}
        onChange={setAmount}
        placeholder="Monthly Net"
        size="md"
  
      />
    </CardWrapper>
  );
};
