import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonRadio } from '@/shared/components';
import { hobbyQueryOption } from '../../service';
import { Container } from './style';
import { SelectedItem } from '@/features/inventory/service';

interface Hobby {
  english: string;
  hangul: string;
}

interface HobbyRadioProps {
  defaultValue?: string;
  onChange?: React.Dispatch<React.SetStateAction<Hobby>>;
  setSelectedItems?: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
  isReadOnly?: boolean;
}

const HobbySelector = ({
  defaultValue,
  onChange,
  isReadOnly,
  setSelectedItems,
}: HobbyRadioProps) => {
  const { data } = useSuspenseQuery({
    ...hobbyQueryOption.all(),
    select: (data) =>
      data.hobbies.reduce<Record<string, string>>(
        (acc, cur) => ((acc[cur.value] = cur.name), acc),
        {}
      ),
  });

  const hangulHobby = Object.keys(data);

  const handleChange = (value: string) => {
    onChange &&
      onChange({
        english: data[value],
        hangul: value,
      });
    setSelectedItems && setSelectedItems([]);
  };

  return (
    <Container>
      <CommonRadio
        values={hangulHobby}
        name="취미"
        onChange={(value: string) => handleChange(value)}
        defaultValue={defaultValue}
        isReadOnly={isReadOnly}
      />
    </Container>
  );
};

export default HobbySelector;
