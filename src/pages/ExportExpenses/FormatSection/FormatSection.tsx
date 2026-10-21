import IonIcon from '@reacticons/ionicons';
import { BsFiletypePdf, BsFiletypeXlsx } from 'react-icons/bs';
import { ExportFormat } from '../export/exportModel';

interface FormatSectionProps {
  value: ExportFormat;
  onChange: (format: ExportFormat) => void;
}

const formats: {
  value: ExportFormat;
  name: string;
  text: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'pdf',
    name: 'PDF',
    text: 'A report to read, print or send on.',
    icon: <BsFiletypePdf />,
  },
  {
    value: 'excel',
    name: 'Excel',
    text: 'A spreadsheet to sort, filter and add up.',
    icon: <BsFiletypeXlsx />,
  },
];

export const FormatSection = ({ value, onChange }: FormatSectionProps) => {
  return (
    <div className="section">
      <div className="sectionHeader">
        <div className="prompt">Format</div>
      </div>

      <div className="formatCards">
        {formats.map((format) => {
          const selected = format.value === value;
          return (
            <button
              key={format.value}
              type="button"
              className={`formatCard${selected ? ' selected' : ''}`}
              aria-pressed={selected}
              onClick={() => onChange(format.value)}
            >
              <span className="formatIcon">{format.icon}</span>
              <span className="formatName">{format.name}</span>
              <span className="formatText">{format.text}</span>
              {selected && (
                <IonIcon name="checkmark-circle" className="formatCheck" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
