import { useState } from 'react';
import { MdPayments } from 'react-icons/md';
import { MoneyInput } from '../../../shared/MoneyInput/MoneyInput';
import {
  CardWrapper,
  CardHeader,
  HeaderLeft,
  IconBox,
  Title,
  Subtitle,
  FlowBadge,
} from './NetSalaryCard.styled';

export const NetSalaryCard = () => {
  const [amount, setAmount] = useState('12500');

  return (
    <CardWrapper>
      <CardHeader>
        <HeaderLeft>
          <IconBox>
            <MdPayments />
          </IconBox>
          <div>
            <Title>Net Monthly Salary</Title>
            <Subtitle>Post-Tax Cash Flow</Subtitle>
          </div>
        </HeaderLeft>
        <FlowBadge>FLOW_ACTIVE</FlowBadge>
      </CardHeader>

      <MoneyInput
        value={amount}
        onChange={setAmount}
        placeholder="Monthly Net"
        size="lg"
        currencyLabel="Monthly Net Flow"
      />
    </CardWrapper>
  );
};
