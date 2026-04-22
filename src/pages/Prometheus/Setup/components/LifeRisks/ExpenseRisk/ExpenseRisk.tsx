import { MdAttachMoney, MdCurrencyExchange, MdMoney, MdMoneyOffCsred, MdOutlineBolt, MdPayment } from 'react-icons/md';
import { TitleInput } from '../CustomRiskCard/CustomRiskCard.styled';
import {
  Card,
  Glow,
  HeaderLeft,
  IconDisk,
  Outer,
} from '../RiskCard/RiskCard.styled';
import { StyledExpenseRisk } from './ExpenseRisk.styled';

export const ExpenseRisk = () => {
  return (
    <StyledExpenseRisk>
      <Outer>
        <Glow $variant="secondary" />
        <Card $variant="secondary">
          <HeaderLeft>
            <IconDisk>
              {/* {risk.name.toLowerCase().includes('home') ? (
              <MdHomeRepairService />
            ) : (
              
            )} */}
            <MdPayment />
            </IconDisk>
            <div className="title">EXPENSES</div>
          </HeaderLeft>
         <div className="description">Calibrated from your expense history</div> 
        </Card>
      </Outer>
    </StyledExpenseRisk>
  );
};
