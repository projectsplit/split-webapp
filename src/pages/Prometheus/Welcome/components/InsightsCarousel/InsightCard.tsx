import type { InsightModule } from './insights.data';
import {
  CardArticle,
  BackgroundIcon,
  ModuleLabel,
  Question,
  Footer,
  FooterDivider,
  FooterTag,
} from './InsightCard.styled';

interface InsightCardProps {
  module: InsightModule;
}

export const InsightCard = ({ module }: InsightCardProps) => {
  const Icon = module.icon;

  return (
    <CardArticle>
      <BackgroundIcon>
        <Icon />
      </BackgroundIcon>
      <ModuleLabel>{module.moduleNumber}</ModuleLabel>
      <Question>{module.question}</Question>
      <Footer>
        <FooterDivider />
        <FooterTag>{module.tag}</FooterTag>
      </Footer>
    </CardArticle>
  );
};
