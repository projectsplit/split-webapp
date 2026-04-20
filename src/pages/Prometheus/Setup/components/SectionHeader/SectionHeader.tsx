import { Header, Title, Marker } from './SectionHeader.styled';

interface SectionHeaderProps {
  title: string;
  marker: string;
  tone?: 'primary' | 'error';
}

export const SectionHeader = ({
  title,
  marker,
  tone = 'primary',
}: SectionHeaderProps) => {
  return (
    <Header>
      <Title $tone={tone}>{title}</Title>
      <Marker>{marker}</Marker>
    </Header>
  );
};
